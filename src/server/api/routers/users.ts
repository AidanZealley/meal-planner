import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { user } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";

export const usersRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(1),
        signUpPassword: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      if (input.signUpPassword !== env.SIGN_UP_PASSWORD) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await auth.api.signUpEmail({
        body: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });

      await auth.api.signInEmail({
        body: {
          email: input.email,
          password: input.password,
        },
        asResponse: true,
      });
    }),

  updateCurrentUser: protectedProcedure
    .input(z.object({ id: z.string().min(1), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(user)
        .set({
          name: input.name,
        })
        .where(eq(user.id, input.id));
    }),

  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const currentUser = await ctx.db.query.user.findFirst({
      where: eq(user.id, ctx.session.user.id),
    });

    return currentUser;
  }),
});
