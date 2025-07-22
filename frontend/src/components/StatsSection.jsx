"use client";
import Image from "next/image";
import React, { useState } from "react";

// Utility to render stat rows
const StatSection = ({ title, data, statKey }) => {
  const [showAll, setShowAll] = useState(false);
  const displayData = showAll ? data : data.slice(0, 3);
  return (
    <div className="mb-10 -mx-4">
      <h2 className="font-semibold mb-2 mx-4 text-(--color-primary) border-b">
        {title}
      </h2>
      <div className="text-sm">
        {displayData.map((player, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-5 py-2 "
          >
            {/* Player info on the left */}
            <div className="flex items-center gap-3 flex-1">
              <Image
                src={player.image}
                alt={player.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{player.name}</p>
                <p className="text-xs text-gray-500">{player.team}</p>
              </div>
            </div>

            {/* Stat aligned to right & center */}
            <div className=" px-3 py-1 rounded text-center">
              <p className="font-bold">{player[statKey]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="overflow-x-auto">
        <table className="w-full text-sm sm:text-base">
          <thead className="bg-(--color-primary) text-white">
            <tr>
              <th className="px-3 py-2 text-left">Player</th>
              <th className="px-3 py-2">Team</th>
              <th className="px-3 py-2">
                {statKey.charAt(0).toUpperCase() + statKey.slice(1)}
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((player, index) => (
              <tr key={index} className=" hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2 ">
                  <Image
                    src={player.image}
                    alt={player.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  {player.name}
                </td>
                <td className="p-3 text-center ">{player.team}</td>
                <td className="p-3 text-center ">{player[statKey]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      {data.length > 3 && (
        <div className="mt-2 text-left px-5 font-semibold">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-(--color-primary) hover:underline text-sm cursor-pointer "
          >
            {showAll ? "Show Less" : "See All"}
          </button>
        </div>
      )}
    </div>
  );
};

export default StatSection;
