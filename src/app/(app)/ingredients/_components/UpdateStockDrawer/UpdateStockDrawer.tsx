import { DrawerDialog } from "@/components/DrawerDialog";
import { Save, SquareCheck, SquareX } from "lucide-react";
import { type UpdateStockDrawerProps } from "./UpdateStockDrawer.types";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { LoadingButton } from "@/components/LoadingButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IngredientListItemMenu } from "../IngredientListItemMenu";

const formSchema = z.object({
  amountAvailable: z.string().min(0),
});

export const UpdateStockDrawer = ({ ingredient }: UpdateStockDrawerProps) => {
  const { id, inStock, amountAvailable, useAmount } = ingredient;
  const utils = api.useUtils();

  const { mutate: updateUseAmount } =
    api.ingredients.updateUseAmount.useMutation({
      onSuccess: async () => {
        await utils.ingredients.getAll.invalidate();
        await utils.shoppingList.getAll.invalidate();
      },
    });

  const {
    mutate: updateAvailableAmount,
    isPending: isUpdateAvailableAmountPending,
  } = api.ingredients.updateAmountAvailable.useMutation({
    onSuccess: async () => {
      await utils.ingredients.getAll.invalidate();
      await utils.shoppingList.getAll.invalidate();
    },
  });

  const { mutate: updateInStock, isPending: isUpdateInStockPending } =
    api.ingredients.updateInStock.useMutation({
      onSuccess: async () => {
        await utils.ingredients.getAll.invalidate();
        await utils.shoppingList.getAll.invalidate();
      },
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountAvailable: String(amountAvailable),
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateAvailableAmount({
      id,
      amountAvailable: parseInt(values.amountAvailable),
    });
  };

  const handleUpdateUseAmount = () => {
    updateUseAmount({
      id,
      useAmount: !useAmount,
    });
  };

  const handleUpdateInStock = () => {
    updateInStock({
      id,
      inStock: !inStock,
    });
  };

  return (
    <DrawerDialog
      title="Update Stock"
      description="Enable amount to allow setting a required amount in meals which will be reflected in the shopping list for planned meals."
      customTrigger={<IngredientListItemMenu id={id} />}
    >
      <div className="grid gap-3">
        <div className="flex items-center space-x-2">
          <Switch
            checked={useAmount}
            onCheckedChange={handleUpdateUseAmount}
            id="useAmount"
          />
          <Label htmlFor="useAmount">Use Amount</Label>
        </div>

        <div>
          {useAmount ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-[1fr_auto] items-end gap-3"
              >
                <FormField
                  control={form.control}
                  name="amountAvailable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount Available</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <LoadingButton
                  isLoading={isUpdateAvailableAmountPending}
                  type="submit"
                >
                  <span className="flex items-center gap-2">
                    <Save />
                    Save Changes
                  </span>
                </LoadingButton>
              </form>
            </Form>
          ) : (
            <LoadingButton
              isLoading={isUpdateInStockPending}
              onClick={handleUpdateInStock}
            >
              <span className="flex items-center gap-3">
                {inStock ? <SquareX /> : <SquareCheck />}
                {inStock ? "Mark as Out of Stock" : "Mark as In Stock"}
              </span>
            </LoadingButton>
          )}
        </div>
      </div>
    </DrawerDialog>
  );
};
