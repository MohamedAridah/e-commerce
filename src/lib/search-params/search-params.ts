import { Options, useQueryStates } from "nuqs";
import {
  createLoader,
  parseAsInteger,
  parseAsString,
  UrlKeys,
  parseAsNativeArrayOf,
  inferParserType,
} from "nuqs/server";
import { createTypedLink } from "../utils/typed-links";

const DEFAULT_SORT_OPTION = "featured";
const DEFAULT_PAGE_OPTION = 1;

export const searchParams = {
  search: parseAsString.withDefault(""),
  genderSlugs: parseAsNativeArrayOf(parseAsString),
  sizeSlugs: parseAsNativeArrayOf(parseAsString),
  colorSlugs: parseAsNativeArrayOf(parseAsString).withDefault([]),
  brandSlugs: parseAsNativeArrayOf(parseAsString).withDefault([]),
  categorySlugs: parseAsNativeArrayOf(parseAsString).withDefault([]),
  priceMin: parseAsString,
  priceMax: parseAsString,
  priceRanges: parseAsNativeArrayOf(parseAsString).withDefault([]),
  sort: parseAsString,
  page: parseAsInteger,
  // sort: parseAsString.withDefault("featured"),
  // page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(14),
};

export type ParsedSearchParams = inferParserType<typeof searchParams>;

export type ArrayFilterKeys = {
  [K in keyof ParsedSearchParams]: ParsedSearchParams[K] extends any[] | null
    ? K
    : never;
}[keyof ParsedSearchParams];

const urlKeys: UrlKeys<typeof searchParams> = {
  genderSlugs: "gender",
  sizeSlugs: "size",
  colorSlugs: "color",
  priceRanges: "price",
};

export const loadFilters = createLoader(searchParams, { urlKeys });

export const getProductsLink = createTypedLink("/products", searchParams, {
  urlKeys,
});

export const useFilters = (options: Options = {}) =>
  useQueryStates(searchParams, {
    ...options,
    urlKeys,
    shallow: false,
  });

export { DEFAULT_PAGE_OPTION, DEFAULT_SORT_OPTION };
