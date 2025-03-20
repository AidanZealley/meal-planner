import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { type ItemHeaderProps } from "./ItemHeader.types";

export const ItemHeader = ({ item }: ItemHeaderProps) => {
  const notInStock = item?.amountAvailable === 0;

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/items">Items</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="flex items-center gap-3 text-3xl font-bold">
          {item?.name}
          {notInStock && (
            <Badge className="whitespace-nowrap" variant="destructive">
              out of stock
            </Badge>
          )}
        </h1>
      </div>
    </div>
  );
};
