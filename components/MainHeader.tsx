import React from "react";
import Link from "next/link";
import MainNavBar from "./MainNavBar";
import { Outfit } from "next/font/google";
const outfit = Outfit({
  weight: "500",
  subsets: ["latin"],
});
const MainHeader = (): JSX.Element => {
  return (
    <header className="flex justify-between items-center p-2 sm:px-4 md:px-8 2xl:px-10">
      <div className="flex items-center">
        <Link
          href={"/"}
          className={`rounded-xl hover:shadow-slate-500 text-violet-500 font-bold text-3xl ${outfit.className}`}
        >
          V - Space
        </Link>
      </div>
      <MainNavBar />
    </header>
  );
};

export default MainHeader;
