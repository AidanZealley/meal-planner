import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { items } from "@/server/db/schema";
import { generateShoppingList } from "../utils/shoppingList";
import { ItemTypeValues } from "@/lib/enums";

export const itemsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(items).values({
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
        .update(items)
        .set({
          name: input.name,
        })
        .where(eq(items.id, input.id));
    }),

  updateType: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        type: z.enum(ItemTypeValues),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx
          .update(items)
          .set({
            type: input.type,
          })
          .where(eq(items.id, input.id));

        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  updateInStock: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        inStock: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx
          .update(items)
          .set({
            amountAvailable: input.inStock ? 1 : 0,
          })
          .where(and(eq(items.id, input.id), eq(items.type, "boolean")));

        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  updateAmountAvailable: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        amountAvailable: z.number().min(0),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx
          .update(items)
          .set({
            amountAvailable: input.amountAvailable,
          })
          .where(eq(items.id, input.id));

        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  updateUnit: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        unit: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx
          .update(items)
          .set({
            unit: input.unit,
          })
          .where(eq(items.id, input.id));

        await generateShoppingList(tx, ctx.session.session);
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(items).where(eq(items.id, input.id));
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const items = await ctx.db.query.items.findMany({
      where: (items) => eq(items.userId, ctx.session.user.id),
      orderBy: (items, { asc }) => [asc(items.name)],
    });

    return items;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const item = await ctx.db.query.items.findFirst({
        with: {
          mealItems: {
            with: {
              meal: true,
            },
          },
        },
        where: and(
          eq(items.id, input.id),
          eq(items.userId, ctx.session.user.id),
        ),
        orderBy: (items, { desc }) => [desc(items.createdAt)],
      });

      return item;
    }),
});
