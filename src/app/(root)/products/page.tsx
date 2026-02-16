import { Card } from "@/components";
import Filters from "@/components/Filters";
import Sort from "@/components/sort-button";
import { getAllProducts } from "@/lib/actions/product";
import SearchInput from "@/components/utils/search-input";
import {
  ArrayFilterKeys,
  loadFilters,
} from "@/lib/search-params/search-params";
import FilterActiveBadges from "@/components/filter-active-badge";
import { Layers3Icon } from "lucide-react";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filters = await loadFilters(searchParams);
  const { products, totalCount } = await getAllProducts(filters as any);
  const params = await searchParams;

  const toArray = (value?: string | string[]): string[] =>
    value ? (Array.isArray(value) ? value : [value]) : [];

  const capitalize = (value: string): string =>
    value.charAt(0).toUpperCase() + value.slice(1);

  const formatPrice = (value: string): string => {
    const [min, max] = value.split("-");

    if (min && max) return `$${min} - $${max}`;
    if (min && !max) return `Over $${min}`;
    return `$0 - $${max}`;
  };

  const activeBadges: {
    key: ArrayFilterKeys;
    values: {
      raw: string;
      label: string;
    }[];
  }[] = [];

  activeBadges.push({
    key: "genderSlugs",
    values: toArray(params.gender).map((g) => ({
      raw: g,
      label: capitalize(g),
    })),
  });

  activeBadges.push({
    key: "sizeSlugs",
    values: toArray(params.size).map((s) => ({
      raw: s,
      label: `Size: ${s}`,
    })),
  });

  activeBadges.push({
    key: "colorSlugs",
    values: toArray(params.color).map((c) => ({
      raw: c,
      label: capitalize(c),
    })),
  });

  activeBadges.push({
    key: "priceRanges",
    values: toArray(params.price).map((p) => ({
      raw: p,
      label: formatPrice(p),
    })),
  });

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between pt-6">
        <h1 className="text-heading-3 text-dark-900">New ({totalCount})</h1>
        <Sort />
      </header>

      <SearchInput className="my-4 ms-auto md:max-w-[75%]" />

      <FilterActiveBadges
        badges={activeBadges.filter((b) => b.values.length > 0)}
      />

      <section className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr] pt-4 pb-6">
        <Filters />

        <div>
          {products.length === 0 ? (
            <NoProductsFound />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => {
                const price =
                  p.minPrice !== null &&
                  p.maxPrice !== null &&
                  p.minPrice !== p.maxPrice
                    ? `$${p.minPrice.toFixed(2)} - $${p.maxPrice.toFixed(2)}`
                    : p.minPrice !== null
                      ? p.minPrice
                      : undefined;
                return (
                  <Card
                    key={p.id}
                    title={p.name}
                    subtitle={p.subtitle ?? undefined}
                    imageSrc={p.imageUrl ?? "/shoes/shoe-1.jpg"}
                    price={price}
                    href={`/products/${p.id}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function NoProductsFound() {
  return (
    <div className="flex flex-col items-center gap-2 mt-[15vh] p-8 text-center">
      <Layers3Icon className="size-10 text-gray-700" />
      <p className="text-body text-dark-700">No products match your filters.</p>
    </div>
  );
}
