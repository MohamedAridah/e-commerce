"use client";

import { Input } from "@/components/ui/input";
import { useFilters } from "@/lib/search-params/search-params";
import { SearchIcon } from "lucide-react";
import { debounce } from "nuqs";
import { useTransition } from "react";
import LoadingSwap from "./loading-swap";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"div"> & { classNameInput?: string };

export default function SearchInput({ classNameInput, ...props }: Props) {
  const [isPending, startTransition] = useTransition();

  const [{ search }, setSearchParams] = useFilters({
    startTransition,
  });

  return (
    <div
      {...props}
      className={cn("relative flex items-center", props.className)}
    >
      <Input
        value={search}
        onChange={(e) => {
          startTransition(async () => {
            await setSearchParams(
              { search: e.target.value },
              {
                limitUrlUpdates: e.target.value ? debounce(250) : undefined,
              },
            );
          });
        }}
        placeholder="Search products"
        className={cn("ps-8.5", classNameInput)}
      />

      <SearchIcon className="size-4 absolute start-3 text-muted-foreground" />

      <LoadingSwap
        isLoading={isPending}
        className="size-4 absolute end-3 text-muted-foreground"
      />
    </div>
  );
}
