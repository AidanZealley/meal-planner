import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatDate } from "date-fns";
import { type AdditionalItemHeaderProps } from "./AdditionalItemHeader.types";

export const AdditionalItemHeader = ({
  additionalItem,
}: AdditionalItemHeaderProps) => {
  if (!additionalItem) {
    return null;
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/additional-items">
                Additional Items
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid gap-3">
          <h1 className="flex items-center gap-3 text-3xl font-bold">
            {additionalItem?.name}
          </h1>
          <span className="text-xs text-muted-foreground">
            Created {formatDate(additionalItem?.createdAt, "do, MMM")}
          </span>
        </div>
      </div>
    </div>
  );
};
