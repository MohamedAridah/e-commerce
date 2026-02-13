import Image from "next/image";
import { Button } from "./ui/button";

type Props = { variant?: "sign-in" | "sign-up" };

export default function SocialProviders({ variant = "sign-in" }: Props) {
  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        size="lg"
        className="w-full gap-3"
        aria-label={`${variant === "sign-in" ? "Continue" : "Sign up"} with Google`}
      >
        <Image src="/social/google.svg" alt="" width={18} height={18} />
        <span>Continue with Google</span>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full gap-3"
        aria-label={`${variant === "sign-in" ? "Continue" : "Sign up"} with Apple`}
      >
        <Image src="/social/apple.svg" alt="" width={18} height={18} />
        <span>Continue with Apple</span>
      </Button>
    </div>
  );
}
