"use client";

import { useForm, useWatch, type ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Undo } from "lucide-react";

import { api } from "@/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { LoadingButton } from "@/components/LoadingButton";
import { Counter } from "@/app/(app)/_components/Counter";
import { InStockToggle } from "../InStockToggle";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1).max(255),
  useAmount: z.boolean(),
  amountAvailable: z.number(),
});

export const NewItem = () => {
  const utils = api.useUtils();

  const { mutate, isPending } = api.items.create.useMutation({
    onSuccess: async () => {
      await utils.items.getAll.invalidate();
      form.reset();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      useAmount: false,
      amountAvailable: 1,
    },
    reValidateMode: "onSubmit",
  });

  const {
    control,
    formState: { isDirty },
    reset,
  } = form;

  const useAmount = useWatch({
    control,
    name: "useAmount",
  });

  const amountAvailable = useWatch({
    control,
    name: "amountAvailable",
  });

  const handleInStockChange = (
    field: ControllerRenderProps<z.infer<typeof formSchema>, "amountAvailable">,
  ) => {
    field.onChange(amountAvailable ? 0 : 1);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { name, useAmount, amountAvailable } = values;

    mutate({
      name,
      type: useAmount ? "amount" : "boolean",
      amountAvailable,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Item name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between gap-3">
          <FormField
            control={form.control}
            name="useAmount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="useAmount"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel htmlFor="useAmount">Use Amount</FormLabel>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {useAmount ? (
            <FormField
              control={form.control}
              name="amountAvailable"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Counter
                      value={field.value}
                      onIncrement={(value) => field.onChange(value)}
                      onDecrement={(value) => field.onChange(value)}
                      minValue={0}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="amountAvailable"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InStockToggle
                      inStock={field.value > 0}
                      onInStockChange={() => handleInStockChange(field)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => reset()}
            variant="outline"
            disabled={!isDirty}
            className="flex-1"
          >
            <span className="flex items-center gap-2">
              <Undo className="h-4 w-4" />
              Reset
            </span>
          </Button>
          <LoadingButton isLoading={isPending} type="submit" className="flex-1">
            <span className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Item
            </span>
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
