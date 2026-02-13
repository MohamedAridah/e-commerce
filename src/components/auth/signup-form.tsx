"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { signUpSchema } from "@/lib/validation/auth";
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

type Props = {
  onSubmit: (
    formData: z.infer<typeof signUpSchema>,
  ) => Promise<{ ok: boolean; userId?: string; message?: string } | void>;
};

export function SignUpForm({ onSubmit }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleSignIn = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const result = await onSubmit(data);
      if (result?.ok) {
        toast.success("Signed up successfully!");
        router.push("/");
      } else {
        toast.error(result?.message);
      }
    } catch (e) {
      toast.error("Something went wrong while Signing up.");
      console.log("error", e);
    }
  };
  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(handleSignIn)}>
      <FieldGroup className="gap-6">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                placeholder="Enter your name"
                aria-invalid={fieldState.invalid}
                autoComplete="name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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
                aria-invalid={fieldState.invalid}
                placeholder="your password..."
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <PasswordInput
                id="confirmPassword"
                aria-invalid={fieldState.invalid}
                placeholder="confirm your password..."
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
        <LoadingSwap isLoading={isLoading}>Sign Up</LoadingSwap>
      </Button>

      <p className="text-center text-footnote text-dark-700">
        By signing up, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
      </p>
    </form>
  );
}
