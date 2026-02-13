import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import NavLinks from "./nav-links";
import NavOptions from "./nav-options";
import SocialMedia from "../utils/social-media";

export default function MobileSheet() {
  return (
    <Sheet>
      <SheetTrigger className="max-md:block md:hidden" asChild>
        <Button variant="ghost">
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
        </SheetHeader>
        <NavLinks className="space-y-2 px-4 py-3" />
        <NavOptions className="flex items-center justify-end pt-2 px-4 py-3" />

        <SheetFooter className="gap-6">
          <h2>Show Recommended</h2>
          <div className="flex gap-4">
            <SocialMedia />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
