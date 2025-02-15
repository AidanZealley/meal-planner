import { asc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { additionalItems, ingredients, shoppingList } from "@/server/db/schema";

export const shoppingListRouter = createTRPCRouter({
  addAdditionalItem: protectedProcedure
    .input(z.object({ additionalItemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(shoppingList).values({
        additionalItemId: input.additionalItemId,
        type: "additional",
        amountNeeded: 1,
        userId: ctx.session.user.id,
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), done: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(shoppingList)
        .set({
          done: input.done,
        })
        .where(eq(shoppingList.id, input.id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(shoppingList).where(eq(shoppingList.id, input.id));
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const orderedShoppingList = await ctx.db
      .select({
        id: shoppingList.id,
        amountNeeded: shoppingList.amountNeeded,
        done: shoppingList.done,
        createdAt: shoppingList.createdAt,
        ingredient: ingredients,
      })
      .from(shoppingList)
      .innerJoin(ingredients, eq(shoppingList.ingredientId, ingredients.id))
      .where(eq(shoppingList.userId, ctx.session.user.id))
      .orderBy(asc(ingredients.name));

    return orderedShoppingList;
  }),

  getAllAdditionalItems: protectedProcedure.query(async ({ ctx }) => {
    const orderedAdditionalItems = await ctx.db
      .select({
        id: shoppingList.id,
        amountNeeded: shoppingList.amountNeeded,
        done: shoppingList.done,
        createdAt: shoppingList.createdAt,
        additionalItem: additionalItems,
      })
      .from(shoppingList)
      .innerJoin(
        additionalItems,
        eq(shoppingList.additionalItemId, additionalItems.id),
      )
      .where(eq(shoppingList.userId, ctx.session.user.id))
      .orderBy(asc(additionalItems.name));

    return orderedAdditionalItems;
  }),
});
