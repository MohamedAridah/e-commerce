import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import User from "./user";
import { SearchDialog } from "../search-dialog";

type NavOptionsProps = React.ComponentProps<"div">;

export default function NavOptions({ ...props }: NavOptionsProps) {
  return (
    <div className={props.className}>
      <User />
      <SearchDialog />
      <Button variant={"ghost"} size={"icon"} className="rounded-full relative">
        <ShoppingCartIcon />
        <p className="flex items-center justify-center size-3.5 rounded-full bg-blue-500 text-white absolute top-0 end-0 text-[10px] p-1 ">
          8
        </p>
      </Button>
    </div>
  );
}
