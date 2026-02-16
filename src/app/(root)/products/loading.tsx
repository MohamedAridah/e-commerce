import CardProductSkeleton from "@/components/skeletons/card-skeleton";
import FiltersSkeleton from "@/components/skeletons/filters-skeleton";
import SearchInputSkeleton from "@/components/skeletons/search-input";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const skeletons = Array.from({ length: 4 });
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-[110px]" />
        <Skeleton className="h-8 w-[110px]" />
      </div>

      <SearchInputSkeleton />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr] pt-4 pb-6">
        <FiltersSkeleton />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skeletons.map((_, index) => (
            <CardProductSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
