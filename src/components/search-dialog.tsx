"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import SearchInput from "./utils/search-input";
import { SearchIcon, XIcon } from "lucide-react";
import { useFilters } from "@/lib/search-params/search-params";

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [_, setSearchParams] = useFilters();

  const clearSearchInput = () =>
    setSearchParams((prev) => ({ ...prev, search: null }));

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Trigger />
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-2xl p-0 -translate-y-1/4 top-1/4 gap-0"
          showCloseButton={false}
        >
          <DialogHeader className="text-left p-0 hidden">
            <DialogTitle className="sr-only">Search</DialogTitle>
            <DialogDescription className="sr-only">
              search our products...
            </DialogDescription>
          </DialogHeader>
          <Content clearSearch={clearSearchInput} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer direction="top" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Trigger />
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=top]:h-full data-[vaul-drawer-direction=top]:max-h-[100vh]  data-[vaul-drawer-direction=top]:rounded-e-none">
        <DrawerHeader className="text-left p-0 hidden">
          <DrawerTitle className="sr-only">Search</DrawerTitle>
          <DrawerDescription className="sr-only">
            search our products...
          </DrawerDescription>
        </DrawerHeader>
        <Content clearSearch={clearSearchInput} />
      </DrawerContent>
    </Drawer>
  );
}

const Trigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>((props, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className="rounded-full relative"
      {...props}
    >
      <SearchIcon />
    </Button>
  );
});

const Content = ({
  clearSearch,
}: {
  clearSearch: () => Promise<URLSearchParams>;
}) => {
  return (
    <>
      <div className="flex border-b">
        <SearchInput
          classNameInput="focus-visible:ring-0 ps-10 [&_svg]:start-10 py-6 border-0 focus-visible:border-input focus-visible:outline-none rounded-none shadow-0"
          className="w-full"
        />
        <DrawerClose onClick={() => clearSearch()} asChild>
          <Button variant="ghost" size={"icon"} className="h-full">
            <XIcon />
          </Button>
        </DrawerClose>
      </div>
   <div className="p-4 max-h-[80vh] overflow-y-auto no-scrollbar">
    <h2>Render filtered producteds here...</h2>
   </div>
    </>
  );
};
