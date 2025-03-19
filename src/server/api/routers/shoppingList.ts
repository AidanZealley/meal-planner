import { and, asc, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { items, shoppingList } from "@/server/db/schema";
import {
  clearShoppingList,
  generateShoppingList,
  toggleItemsDone,
} from "../utils/shoppingList";
import { TRPCError } from "@trpc/server";

export const shoppingListRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(shoppingList).values({
        itemId: input.itemId,
        userId: ctx.session.user.id,
      });
    }),

  toggleDone: protectedProcedure
    .input(z.object({ itemId: z.string(), done: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await toggleItemsDone({
          tx,
          session: ctx.session.session,
          itemIds: [input.itemId],
          done: input.done,
        });
      });
    }),

  delete: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(shoppingList)
        .where(eq(shoppingList.itemId, input.itemId));
    }),

  increaseQuantity: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        const item = await tx.query.items.findFirst({
          where: eq(items.id, input.itemId),
        });

        if (!item || item.type === "boolean") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Unable to increase quantity. The item is not an 'amount' type.",
          });
        }

        await ctx.db.insert(shoppingList).values({
          itemId: input.itemId,
          userId: ctx.session.user.id,
        });
      });
    }),
  // TODO - Throw error if no unplanned items left to delete
  decreaseQuantity: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deletedRows = await ctx.db.execute(sql`
        DELETE FROM ${shoppingList}
        WHERE ${shoppingList.id} = (
          SELECT ${shoppingList.id}
          FROM ${shoppingList}
          INNER JOIN ${items} ON ${shoppingList.itemId} = ${items.id}
          WHERE ${shoppingList.itemId} = ${input.itemId}
            AND ${shoppingList.planned} = FALSE
            AND ${items.type} = 'amount'
            AND ${shoppingList.userId} = ${ctx.session.user.id}
          LIMIT 1
        )
        RETURNING *;
      `);

      if (!deletedRows.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Unable to decrease quantity. Either all remaining items are planned, or the item is not an 'amount' type.",
        });
      }
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const orderedShoppingList = await ctx.db
      .select({
        itemId: shoppingList.itemId,
        done: sql<boolean>`BOOL_AND(${shoppingList.done})`.as("done"),
        amountNeeded:
          sql<number>`CAST(COUNT(${shoppingList.itemId}) AS INTEGER)`.as(
            "amountNeeded",
          ),
        amountPlanned:
          sql<number>`CAST(SUM(CASE WHEN ${shoppingList.planned} = TRUE THEN 1 ELSE 0 END) AS INTEGER)`.as(
            "amountPlanned",
          ),
        amountUnplanned:
          sql<number>`CAST(SUM(CASE WHEN ${shoppingList.planned} = FALSE THEN 1 ELSE 0 END) AS INTEGER)`.as(
            "amountUnplanned",
          ),
        item: items,
      })
      .from(shoppingList)
      .innerJoin(items, eq(shoppingList.itemId, items.id))
      .where(eq(shoppingList.userId, ctx.session.user.id))
      .groupBy(shoppingList.itemId, items.id)
      .orderBy(asc(items.name));

    return orderedShoppingList;
  }),

  generate: protectedProcedure.mutation(async ({ ctx }) =>
    ctx.db.transaction(async (tx) => {
      await generateShoppingList(tx, ctx.session.session);
    }),
  ),

  clear: protectedProcedure.mutation(async ({ ctx }) =>
    ctx.db.transaction(async (tx) => {
      await clearShoppingList(tx, ctx.session.session);
    }),
  ),
});
