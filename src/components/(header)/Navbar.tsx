import Image from "next/image";
import Link from "next/link";
import MobileSheet from "./mobile-sheet";
import NavLinks from "./nav-links";
import NavOptions from "./nav-options";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-light-100">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary Navbar"
      >
        <Link href="/" aria-label="Groomi Home" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Groomi Logo"
            width={28}
            height={28}
            priority
            className="invert"
          />
        </Link>

        <NavLinks className="hidden items-center gap-8 md:flex" />

        <div className="flex items-center gap-1">
          <NavOptions className="flex items-center gap-1" />
          <MobileSheet />
        </div>
      </nav>
    </header>
  );
}
