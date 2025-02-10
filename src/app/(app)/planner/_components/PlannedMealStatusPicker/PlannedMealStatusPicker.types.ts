import { type PlannedMealStatus } from "@/lib/enums";

export type PlannedMealStatusPickerProps = {
  id: string;
  mealId: string;
  status: PlannedMealStatus;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
