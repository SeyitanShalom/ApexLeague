"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {

  return (
    <div>
      <div className="flex justify-between items-center shadow-sm -mx-4 px-4 relative bg-white">
        <div className="flex items-center justify-between gap-1">
          <Image src="/Apex Logo.png" alt="Logo" width={70} height={50} />
          <p className="text-2xl -translate-y-0.5">|</p>
          <Image src="/JV Logo.webp" alt="Logo" width={50} height={50} />
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center justify-center bg-red-200 rounded-full w-8 h-8 text-xl text-gray-500">
            a
          </div>
          {/* <IoIosArrowDown /> */}
          <p>Admin</p>
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;
