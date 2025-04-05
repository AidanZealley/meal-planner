import { and, eq, inArray, sql } from "drizzle-orm";

import { type Transaction } from "@/lib/types";
import {
  items,
  mealItems,
  plannedMeals,
  shoppingList,
} from "@/server/db/schema";
import { type Session } from "better-auth";

export const generateShoppingList = async (
  tx: Transaction,
  session: Session,
) => {
  try {
    // Check if all shopping list items for this user are done
    const allDone = await tx
      .select()
      .from(shoppingList)
      .where(eq(shoppingList.userId, session.userId))
      .then((items) => items.every((item) => item.done));

    // Only delete if everything is done
    if (allDone) {
      await tx
        .delete(shoppingList)
        .where(eq(shoppingList.userId, session.userId));
    }

    // // Fetch previous shopping list for the user
    // const previousPlannedItems = await tx
    //   .select()
    //   .from(shoppingList)
    //   .where(
    //     and(
    //       eq(shoppingList.planned, true),
    //       eq(shoppingList.userId, session.userId),
    //     ),
    //   );

    // Find all out-of-stock items across planned meals
    const outOfStockPlannedItems = await tx
      .select({
        itemId: items.id,
        type: items.type,
        amountNeeded: sql<number>`
          CASE 
            WHEN ${items.type} = 'boolean' THEN 1
            ELSE GREATEST(SUM(${mealItems.amountRequired}) - ${items.amountAvailable}, 0)
          END
        `.as("amount_needed"),
      })
      .from(mealItems)
      .innerJoin(items, eq(mealItems.itemId, items.id))
      .innerJoin(plannedMeals, eq(mealItems.mealId, plannedMeals.mealId))
      .where(
        and(
          eq(plannedMeals.status, "planned"),
          eq(mealItems.userId, session.userId),
        ),
      )
      .groupBy(items.id, items.type, items.amountAvailable).having(sql`
        CASE 
          WHEN ${items.type} = 'boolean' THEN 
            ${items.amountAvailable} = 0 AND COUNT(*) > 0
          ELSE 
            SUM(${mealItems.amountRequired}) > ${items.amountAvailable}
        END
      `);
    // TODO - Work out if list is the same and return early
    console.log(outOfStockPlannedItems);
    const itemsToInsert = outOfStockPlannedItems.reduce(
      (items, { itemId, type, amountNeeded }) => [
        ...items,
        ...(type === "boolean"
          ? [
              {
                itemId,
                planned: true,
                done: false,
                userId: session.userId,
              },
            ]
          : Array(Number(amountNeeded))
              .fill(null)
              .map(() => ({
                itemId,
                planned: true,
                done: false,
                userId: session.userId,
              }))),
      ],
      [] as {
        itemId: string;
        planned: boolean;
        done: boolean;
        userId: string;
      }[],
    );

    // Delete old planned items
    await tx
      .delete(shoppingList)
      .where(
        and(
          eq(shoppingList.planned, true),
          eq(shoppingList.userId, session.userId),
        ),
      );

    await tx.insert(shoppingList).values(itemsToInsert);
  } catch (error) {
    console.log("Error in delete:", error);
  }
};

export const replenishStock = async ({
  tx,
  session,
  itemIds,
}: {
  tx: Transaction;
  session: Session;
  itemIds: string[];
}) => {
  if (!itemIds.length) {
    return;
  }

  // Find shopping list rows for the given itemIds that aren't marked as done
  const plannedShoppingItems = await tx
    .select({
      id: shoppingList.id,
      itemId: shoppingList.itemId,
      done: shoppingList.done,
      type: items.type,
      amountAvailable: items.amountAvailable,
    })
    .from(shoppingList)
    .innerJoin(items, eq(shoppingList.itemId, items.id))
    .where(
      and(
        eq(shoppingList.userId, session.userId),
        eq(shoppingList.planned, true),
        inArray(shoppingList.itemId, itemIds),
      ),
    );

  if (!plannedShoppingItems.length) {
    return;
  }

  const groupedPlannedShoppingItems = plannedShoppingItems.reduce(
    (groupedItems, { itemId, done, type, amountAvailable }) => ({
      ...groupedItems,
      [itemId]: groupedItems[itemId]
        ? {
            ...groupedItems[itemId],
            amountNeeded: done
              ? groupedItems[itemId].amountNeeded
              : groupedItems[itemId].amountNeeded + 1,
          }
        : {
            itemId,
            type,
            amountAvailable,
            amountNeeded: done ? 0 : 1,
          },
    }),
    {} as Record<
      string,
      {
        itemId: string;
        type: "boolean" | "amount";
        amountAvailable: number;
        amountNeeded: number;
      }
    >,
  );

  if (!Object.keys(groupedPlannedShoppingItems).length) {
    return;
  }

  // Replenish items stock
  const itemUpdatesPromises = Object.values(groupedPlannedShoppingItems).map(
    ({ itemId, type, amountAvailable, amountNeeded }) =>
      tx
        .update(items)
        .set({
          amountAvailable:
            type === "amount"
              ? Number(amountAvailable) + Number(amountNeeded)
              : 1,
        })
        .where(eq(items.id, itemId)),
  );

  await Promise.all(itemUpdatesPromises);

  // Remove items from the shopping list after replenishing stock
  const shoppingItemIds = plannedShoppingItems.map((item) => item.id);

  await tx
    .delete(shoppingList)
    .where(
      and(
        eq(shoppingList.userId, session.userId),
        inArray(shoppingList.id, shoppingItemIds),
      ),
    );
};

export const toggleItemsDone = async ({
  tx,
  session,
  itemIds,
  done,
}: {
  tx: Transaction;
  session: Session;
  itemIds: string[];
  done: boolean;
}) => {
  if (!itemIds.length) return;

  const shoppingItems = await tx
    .select({
      id: shoppingList.id,
      itemId: shoppingList.itemId,
      type: items.type,
      amountAvailable: items.amountAvailable,
    })
    .from(shoppingList)
    .innerJoin(items, eq(shoppingList.itemId, items.id))
    .where(
      and(
        eq(shoppingList.userId, session.userId),
        eq(shoppingList.done, false),
        inArray(shoppingList.itemId, itemIds),
      ),
    );

  const groupedPlannedShoppingItems = shoppingItems.reduce(
    (groupedItems, { itemId, type, amountAvailable }) => ({
      ...groupedItems,
      [itemId]: groupedItems[itemId]
        ? {
            ...groupedItems[itemId],
            amountNeeded: groupedItems[itemId].amountNeeded + 1,
          }
        : {
            itemId,
            type,
            amountAvailable,
            amountNeeded: 1,
          },
    }),
    {} as Record<
      string,
      {
        itemId: string;
        type: "boolean" | "amount";
        amountAvailable: number;
        amountNeeded: number;
      }
    >,
  );

  // Replenish items stock
  const itemUpdatesPromises = Object.values(groupedPlannedShoppingItems).map(
    ({ itemId, type, amountAvailable, amountNeeded }) =>
      tx
        .update(items)
        .set({
          amountAvailable:
            type === "amount"
              ? Number(amountAvailable) + Number(amountNeeded)
              : 1,
        })
        .where(eq(items.id, itemId)),
  );

  await Promise.all(itemUpdatesPromises);

  // Mark shopping list items as done
  await tx
    .update(shoppingList)
    .set({ done })
    .where(
      and(
        eq(shoppingList.userId, session.userId),
        inArray(shoppingList.itemId, itemIds),
      ),
    );
};

export const clearShoppingList = async (tx: Transaction, session: Session) => {
  const clearedItems = await tx
    .delete(shoppingList)
    .where(
      and(eq(shoppingList.userId, session.userId), eq(shoppingList.done, true)),
    )
    .returning();

  return clearedItems;
};
