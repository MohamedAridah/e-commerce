"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

type GroupKey = "gender" | "size" | "color" | "price";

type Props = {
  title: string;
  children: React.ReactNode;
  groupKey: GroupKey;
};
const FilterGroup = ({
  title,
  children,
  groupKey,
  ...props
}: React.ComponentProps<"div"> & Props) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={cn("border-b border-light-300 py-4", props.className)}>
      <button
        className="flex w-full items-center justify-between text-body-medium text-dark-900 hover:cursor-pointer"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-controls={`${groupKey}-section`}
      >
        <span>{title}</span>
        <span className="text-caption text-dark-700">
          {expanded ? "−" : "+"}
        </span>
      </button>

      <div
        id={`${groupKey}-section`}
        className={`${expanded ? "mt-3 block" : "hidden"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default FilterGroup;
