"use client";

import { Settings2Icon } from "lucide-react";

export default function HideFilters() {
  return (
    <>
      <button
        type="button"
        className="flex items-center gap-0.5 text-sm text-muted-foreground cursor-pointer hover:text-dark-900 transition-all active:scale-95"
        onClick={() => {}}
      >
        Hide Filters <Settings2Icon className="size-4" />
      </button>
    </>
  );
}
