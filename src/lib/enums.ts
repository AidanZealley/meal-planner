export const PlannedMealStatusValues = ["planned", "cooked"] as const;
export type PlannedMealStatus = (typeof PlannedMealStatusValues)[number];

export const ItemTypeValues = ["boolean", "amount"] as const;
export type ItemType = (typeof ItemTypeValues)[number];

export const ItemTypeEnum = Object.fromEntries(
  ItemTypeValues.map((value) => [
    value.charAt(0).toUpperCase() + value.slice(1),
    value,
  ]),
) as Record<Capitalize<ItemType>, ItemType>;
