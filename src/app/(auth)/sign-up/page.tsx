import AuthForm from "@/components/auth/AuthForm";
import { signUp } from "@/lib/auth/actions";

export default function Page() {
  return <AuthForm mode="sign-up" onSubmit={signUp} />;
}
