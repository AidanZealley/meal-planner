export const PlannedMealStatusValues = ["planned", "cooked"] as const;
export type PlannedMealStatus = (typeof PlannedMealStatusValues)[number];

export const ShoppingListTypeValues = ["ingredient", "additional"] as const;
export type ShoppingListType = (typeof ShoppingListTypeValues)[number];

export const ShoppingListTypeEnum = Object.fromEntries(
  ShoppingListTypeValues.map((value) => [
    value.charAt(0).toUpperCase() + value.slice(1),
    value,
  ]),
) as Record<Capitalize<ShoppingListType>, ShoppingListType>;
