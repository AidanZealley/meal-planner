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
import { type EditItemFormProps } from "./EditItemForm.types";
import { Check, Undo } from "lucide-react";
import { LoadingButton } from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1).max(255),
});

export const EditItemForm = ({ item }: EditItemFormProps) => {
  const { id, name } = item;
  const utils = api.useUtils();

  const { mutate, isPending } = api.items.update.useMutation({
    onSuccess: async (_, values) => {
      await utils.items.getAll.invalidate();
      reset({ name: values.name });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
  });

  const {
    reset,
    formState: { isDirty },
  } = form;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ id, name: values.name });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-[1fr_auto] items-center gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input placeholder="Item name" {...field} className="pr-8" />

                  {isDirty && (
                    <div className="absolute top-0 right-0 bottom-0 flex items-center p-0.5">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="hover:bg-transparent hover:opacity-50 dark:hover:bg-transparent"
                        type="button"
                        onClick={() => form.reset()}
                      >
                        <Undo />
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          isLoading={isPending}
          size="icon-sm"
          type="submit"
          disabled={!isDirty}
        >
          <Check />
        </LoadingButton>
      </form>
    </Form>
  );
};
