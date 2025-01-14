"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

type navLinkArray = {
  navTitle: string;
  href: string;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
  props: any;
}>) {
  const pathname = usePathname();
  const NavLinkArray: navLinkArray[] = [
    { navTitle: "Produk", href: "/" },
    { navTitle: "Belanja", href: "/shop" },
  ];
  return (
    <html lang="en">
      <head>
        <title>Sidi Room</title>
      </head>
      <body className={inter.className}>
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          zIndex={1600}
          showAtBottom={false}
        />{" "}
        <Header navLinkArray={NavLinkArray} currentNav={pathname} />
        {children}
        <Footer navLinkArray={NavLinkArray} currentNav={pathname} />
      </body>
    </html>
  );
}
