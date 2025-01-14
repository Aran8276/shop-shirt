import React from "react";
import Link from "next/link";
import AppLogo from "./AppLogo";
// import SocialMedia from "./SocialMedia";

type navLinkArray = {
  navTitle: string;
  href: string;
};

interface SelfProps {
  currentNav: string;
  navLinkArray: navLinkArray[];
}

function Footer(props: SelfProps) {
  const footerUpperCase = (title: string) => {
    const res = title.toUpperCase();
    return res;
  };
  return (
    <footer className="flex justify-center text-white mt-48">
      <div className="flex flex-col bg-[#1f1f1f] h-fit py-14 w-screen">
        <div className="flex justify-around space-x-[24rem]">
          <div className="flex flex-col space-y-8 w-fit">
            <div className="flex space-x-6">
              <AppLogo className="w-12" />
              <span className="self-center text-2xl">Sidi Room</span>
            </div>
            <div>
              <div className="w-[18rem] opacity-65">
                Temukan kenyamanan dan gaya dalam setiap langkah dengan koleksi
                kaos dan celana kami.
              </div>
            </div>
          </div>
          <nav className="flex justify-start space-x-8 self-start text-center">
            {props.navLinkArray.map((link) => {
              return (
                <Link href={link.href} key={link.navTitle}>
                  <span
                    className={
                      props.currentNav === link.href
                        ? "opacity-100"
                        : "opacity-50 hover:opacity-75"
                    }
                  >
                    {footerUpperCase(link.navTitle)}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col w-full">
            <hr className="h-px my-8 bg-gray-700 mx-24 opacity-20" />
            <div className="flex justify-end mx-28 opacity-50">
              &copy; Copyright Sidi Room 2024 All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
