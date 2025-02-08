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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/LoadingButton";

const formSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().min(1).max(255),
  password: z.string(),
  signUpPassword: z.string(),
});

export const SignUpForm = () => {
  const utils = api.useUtils();

  const { mutate, isPending } = api.users.signUp.useMutation({
    onSuccess: async () => {
      await utils.meals.getAll.invalidate();
      form.reset();
      router.push("/dashboard");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      signUpPassword: "",
    },
  });

  const onSubmit = ({
    name,
    email,
    password,
    signUpPassword,
  }: z.infer<typeof formSchema>) => {
    mutate({
      name,
      email,
      password,
      signUpPassword,
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
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="signUpPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sign Up Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isLoading={isPending} type="submit">
          Sign Up
        </LoadingButton>
      </form>
    </Form>
  );
};
