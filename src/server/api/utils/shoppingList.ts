import { and, eq, or, sql } from "drizzle-orm";

import { type Transaction } from "@/lib/types";
import {
  ingredients,
  mealIngredients,
  plannedMeals,
  shoppingList,
} from "@/server/db/schema";
import { type Session } from "better-auth";
import { ShoppingListTypeEnum } from "@/lib/enums";

export const generateShoppingList = async (
  tx: Transaction,
  session: Session,
) => {
  // Fetch previous shopping list for the user
  const previousShoppingList = await tx
    .select()
    .from(shoppingList)
    .where(eq(shoppingList.userId, session.userId));

  // Find all out-of-stock ingredients across planned meals
  const outOfStockIngredients = await tx
    .select({
      ingredientId: ingredients.id,
      inStock: ingredients.inStock,
      useAmount: ingredients.useAmount,
      amountNeeded: sql<number>`
        NULLIF(GREATEST(SUM(${mealIngredients.amountRequired}) - COALESCE(${ingredients.amountAvailable}, 0), 0), 0)
      `.as("amount_needed"),
    })
    .from(mealIngredients)
    .innerJoin(ingredients, eq(mealIngredients.ingredientId, ingredients.id))
    .innerJoin(plannedMeals, eq(mealIngredients.mealId, plannedMeals.mealId)) // Ensure all planned meals are considered
    .where(
      and(
        eq(plannedMeals.status, "planned"), // Include all planned meals
        eq(mealIngredients.userId, session.userId), // Filter by user
      ),
    )
    .groupBy(ingredients.id, ingredients.amountAvailable)
    .having(
      or(
        sql`SUM(${mealIngredients.amountRequired}) > COALESCE(${ingredients.amountAvailable}, 0)`, // Amount-tracked ingredients (shortage)
        and(eq(ingredients.useAmount, false), eq(ingredients.inStock, false)), // Boolean-tracked ingredients (out of stock)
      ),
    );

  // Create sets for quick comparison
  const newShoppingListMap = new Map(
    outOfStockIngredients.map(({ ingredientId, amountNeeded }) => [
      ingredientId,
      amountNeeded,
    ]),
  );

  const oldShoppingListMap = new Map(
    previousShoppingList.map(({ ingredientId, amountNeeded }) => [
      ingredientId,
      amountNeeded,
    ]),
  );

  // If the ingredient IDs AND amounts are the same, return early
  const isSameList =
    newShoppingListMap.size === oldShoppingListMap.size &&
    [...newShoppingListMap].every(
      ([id, amount]) => oldShoppingListMap.get(id) === amount,
    );

  if (isSameList) {
    return;
  }

  // Delete only the current user's shopping list
  await tx.delete(shoppingList).where(eq(shoppingList.userId, session.userId));

  // Insert new shopping list items while preserving "done" state
  if (outOfStockIngredients.length) {
    await tx.insert(shoppingList).values(
      outOfStockIngredients.map(({ ingredientId, amountNeeded }) => ({
        ingredientId,
        type: ShoppingListTypeEnum.Ingredient,
        amountNeeded, // Null for ingredients with useAmount: false
        done:
          previousShoppingList.find(
            (item) => item.ingredientId === ingredientId,
          )?.done ?? false,
        userId: session.userId,
      })),
    );
  }
};
