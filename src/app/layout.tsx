import type { Metadata } from "next";
import { Jost, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Groomi",
  description: "An e-commerce platform for fashion and lifestyle products.",
};

export default function RootShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${jost.className} antialiased`}>
        <NuqsAdapter>
          {children}
          <Toaster />
        </NuqsAdapter>
      </body>
    </html>
  );
}
