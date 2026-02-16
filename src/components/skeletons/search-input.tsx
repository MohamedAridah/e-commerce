import { SearchIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const SearchInputSkeleton = () => {
  return (
    <div className="relative flex items-center">
      <Skeleton className="h-10 my-4 w-full" />
      <SearchIcon className="size-4 absolute start-3 text-muted-foreground" />
    </div>
  );
};

export default SearchInputSkeleton;
