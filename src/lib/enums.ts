export const PlannedMealStatusValues = ["planned", "cooked"] as const;
export type PlannedMealStatus = (typeof PlannedMealStatusValues)[number];
