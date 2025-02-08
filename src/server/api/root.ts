import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { ingredientsRouter } from "./routers/ingredients";
import { mealsRouter } from "./routers/meals";
import { mealIngredientsRouter } from "./routers/mealIngredients";
import { plannedMealsRouter } from "./routers/plannedMeals";
import { shoppingListRouter } from "./routers/shoppingList";
import { usersRouter } from "./routers/users";

export const appRouter = createTRPCRouter({
  ingredients: ingredientsRouter,
  meals: mealsRouter,
  mealIngredients: mealIngredientsRouter,
  plannedMeals: plannedMealsRouter,
  shoppingList: shoppingListRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
