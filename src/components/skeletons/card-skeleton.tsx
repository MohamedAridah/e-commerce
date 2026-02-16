import { ImageIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function CardProductSkeleton() {
  return (
    <article className="group rounded-xl bg-light-100 ring-1 ring-light-300 transition-colors">
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <Skeleton className="object-cover transition-transform duration-300 group-hover:scale-105 flex items-center justify-center h-full">
          <ImageIcon className="size-9 text-gray-400" />
        </Skeleton>
      </div>
      <div className="p-4">
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <Skeleton className="w-34 h-3" />
          <Skeleton className="w-10 h-3" />
        </div>

        <Skeleton className="w-25 h-3" />

        <div className="mt-2 flex items-center justify-end gap-1">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton className="w-10 h-3" key={index} />
          ))}
        </div>
      </div>
    </article>
  );
}
