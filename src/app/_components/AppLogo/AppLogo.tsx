import { Salad } from "lucide-react";

export const AppLogo = () => {
  return (
    <div className="flex items-center gap-1">
      <Salad className="h-4 w-4" strokeWidth={3} />
      <span className="font-bold tracking-tight">Meal Planner</span>
    </div>
  );
};
