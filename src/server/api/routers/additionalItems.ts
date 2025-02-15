import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { additionalItems } from "@/server/db/schema";
import { generateShoppingList } from "../utils/shoppingList";

export const additionalItemsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(additionalItems).values({
        name: input.name,
        userId: ctx.session.user.id,
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(additionalItems)
        .set({
          name: input.name,
        })
        .where(eq(additionalItems.id, input.id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx
          .delete(additionalItems)
          .where(eq(additionalItems.id, input.id));
        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const additionalItems = await ctx.db.query.additionalItems.findMany({
      orderBy: (additionalItems, { desc }) => [desc(additionalItems.createdAt)],
      where: (additionalItems) =>
        and(
          eq(additionalItems.deleted, false),
          eq(additionalItems.userId, ctx.session.user.id),
        ),
    });

    return additionalItems;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const additionalItem = await ctx.db.query.additionalItems.findFirst({
        where: and(
          eq(additionalItems.id, input.id),
          eq(additionalItems.userId, ctx.session.user.id),
        ),
        orderBy: (additionalItems, { desc }) => [
          desc(additionalItems.createdAt),
        ],
      });

      return additionalItem;
    }),
});
