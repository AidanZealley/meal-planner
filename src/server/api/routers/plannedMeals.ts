import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { plannedMeals } from "@/server/db/schema";
import { PlannedMealStatusValues } from "@/lib/enums";
import { generateShoppingList } from "../utils/shoppingList";

export const plannedMealsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ mealId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx.insert(plannedMeals).values({
          mealId: input.mealId,
          status: "planned",
          userId: ctx.session.user.id,
        });

        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(PlannedMealStatusValues),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx
          .update(plannedMeals)
          .set({
            status: input.status,
          })
          .where(eq(plannedMeals.id, input.id));
        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  delete: protectedProcedure
    .input(z.object({ mealId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx
          .delete(plannedMeals)
          .where(eq(plannedMeals.mealId, input.mealId));

        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const allMeals = await ctx.db.query.plannedMeals.findMany({
      with: {
        meal: {
          with: {
            mealIngredients: {
              where: (plannedMeals) =>
                eq(plannedMeals.userId, ctx.session.user.id),
            },
          },
        },
      },
      where: (plannedMeals) => eq(plannedMeals.userId, ctx.session.user.id),
      orderBy: (plannedMeals, { desc }) => [desc(plannedMeals.createdAt)],
    });

    return allMeals;
  }),

  getAllByStatus: protectedProcedure
    .input(
      z.object({
        status: z.enum(PlannedMealStatusValues).optional(), // Make status optional
      }),
    )
    .query(async ({ ctx, input }) => {
      const plannedMeals = await ctx.db.query.plannedMeals.findMany({
        with: {
          meal: {
            with: {
              mealIngredients: true,
            },
          },
        },
        orderBy: (plannedMeals, { desc }) => [desc(plannedMeals.createdAt)],
        where: (plannedMeals) =>
          and(
            input.status ? eq(plannedMeals.status, input.status) : undefined,
            eq(plannedMeals.userId, ctx.session.user.id),
          ),
      });

      return plannedMeals;
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const meal = await ctx.db.query.plannedMeals.findFirst({
        with: {
          meal: {
            with: {
              mealIngredients: {
                with: {
                  ingredient: true,
                },
              },
            },
          },
        },
        where: and(
          eq(plannedMeals.id, input.id),
          eq(plannedMeals.userId, ctx.session.user.id),
        ),
        orderBy: (plannedMeals, { desc }) => [desc(plannedMeals.createdAt)],
      });

      return meal;
    }),
});
