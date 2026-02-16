import { Skeleton } from "../ui/skeleton";

export default function FiltersSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between md:hidden">
        <Skeleton className="h-8 w-[110px]" />
        <Skeleton className="h-3 w-[110px]" />
      </div>

      <Skeleton className="sticky top-20 h-fit p-4 min-w-60 rounded-lg border border-light-300 bg-light-100 hidden md:block">
        <div className="mb-2 flex items-center justify-between h-[36px]">
          <Skeleton className="w-30 h-3.5" />
          <Skeleton className="w-12 h-3.5" />
        </div>

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="border-b border-light-300 py-4 [&]:last-of-type:border-0"
            key={index}
          >
            <div className="flex w-full items-center justify-between text-body-medium text-dark-900 hover:cursor-pointer">
              <Skeleton className="w-25 h-3" />
              <Skeleton className="w-7 h-6" />
            </div>

            <div className="mt-3 block">
              <ul className="space-y-2">
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <li key={index} className="flex items-center gap-2">
                      <Skeleton className="size-6" />
                      <Skeleton className="h-3 w-25" />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </Skeleton>
    </>
  );
}
