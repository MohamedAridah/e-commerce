import Link from "next/link";
import SocialProviders from "../SocialProviders";
import { SignInForm } from "./login-form";
import { SignUpForm } from "./signup-form";

type Props = {
  mode: "sign-in" | "sign-up";
  onSubmit: (formData: any) => Promise<{ ok: boolean; userId?: string } | void>;
};

const modeText = {
  "sign-in": {
    title: "Welcome Back!",
    description: "Sign in to continue your journey",
    toggleText: "Don't have an account? ",
    submitButtonText: "Sign Up",
    path: "/sign-up",
  },
  "sign-up": {
    title: "Join Groomi Today!",
    description: "Create your account to start your fitness journey",
    toggleText: "Already have an account? ",
    submitButtonText: "Sign In",
    path: "/sign-in",
  },
};

export default function AuthForm({ mode, onSubmit }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="mt-3 text-heading-3 text-dark-900">
          {modeText[mode].title}
        </h1>
        <p className="mt-1 text-body text-dark-700">
          {modeText[mode].description}
        </p>
      </div>

      <SocialProviders variant={mode} />

      <div className="flex items-center gap-4">
        <hr className="h-px w-full border-0 bg-light-300" />
        <span className="shrink-0 text-caption text-dark-700">
          Or {mode === "sign-in" ? "sign in" : "sign up"} with
        </span>
        <hr className="h-px w-full border-0 bg-light-300" />
      </div>

      {mode === "sign-in" ? (
        <SignInForm onSubmit={onSubmit} />
      ) : (
        <SignUpForm onSubmit={onSubmit} />
      )}

      <div className="text-center">
        <p className="text-caption text-dark-700">
          {modeText[mode].toggleText}

          <Link href={modeText[mode].path} className="underline">
            {modeText[mode].submitButtonText}
          </Link>
        </p>
      </div>
    </div>
  );
}
