"use client";

import { ArrayFilterKeys, useFilters } from "@/lib/search-params/search-params";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import { toggleFilter } from "@/lib/utils/helpers";

type Props = {
  badges: {
    key: ArrayFilterKeys;
    values: {
      raw: string;
      label: string;
    }[];
  }[];
};

export default function FilterActiveBadges({ badges }: Props) {
  const [_, setSearchParams] = useFilters();

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) =>
        badge.values.map((value) => (
          <p
            key={`${badge.key}-${value.raw}`}
            className="flex items-center gap-1 rounded-full border border-light-300 px-3 py-1 text-caption text-dark-900 capitalize"
          >
            {value.label}

            <Button
              variant="ghost"
              size="icon-xs"
              className="size-3.5 text-muted-foreground -me-2"
              onClick={() =>
                toggleFilter(setSearchParams, badge.key, value.raw)
              }
              asChild
            >
              <XIcon />
            </Button>
          </p>
        )),
      )}
    </div>
  );
}
