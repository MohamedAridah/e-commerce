import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const socialMedia = [
  {
    name: "X",
    src: "/social/x.svg",
    url: "",
  },
  {
    name: "Facebook",
    src: "/social/facebook.svg",
    url: "",
  },
  {
    name: "Instagram",
    src: "/social/instagram.svg",
    url: "",
  },
];

export default function SocialMedia({
  ...props
}: React.HTMLAttributes<HTMLAnchorElement>) {
  return socialMedia.map((provider) => (
    <Link
      key={provider.name}
      href={provider.url}
      aria-label={provider.name}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full bg-light-400",
        props.className,
      )}
      {...props}
    >
      <Image src={provider.src} alt={provider.name} width={18} height={18} />
    </Link>
  ));
}
