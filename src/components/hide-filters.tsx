"use client";

import { useQueryStates } from "nuqs";
import { Settings2Icon } from "lucide-react";
import { filtersSearchParams } from "@/lib/query/filters";

export default function HideFilters() {
  const [params, setParams] = useQueryStates(filtersSearchParams);

  return (
    <>
      <p>current filter state is: {params.filters}</p>

      <button
        type="button"
        className="flex items-center gap-0.5 text-sm text-muted-foreground cursor-pointer hover:text-dark-900 transition-all active:scale-95"
        onClick={() =>
          setParams({
            filters: params.filters === "visible" ? "hidden" : "visible",
          })
        }
      >
        Hide Filters <Settings2Icon className="size-4" />
      </button>
    </>
  );
}
