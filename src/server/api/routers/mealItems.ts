import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { mealItems } from "@/server/db/schema";
import { generateShoppingList } from "../utils/shoppingList";

export const mealItemsRouter = createTRPCRouter({
  pickItem: protectedProcedure
    .input(z.object({ mealId: z.string(), itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx.insert(mealItems).values({
          itemId: input.itemId,
          mealId: input.mealId,
          userId: ctx.session.user.id,
        });
        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  removeItem: protectedProcedure
    .input(z.object({ mealId: z.string(), itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx
          .delete(mealItems)
          .where(
            and(
              eq(mealItems.mealId, input.mealId),
              eq(mealItems.itemId, input.itemId),
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
          .update(mealItems)
          .set({
            amountRequired: input.amount,
          })
          .where(eq(mealItems.id, input.id));
        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  getAll: protectedProcedure
    .input(z.object({ mealId: z.string() }))
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.query.mealItems.findMany({
        with: {
          item: true,
        },
        where: and(
          eq(mealItems.mealId, input.mealId),
          eq(mealItems.userId, ctx.session.user.id),
        ),
        orderBy: (mealItems, { desc }) => [desc(mealItems.createdAt)],
      });

      return items;
    }),
});
