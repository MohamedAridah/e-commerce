import {
  ArrayFilterKeys,
  ParsedSearchParams,
} from "../search-params/search-params";

export function toggleArrayValue<T>(
  current: T[] | null | undefined,
  value: T,
): T[] {
  const safe = current ?? [];

  return safe.includes(value)
    ? safe.filter((v) => v != value)
    : [...safe, value];
}

export const toggleFilter = (
  setter: (updater: (prev: ParsedSearchParams) => ParsedSearchParams) => void,
  key: ArrayFilterKeys,
  value: string,
) => {
  setter((prev) => ({
    ...prev,
    [key]: toggleArrayValue(prev[key] as any, value),
  }));
};

export function formatPrice(price: number | null | undefined) {
  if (price === null || price === undefined) return undefined;
  return `$${price.toFixed(2)}`;
}
