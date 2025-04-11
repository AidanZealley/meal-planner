"use client";

import { api } from "@/trpc/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, type ControllerRenderProps } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check, Plus, X } from "lucide-react";
import { LoadingButton } from "@/components/LoadingButton";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Counter } from "@/app/(app)/_components/Counter";
import { cn } from "@/lib/utils";

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

  const { control } = form;

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
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel>Use Amount</FormLabel>
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
                    <Button
                      variant="secondary"
                      onClick={() => handleInStockChange(field)}
                      className="group pl-1.5"
                      type="button"
                    >
                      <span className="grid w-full grid-cols-[auto_1fr] items-center gap-3">
                        <span
                          className={cn(
                            "grid h-5 w-5 place-items-center rounded-full transition-colors",
                            amountAvailable > 0
                              ? "bg-foreground"
                              : "bg-foreground/10 group-hover:bg-foreground/20",
                          )}
                        >
                          <Check
                            className={cn(
                              "col-start-1 row-start-1 h-2 w-2 text-green-400 opacity-100 transition-opacity",
                              amountAvailable > 0
                                ? "group-hpver:hidden inline"
                                : "hidden group-hover:inline",
                            )}
                          />
                          <X
                            className={cn(
                              "col-start-1 row-start-1 h-2 w-2 text-red-400 opacity-100 transition-opacity",
                              amountAvailable > 0
                                ? "hidden"
                                : "inline group-hover:hidden",
                            )}
                          />
                        </span>
                        <span
                          className={cn(
                            "text-left",
                            amountAvailable > 0 ? "" : "line-through",
                          )}
                        >
                          In Stock
                        </span>
                      </span>
                    </Button>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>
        <LoadingButton isLoading={isPending} type="submit">
          <span className="flex items-center gap-2">
            <Plus />
            Add Item
          </span>
        </LoadingButton>
      </form>
    </Form>
  );
};
