import Link from "next/link";
import React from "react";
import { RiFootballLine } from "react-icons/ri";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-164">
      <div className="text-center flex flex-col items-center ">
        <div className="text-5xl bg-green-700 p-5 rounded-md text-white  ">
          <RiFootballLine />
        </div>
        <h2 className="text-2xl font-bold text-center leading-6 mt-4 ">
          Welcome To <br /> Johnvents Apex League Admin Portal
        </h2>
        <p className="text-center">
          Manage your league with ease and efficiency.
        </p>
        <Link href="/login">
          <button className="mt-6 bg-green-700 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-600 transition-all duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
