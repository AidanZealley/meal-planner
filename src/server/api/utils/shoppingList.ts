import { and, eq } from "drizzle-orm";

import { type Transaction } from "@/lib/types";
import {
  ingredients,
  mealIngredients,
  plannedMeals,
  shoppingList,
} from "@/server/db/schema";
import { type Session } from "better-auth";

export const generateShoppingList = async (
  tx: Transaction,
  session: Session,
) => {
  const previousShoppingList = await tx.select().from(shoppingList);

  const outOfStockIngredientIds = await tx
    .select({ ingredientId: mealIngredients.ingredientId })
    .from(mealIngredients)
    .innerJoin(ingredients, eq(mealIngredients.ingredientId, ingredients.id))
    .innerJoin(plannedMeals, eq(mealIngredients.mealId, plannedMeals.mealId))
    .where(
      and(eq(plannedMeals.status, "planned"), eq(ingredients.inStock, false)),
    );

  const newIngredientIds = new Set(
    outOfStockIngredientIds.map((row) => row.ingredientId),
  );
  const oldIngredientIds = new Set(
    previousShoppingList.map((row) => row.ingredientId),
  );

  if (
    newIngredientIds.size === oldIngredientIds.size &&
    [...newIngredientIds].every((id) => oldIngredientIds.has(id))
  ) {
    return;
  }

  await tx.delete(shoppingList);

  if (outOfStockIngredientIds.length) {
    await tx.insert(shoppingList).values(
      outOfStockIngredientIds.map(({ ingredientId }) => ({
        ingredientId,
        done:
          previousShoppingList.find(
            (item) => item.ingredientId === ingredientId,
          )?.done ?? false,
        userId: session.userId,
      })),
    );
  }
};
