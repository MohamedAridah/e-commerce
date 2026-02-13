"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilters } from "@/lib/search-params/search-params";

export const OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price (High → Low)", value: "price_desc" },
  { label: "Price (Low → High)", value: "price_asc" },
] as const;

export default function Sort() {
  const [{ sort }, setSearchParams] = useFilters();

  const onChange = (value: string) => {
    setSearchParams({ sort: value, page: 1 });
  };

  // const resetFilters = () => {
  //   setSearchParams(null);
  // };

  return (
    <div className="flex items-center gap-px">
      <Select onValueChange={(value) => onChange(value)}>
        <SelectTrigger className="w-[160px]" aria-label="Sort products">
          <SelectValue
            placeholder={`Sort By: ${OPTIONS.find((o) => o.value === sort)?.label || "Featured"}`}
          />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          {OPTIONS.map((sortOption) => (
            <SelectItem key={sortOption.value} value={sortOption.value}>
              Sort By: {sortOption.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* <Button
        variant={"link"}
        size={"sm"}
        className="underline text-sm text-muted-foreground active:scale-95"
        onClick={resetFilters}
      >
        Reset
      </Button> */}
    </div>
  );
}
