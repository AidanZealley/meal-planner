import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ingredients } from "@/server/db/schema";
import { generateShoppingList } from "../utils/shoppingList";

export const ingredientsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(ingredients).values({
        name: input.name,
        userId: ctx.session.user.id,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(ingredients)
        .set({
          name: input.name,
        })
        .where(eq(ingredients.id, input.id));
    }),

  updateStock: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        inStock: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx
          .update(ingredients)
          .set({
            inStock: input.inStock,
          })
          .where(eq(ingredients.id, input.id));

        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(ingredients).where(eq(ingredients.id, input.id));
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const ingredients = await ctx.db.query.ingredients.findMany({
      where: (ingredients) => eq(ingredients.userId, ctx.session.user.id),
      orderBy: (ingredients, { desc }) => [desc(ingredients.createdAt)],
    });

    return ingredients;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const ingredient = await ctx.db.query.ingredients.findFirst({
        with: {
          mealIngredients: {
            with: {
              meal: true,
            },
          },
        },
        where: and(
          eq(ingredients.id, input.id),
          eq(ingredients.userId, ctx.session.user.id),
        ),
        orderBy: (ingredients, { desc }) => [desc(ingredients.createdAt)],
      });

      return ingredient;
    }),
});
