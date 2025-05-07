import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { StockCheckItemField } from "../StockCheckItemField";
import { LoadingButton } from "@/components/LoadingButton";
import { StockCheckScrollIndicator } from "../StockCheckScrollIndicator";
import { stockCheckFormSchema } from "./StockCheckForm.schemas";
import type {
  StockCheckFormData,
  StockCheckFormProps,
} from "./StockCheckForm.types";

export const StockCheckForm = ({ items, onClose }: StockCheckFormProps) => {
  const scrollingContainer = useRef<HTMLDivElement>(null);
  const itemsContainer = useRef<HTMLDivElement>(null);

  const utils = api.useUtils();

  const { mutateAsync, isPending } =
    api.items.updateMultipleBooleanInStock.useMutation({
      onSuccess: async () => {
        await Promise.all([
          await utils.items.getAll.invalidate(),
          await utils.shoppingList.getAll.invalidate(),
        ]);
        handleClose();
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

  const handleClose = () => {
    form.reset();
    onClose?.();
  };

  return (
    <>
      <div
        ref={scrollingContainer}
        className="relative -m-1 max-h-[60vh] overflow-y-auto p-1"
      >
        <div ref={itemsContainer}>
          <Form {...form}>
            <form
              id="stockCheckForm"
              onSubmit={form.handleSubmit(handleSubmit)}
              className="grid gap-3 pt-3"
            >
              {items.map((item) => (
                <FormField
                  key={item.itemId}
                  control={form.control}
                  name="outOfStockItems"
                  render={({ field }) => (
                    <StockCheckItemField item={item} field={field} />
                  )}
                />
              ))}
            </form>
          </Form>
        </div>

        <StockCheckScrollIndicator
          scrollingContainer={scrollingContainer}
          itemsContainer={itemsContainer}
        />
      </div>

      <div className="grid w-full gap-2">
        <LoadingButton
          type="submit"
          form="stockCheckForm"
          disabled={!isDirty}
          className="w-full"
          isLoading={isPending}
        >
          Update items
        </LoadingButton>

        <Button
          type="button"
          variant="outline"
          onClick={handleClose}
          className="w-full"
        >
          Don&apos;t Update
        </Button>
      </div>
    </>
  );
};
