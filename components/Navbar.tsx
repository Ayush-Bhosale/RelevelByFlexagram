"use client";
import {  UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MdQuiz } from "react-icons/md";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="pt-5 w-full">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-between items-center border-b pb-5">
      <div className="flex items-center">
  {/* Logo */}
  <img src="/logo.svg" alt="Logo" className="w-8 h-8 mr-2" />

  {/* Text with Link */}
  <Link href={"/"} className="flex gap-1 items-center text-2xl">
    <h1 className="text-black font-bold">ReLevel</h1>
    <MdQuiz className="text-violet-500" />
  </Link>
</div>


        <div className="md:block hidden text-nowrap">
          <span className="bg-violet-500 px-5 py-1  rounded-md text-black">
            Today's Category: Javascript
          </span>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <UserMenu />
          
          <UserButton />
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;