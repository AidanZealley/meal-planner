import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { mealIngredients } from "@/server/db/schema";
import { generateShoppingList } from "../utils/shoppingList";

export const mealIngredientsRouter = createTRPCRouter({
  pickIngredient: protectedProcedure
    .input(z.object({ mealId: z.string(), ingredientId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx.insert(mealIngredients).values({
          ingredientId: input.ingredientId,
          mealId: input.mealId,
          userId: ctx.session.user.id,
        });
        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  removeIngredient: protectedProcedure
    .input(z.object({ mealId: z.string(), ingredientId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await ctx.db
          .delete(mealIngredients)
          .where(
            and(
              eq(mealIngredients.mealId, input.mealId),
              eq(mealIngredients.ingredientId, input.ingredientId),
            ),
          );
        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  updateAmountRequired: protectedProcedure
    .input(z.object({ id: z.string(), amount: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await ctx.db
          .update(mealIngredients)
          .set({
            amountRequired: input.amount,
          })
          .where(eq(mealIngredients.id, input.id));
        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  getAll: protectedProcedure
    .input(z.object({ mealId: z.string() }))
    .query(async ({ ctx, input }) => {
      const ingredients = await ctx.db.query.mealIngredients.findMany({
        with: {
          ingredient: true,
        },
        where: and(
          eq(mealIngredients.mealId, input.mealId),
          eq(mealIngredients.userId, ctx.session.user.id),
        ),
        orderBy: (mealIngredients, { desc }) => [
          desc(mealIngredients.createdAt),
        ],
      });

      return ingredients;
    }),
});
