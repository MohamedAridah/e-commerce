"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { signInSchema } from "@/lib/validation/auth";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/utils/password-input";
import { toast } from "sonner";
import LoadingSwap from "../utils/loading-swap";
import { authClient } from "@/lib/auth/auth-client";

type Props = {
  onSubmit: (
    formData: z.infer<typeof signInSchema>,
  ) => Promise<{ ok: boolean; userId?: string; message?: string } | void>;
};

export function SignInForm({ onSubmit }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleSignIn = async (data: z.infer<typeof signInSchema>) => {
    try {
      await authClient.signIn.email({
        ...data,
        fetchOptions: {
          onError: ({ error }) => {
            toast.error(error.message);
          },
          onSuccess: () => {
            toast.success("Signed in successfully!");
            router.replace("/");
            router.refresh();
          },
        },
      });
    } catch (e) {
      toast.error("Something went wrong while Signing in.");
      console.log("error", e);
    }
  };
  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(handleSignIn)}>
      <FieldGroup className="gap-6">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                type="email"
                id="email"
                placeholder="johndoe@gmail.com"
                aria-invalid={fieldState.invalid}
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput
                id="password"
                aria-invalid={fieldState.invalid}
                placeholder="account password..."
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        size={"lg"}
        className="w-full rounded-full"
        disabled={isLoading}
      >
        <LoadingSwap isLoading={isLoading}>Sign In</LoadingSwap>
      </Button>
    </form>
  );
}
