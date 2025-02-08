"use client";

import { api } from "@/trpc/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type EditableIngredientProps } from "./EditableIngredient.types";
import { Check } from "lucide-react";
import { LoadingButton } from "@/components/LoadingButton";

const formSchema = z.object({
  name: z.string().min(1).max(255),
});

export const EditableIngredient = ({
  ingredient,
  onUpdate,
}: EditableIngredientProps) => {
  const { id, name } = ingredient;
  const utils = api.useUtils();

  const { mutate, isPending } = api.ingredients.update.useMutation({
    onSuccess: async () => {
      await utils.ingredients.getAll.invalidate();
      form.reset();
      onUpdate();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ id, name: values.name });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-[1fr_auto] items-center gap-1"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Ingredient name"
                  {...field}
                  className="md:text-md -ml-3 h-9 border-0 bg-none"
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isLoading={isPending} size="icon-sm" type="submit">
          <Check />
        </LoadingButton>
      </form>
    </Form>
  );
};
