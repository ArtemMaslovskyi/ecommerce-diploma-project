import React, { useEffect, useState } from "react";
import mainLogo from "../mainLogo.png";
import { CiBitcoin } from "react-icons/ci";
import { AiFillGold } from "react-icons/ai";
import { RiExchangeFundsFill } from "react-icons/ri";
import { MdOutlineShoppingCart } from "react-icons/md";
import Currencies from "./currency";

export default function Home() {
  return (
    <section className="mx-4 border-2 border-t-0">
      <div className="flex justify-between ">
        <div className="p-8">
          <h1 className="mb-6 text-6xl font-bold text-wrap">
            Best way to <span className=" text-main-yellow">Check & find</span>
          </h1>
          <h2 className="opacity-80 text-wrap">
            The place where you can find and check your investments
          </h2>
        </div>
        <img src={mainLogo} alt="Logo" className="h-96"></img>
      </div>
      <div className="flex *:mx-2 mx-4 *:cursor-pointer">
        <div className="relative">
          <div className="flex justify-center w-16 h-16 bg-blue-600 rounded-full blur-sm"></div>
          <div className="absolute top-0 left-0 ">
            <CiBitcoin className="w-16 h-16" />
          </div>
        </div>
        <div className="relative">
          <div className="flex justify-center w-16 h-16 bg-blue-600 rounded-full blur-sm"></div>
          <div className="absolute top-0 left-0 ">
            <AiFillGold className="w-16 h-16" />
          </div>
        </div>
        <div className="relative">
          <div className="flex justify-center w-16 h-16 bg-blue-600 rounded-full blur-sm"></div>
          <div className="absolute top-0 left-0 ">
            <RiExchangeFundsFill className="w-16 h-16" />
          </div>
        </div>
        <div className="relative">
          <div className="flex justify-center w-16 h-16 bg-blue-600 rounded-full blur-sm"></div>
          <div className="absolute top-1 left-1 ">
            <MdOutlineShoppingCart className="w-14 h-14" />
          </div>
        </div>
      </div>
      <Currencies />
    </section>
  );
}
