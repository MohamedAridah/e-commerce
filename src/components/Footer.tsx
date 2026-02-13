import Image from "next/image";
import Link from "next/link";
import SocialMedia from "./utils/social-media";

const columns = [
  {
    title: "Featured",
    links: ["Air Force 1", "Huarache", "Air Max 90", "Air Max 95"],
  },
  {
    title: "Shoes",
    links: ["All Shoes", "Custom Shoes", "Jordan Shoes", "Running Shoes"],
  },
  {
    title: "Clothing",
    links: [
      "All Clothing",
      "Modest Wear",
      "Hoodies & Pullovers",
      "Shirts & Tops",
    ],
  },
  {
    title: "Kids'",
    links: [
      "Infant & Toddler Shoes",
      "Kids' Shoes",
      "Kids' Jordan Shoes",
      "Kids' Basketball Shoes",
    ],
  },
] as const;

const terms = [
  {
    name: "Guides",
    url: "",
  },
  {
    name: "Terms of Sale",
    url: "",
  },
  {
    name: "Terms of Use",
    url: "",
  },
  {
    name: "Groomi Privacy Policy",
    url: "",
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-light-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 md:grid-cols-12">
          <div className="flex items-start md:col-span-2">
            <Image src="/logo.svg" alt="Groomi" width={48} height={48} />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-heading-3">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-body text-sm text-light-400 hover:text-light-300"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex gap-4 md:col-span-2 md:justify-end">
            <SocialMedia />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 text-light-400 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-caption">
            <Image src="/globe.svg" alt="" width={16} height={16} />
            <span>Egypt</span>
            <span>© 2026 Groomi. All Rights Reserved</span>
          </div>
          <ul className="flex items-center gap-6 text-caption">
            {terms.map((t) => (
              <li key={t.name}>
                <Link href={t.url}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
