import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { DrawerDialog } from "@/components/DrawerDialog";
import { Form, FormField } from "@/components/ui/form";
import { StockItemField } from "./components/StockItemField";
import { LoadingButton } from "@/components/LoadingButton";
import { StockDialogScrollIndicator } from "./components/StockDialogScrollIndicator";
import { stockCheckFormSchema } from "./StockDialog.schemas";
import type { StockCheckFormData, StockDialogProps } from "./StockDialog.types";

export const StockDialog = ({
  open,
  onOpenChange,
  items,
}: StockDialogProps) => {
  const scrollingContainer = useRef<HTMLDivElement>(null);
  const itemsContainer = useRef<HTMLDivElement>(null);

  const utils = api.useUtils();

  const { mutateAsync, isPending } =
    api.items.updateMultipleBooleanInStock.useMutation({
      onSuccess: async () => {
        onOpenChange(false);

        await Promise.all([
          await utils.items.getAll.invalidate(),
          await utils.shoppingList.getAll.invalidate(),
        ]);
      },
    });

  const form = useForm<StockCheckFormData>({
    resolver: zodResolver(stockCheckFormSchema),
    defaultValues: {
      outOfStockItems: [],
    },
  });

  const {
    formState: { isDirty },
  } = form;

  const handleSubmit = async (values: StockCheckFormData) => {
    await mutateAsync(values);
  };

  return (
    <DrawerDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Did you run out of anything?"
      description="Cross off items that you used up while cooking this meal."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="pt-3">
          <div
            ref={scrollingContainer}
            className="relative -m-1 max-h-[60vh] overflow-y-auto p-1"
          >
            <div ref={itemsContainer} className="grid gap-3">
              {items.map((item) => (
                <FormField
                  key={item.itemId}
                  control={form.control}
                  name="outOfStockItems"
                  render={({ field }) => (
                    <StockItemField item={item} field={field} />
                  )}
                />
              ))}
            </div>

            <StockDialogScrollIndicator
              scrollingContainer={scrollingContainer}
              itemsContainer={itemsContainer}
            />
          </div>

          <div className="grid w-full gap-2">
            <LoadingButton
              type="submit"
              disabled={!isDirty}
              className="w-full"
              isLoading={isPending}
            >
              Update items
            </LoadingButton>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              Don&apos;t Update
            </Button>
          </div>
        </form>
      </Form>
    </DrawerDialog>
  );
};
