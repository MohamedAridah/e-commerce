import AuthForm from "@/components/auth/AuthForm";
import { signIn } from "@/lib/auth/actions";

export default function Page() {
  return <AuthForm mode="sign-in" onSubmit={signIn} />;
}
