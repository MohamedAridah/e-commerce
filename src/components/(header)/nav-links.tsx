import { getProductsLink } from "@/lib/search-params/search-params";
import Link from "next/link";
import React from "react";

const NAV_LINKS = [
  { label: "Men", href: getProductsLink({genderSlugs:["men"]}) },
  { label: "Women", href: getProductsLink({genderSlugs:["women"]}) },
  { label: "Kids", href: getProductsLink({genderSlugs:["unisex"]}) },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
] as const;

type NavLinksProps = React.ComponentProps<"ul">;

export default function NavLinks({ ...props }: NavLinksProps) {
  return (
    <ul className={props.className}>
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-body text-dark-900 transition-colors hover:text-dark-700"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
