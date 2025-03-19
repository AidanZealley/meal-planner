import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { meals } from "@/server/db/schema";
import { generateShoppingList } from "../utils/shoppingList";

export const mealsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(meals).values({
        name: input.name,
        userId: ctx.session.user.id,
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(meals)
        .set({
          name: input.name,
        })
        .where(eq(meals.id, input.id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx.delete(meals).where(eq(meals.id, input.id));
        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const meals = await ctx.db.query.meals.findMany({
      with: {
        plannedMeals: {
          where: (plannedMeals) =>
            and(
              eq(plannedMeals.status, "planned"),
              eq(plannedMeals.userId, ctx.session.user.id),
            ),
        },
      },
      orderBy: (meals, { desc }) => [desc(meals.createdAt)],
      where: (meals) =>
        and(eq(meals.deleted, false), eq(meals.userId, ctx.session.user.id)),
    });

    return meals;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const meal = await ctx.db.query.meals.findFirst({
        with: {
          mealItems: {
            with: {
              item: true,
            },
          },
          plannedMeals: true,
        },
        where: and(
          eq(meals.id, input.id),
          eq(meals.userId, ctx.session.user.id),
        ),
        orderBy: (meals, { desc }) => [desc(meals.createdAt)],
      });

      return meal;
    }),
});
