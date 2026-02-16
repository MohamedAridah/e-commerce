import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center gap-3">
      <h1>Logo here...</h1>
      <Loader2 className="animate-spin size-8" />
    </section>
  );
}
