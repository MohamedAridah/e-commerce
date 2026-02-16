import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

type Props = {
  breadcrumbs: BreadcrumbItem[];
} & React.ComponentProps<"nav">;

export default function BreadCrumbUI({ breadcrumbs, ...props }: Props) {
  const breadcrumbsCount = breadcrumbs.length;
  return (
    <Breadcrumb className={cn(props.className)} {...props}>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLastItem = breadcrumbsCount === ++index;
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem key={index}>
                {!isLastItem ? (
                  <BreadcrumbLink href={breadcrumb.href}>
                    {breadcrumb.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {isLastItem ? null : <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
