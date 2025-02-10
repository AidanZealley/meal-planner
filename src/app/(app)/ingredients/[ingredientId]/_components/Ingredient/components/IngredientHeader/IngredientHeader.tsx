import { Badge } from "@/components/ui/badge";
import { type IngredientHeaderProps } from "./IngredientHeader.types";

export const IngredientHeader = ({ ingredient }: IngredientHeaderProps) => {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col items-start gap-3 py-6">
        <h1 className="text-3xl font-bold">{ingredient?.name}</h1>

        <Badge variant={ingredient?.inStock ? "default" : "destructive"}>
          {ingredient?.inStock ? "In Stock" : "Out of Stock"}
        </Badge>

        {ingredient?.useAmount && (
          <span>{ingredient.amountAvailable} in stock</span>
        )}
      </div>
    </div>
  );
};
