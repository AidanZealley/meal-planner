import { asc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ingredients, shoppingList } from "@/server/db/schema";

export const shoppingListRouter = createTRPCRouter({
  update: protectedProcedure
    .input(z.object({ ingredientId: z.string(), done: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(shoppingList)
        .set({
          done: input.done,
        })
        .where(eq(shoppingList.ingredientId, input.ingredientId));
    }),

  delete: protectedProcedure
    .input(z.object({ ingredientId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(shoppingList)
        .where(eq(shoppingList.ingredientId, input.ingredientId));
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const orderedShoppingList = await ctx.db
      .select({
        id: shoppingList.id,
        ingredientId: shoppingList.ingredientId,
        amountNeeded: shoppingList.amountNeeded,
        done: shoppingList.done,
        createdAt: shoppingList.createdAt,
        ingredientName: ingredients.name,
        ingredient: ingredients,
      })
      .from(shoppingList)
      .innerJoin(ingredients, eq(shoppingList.ingredientId, ingredients.id))
      .where(eq(shoppingList.userId, ctx.session.user.id))
      .orderBy(asc(ingredients.name));

    return orderedShoppingList;
  }),
});
