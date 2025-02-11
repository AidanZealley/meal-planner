import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { type IngredientHeaderProps } from "./IngredientHeader.types";

export const IngredientHeader = ({ ingredient }: IngredientHeaderProps) => {
  const notInStock =
    !ingredient?.inStock ||
    (ingredient?.useAmount && ingredient?.amountAvailable === 0);

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/ingredients">Ingredients</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="flex items-center gap-3 text-3xl font-bold">
          {ingredient?.name}
          {notInStock && <Badge variant="destructive">out of stock</Badge>}
        </h1>
      </div>
    </div>
  );
};
