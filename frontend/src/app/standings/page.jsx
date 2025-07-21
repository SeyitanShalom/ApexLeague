"use client";
import React from "react";
import { standings } from "@/data/standings";
import Image from "next/image";
import Stats from "@/components/Stats";

const StandingsPage = () => {
  return (
    <div className="max-w-2xl mx-auto ">
      <h1 className="text-xl font-bold text-center text-(--color-primary)">
        Group Standings
      </h1>

      {standings.map((group, index) => (
        <div key={index} className="mb-10 text-sm -mx-4">
          <h2 className="mb-1 text-lg font-semibold mx-4">{group.group}</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto ">
              <thead className="bg-(--color-primary) text-white -mb-4">
                <tr>
                  <th className="px-3 py-2 "></th>
                  <th className="px-3 py-2 text-left ">Team</th>
                  <th className="px-3 py-2 ">P</th>
                  <th className="px-3 py-2 ">W</th>
                  <th className="px-3 py-2 ">D</th>
                  <th className="px-3 py-2 ">L</th>
                  <th className="px-3 py-2 ">F/A</th>
                  {/* <th className="px-3 py-2 ">GA</th> */}
                  {/* <th className="px-3 py-2 ">GD</th> */}
                  <th className="px-3 py-2 ">Pts</th>
                </tr>
              </thead>
              <tbody>
                {group.teams.map((team, i) => (
                  <tr key={i} className=" hover:bg-gray-50 text-center">
                    <td className="px-3 py-3 ">{team.position}</td>
                    <td className="px-3 py-3 text-left font-medium flex items-center gap-2">
                      <Image
                        src={team.logo}
                        alt={team.teamName}
                        width={17}
                        height={17}
                      />
                      {team.teamName}
                    </td>
                    <td className="px-3 py-3 ">{team.played}</td>
                    <td className="px-3 py-3 ">{team.won}</td>
                    <td className="px-3 py-3 ">{team.draw}</td>
                    <td className="px-3 py-3 ">{team.lost}</td>
                    <td className="px-3 py-3 ">
                      {team.goalsFor}/{team.goalsAgainst}
                    </td>
                    {/* <td className="px-3 py-3 ">{team.goalsAgainst}</td> */}
                    {/* <td className="px-3 py-3 ">{team.goalDifference}</td> */}
                    <td className="px-3 py-3  font-bold">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <Stats />
    </div>
  );
};

export default StandingsPage;
