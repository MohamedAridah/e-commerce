"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import FilterGroup from "./filter-group";
import { Checkbox } from "./ui/checkbox";
import { useFilters } from "@/lib/search-params/search-params";
import { FilterIcon } from "lucide-react";
import { toggleFilter } from "@/lib/utils/helpers";
import { useSearchParams } from "next/navigation";

const GENDERS = ["men", "women", "unisex"] as const;
const SIZES = ["XS", "S", "M", "L", "XL"] as const;
const COLORS = ["black", "white", "red", "green", "blue", "grey"] as const;
const PRICES = [
  { id: "0-50", label: "$0 - $50" },
  { id: "50-100", label: "$50 - $100" },
  { id: "100-150", label: "$100 - $150" },
  { id: "150-", label: "Over $150" },
] as const;

export default function FiltersSheet() {
  const [{}, setSearchParams] = useFilters();
  const clearAllFilters = () => setSearchParams(null);

  return (
    <div className="flex items-center justify-between md:hidden">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline" size={"lg"} className="capitalize">
            <FilterIcon /> Filters
          </Button>
        </DrawerTrigger>

        <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
          <DrawerHeader>
            <DrawerTitle>
              <FilterHeader />
            </DrawerTitle>

            <DrawerDescription>
              Filter poducts the way you want.
            </DrawerDescription>
          </DrawerHeader>

          <div className="overflow-y-auto px-4">
            <FilterCategories />
          </div>
        </DrawerContent>
      </Drawer>

      <Button
        variant={"link"}
        className="text-caption text-dark-700 underline p-0 underline-offset-2"
        onClick={clearAllFilters}
      >
        Clear all
      </Button>
    </div>
  );
}

export function FilterHeader() {
  const [{}, setSearchParams] = useFilters();
  const params = useSearchParams();
  const filtersCount = params.size;

  const clearAllFilters = () => setSearchParams(null);

  return (
    <div className="mb-2 flex items-center justify-between">
      <h3 className="text-body-medium flex items-center gap-1.5">
        Filters
        {filtersCount > 0 && (
          <p className="flex items-center justify-center gap-1 rounded-full border border-light-300 size-6 p-1 text-caption text-dark-900 capitalize">
            {filtersCount}
          </p>
        )}
      </h3>
      <Button
        variant={"link"}
        className="text-caption text-dark-700 underline p-0 underline-offset-2"
        onClick={clearAllFilters}
      >
        Clear all
      </Button>
    </div>
  );
}
export function FilterCategories() {
  const [{ genderSlugs, sizeSlugs, colorSlugs, priceRanges }, setSearchParams] =
    useFilters();

  return (
    <>
      <FilterGroup
        groupKey="gender"
        title={`Gender ${genderSlugs.length > 0 ? `(${genderSlugs.length})` : ""}`}
      >
        <ul className="space-y-2">
          {GENDERS.map((gender) => {
            return (
              <li key={gender} className="flex items-center gap-2">
                <Checkbox
                  id={`gender-${gender}`}
                  checked={genderSlugs.includes(gender)}
                  onCheckedChange={() =>
                    toggleFilter(setSearchParams, "genderSlugs", gender)
                  }
                  className="hover:cursor-pointer"
                />
                <label
                  htmlFor={`gender-${gender}`}
                  className="text-body capitalize hover:cursor-pointer"
                >
                  {gender}
                </label>
              </li>
            );
          })}
        </ul>
      </FilterGroup>

      <FilterGroup
        title={`Size ${sizeSlugs.length > 0 ? `(${sizeSlugs.length})` : ""}`}
        groupKey="size"
      >
        <ul className="grid grid-cols-4 gap-2">
          {SIZES.map((size) => {
            return (
              <li key={size} className="flex items-center gap-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={sizeSlugs.includes(size.toLowerCase())}
                  onCheckedChange={() =>
                    toggleFilter(
                      setSearchParams,
                      "sizeSlugs",
                      size.toLowerCase(),
                    )
                  }
                  className="hover:cursor-pointer"
                />
                <label htmlFor={`size-${size}`} className="text-body">
                  {size}
                </label>
              </li>
            );
          })}
        </ul>
      </FilterGroup>

      <FilterGroup
        title={`Color ${colorSlugs.length > 0 ? `(${colorSlugs.length})` : ""}`}
        groupKey="color"
      >
        <ul className="grid grid-cols-2 gap-2">
          {COLORS.map((color) => {
            return (
              <li key={color} className="flex items-center gap-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={colorSlugs.includes(color)}
                  onCheckedChange={() =>
                    toggleFilter(setSearchParams, "colorSlugs", color)
                  }
                  className="hover:cursor-pointer"
                />
                <label
                  htmlFor={`color-${color}`}
                  className="text-body capitalize"
                >
                  {color}
                </label>
              </li>
            );
          })}
        </ul>
      </FilterGroup>

      <FilterGroup
        title={`Price ${priceRanges.length > 0 ? `(${priceRanges.length})` : ""}`}
        groupKey="price"
        className="border-0"
      >
        <ul className="space-y-2">
          {PRICES.map((price) => {
            return (
              <li key={price.id} className="flex items-center gap-2">
                <Checkbox
                  id={`price-${price.id}`}
                  checked={priceRanges.includes(price.id)}
                  onCheckedChange={() =>
                    toggleFilter(setSearchParams, "priceRanges", price.id)
                  }
                  className="hover:cursor-pointer"
                />
                <label htmlFor={`price-${price.id}`} className="text-body">
                  {price.label}
                </label>
              </li>
            );
          })}
        </ul>
      </FilterGroup>
    </>
  );
}
