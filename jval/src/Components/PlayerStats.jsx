import React from "react";
import { BiEditAlt } from "react-icons/bi";

const PlayerStats = () => {
  return (
    <div>
      <div className="bg-white rounded-lg my-5 p-5">
        <div className="flex justify-between items-center">
          <p className="font-bold">Player Statistics</p>
          <button className="bg-green-600 text-white px-3 py-1 font-bold text-xs cursor-pointer rounded-md">
            <span className="text-base mr-2">+</span>Add Player Stats
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 place-items-center text-sm">
        <div className="flex flex-col items-center justify-center bg-white w-28 text-center h-24 p-4  rounded-sm">
          <span className="text-2xl font-bold">3</span>
          <br />
          Players
        </div>
        <div className="flex flex-col items-center justify-center bg-white w-28 text-center h-24 p-4  rounded-sm">
          <span className="text-2xl font-bold text-green-500">46</span>
          <br />
          Total Goals
        </div>
        <div className="flex flex-col items-center justify-center bg-white w-28 text-center h-24 p-4  rounded-sm">
          <span className="text-2xl font-bold text-blue-600">40 </span>
          <br />
          Total Assists
        </div>
        <div className="flex flex-col items-center justify-center bg-white w-28 text-center h-24 p-4  rounded-sm">
          <span className="text-2xl font-bold text-cyan-400">25</span>
          <br />
          Total Cleansheets
        </div>
        <div className="flex flex-col items-center justify-center bg-white w-28 text-center h-24 p-4  rounded-sm">
          <span className="text-2xl font-bold text-yellow-500">30</span>
          <br />
          Total Yellow Cards
        </div>
        <div className="flex flex-col items-center justify-center bg-white w-28 text-center h-24 p-4  rounded-sm">
          <span className="text-2xl font-bold text-red-600">20</span>
          <br />
          Total Red Cards
        </div>
      </div>
      <div className="bg-white rounded-lg my-5 p-5 text-sm flex justify-between items-center gap-2">
        <div className="flex flex-col justify-between items-center border border-gray-200 rounded-md p-4 w-full gap-3">
          <div className="text-center">
            <h2 className="font-bold text-gray-700">Seyitan Shalom</h2>
            <p className="text-gray-500 text-xs">Team A</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-center justify-center text-xs text-center rounded-sm -space-y-1">
              <span className="font-bold text-base">3</span>
              <br />
              Matches
            </div>
            <div className="flex flex-col items-center justify-center text-xs text-center rounded-sm -space-y-1">
              <span className="font-bold text-base text-green-500">3</span>
              <br />
              Goals
            </div>
            <div className="flex flex-col items-center justify-center text-xs text-center rounded-sm -space-y-1">
              <span className="font-bold text-base text-blue-600">3</span>
              <br />
              Assists
            </div>
            <div className="flex flex-col items-center justify-center text-xs text-center rounded-sm -space-y-1">
              <span className="font-bold text-base text-cyan-400">3</span>
              <br />
              Cleansheets
            </div>
            <div className="flex flex-col items-center justify-center text-xs text-center rounded-sm -space-y-1">
              <span className="font-bold text-base text-yellow-500">3</span>
              <br />
              Yellows
            </div>
            <div className="flex flex-col items-center justify-center text-xs text-center rounded-sm -space-y-1">
              <span className="font-bold text-base text-red-600">3</span>
              <br />
              Reds
            </div>
          </div>
        </div>
        <div>
          <BiEditAlt className="text-green-500 text-lg" />
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
