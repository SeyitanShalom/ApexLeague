"use client";
import React from "react";
import { matches } from "@/data/matches";
import { lineups } from "@/data/lineups";
import { useParams } from "next/navigation";

const getBgColor = (position) => {
  switch (position) {
    case "Goalkeeper":
      return "bg-green-300";
    case "Defender":
      return "bg-blue-300";
    case "Midfielder":
      return "bg-yellow-300";
    case "Forward":
      return "bg-red-300";
    default:
      return "bg-gray-400";
  }
};

const LineUps = () => {
  const params = useParams();
  const matchId = parseInt(params.slug);
  const match = matches.find((m) => m.id === matchId);
  const lineup = lineups.filter((l) => l.matchId === matchId);

  const homeLineup = lineup.find((l) => l.team === match?.homeTeam);
  const awayLineup = lineup.find((l) => l.team === match?.awayTeam);

  console.log("Match:", match);
  console.log(
    "Lineup teams:",
    lineups.map((l) => l.team)
  );

  if (!homeLineup || !awayLineup) {
    return (
      <p className="text-sm text-gray-500">
        Lineups will be available shortly before kickoff.
      </p>
    );
  }

  //   console.log(awayLineup);

  return (
    <div className="flex flex-col justify-between w-full px-5 text-sm">
      <div className="shadow-md pt-3 rounded-lg mb-10">
        <p className="text-center text-gray-500 font-semibold mb-2">
          Formation
        </p>
        <div className="flex gap-2 items-center justify-between mb-4 px-7 ">
          <p className="">{homeLineup.formation}</p>
          <p className="">{awayLineup.formation}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center mb-7">
        <p className="text-center text-gray-500 font-semibold mb-2">
          Starting XI
        </p>
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-start gap-y-2">
            {homeLineup?.players.slice(0, 11).map((player) => (
              <div key={player.number} className="flex items-center gap-2">
                <p
                  className={`${getBgColor(
                    player.position
                  )} flex items-center justify-center text-xs w-5 h-5  rounded-full`}
                >
                  {player.number}
                </p>
                <p>{player.name}</p>
              </div>
            ))}
          </div>
          <div>
            <div className="flex flex-col items-end gap-y-2">
              {awayLineup?.players.slice(0, 11).map((player) => (
                <div key={player.number} className="flex items-center gap-2">
                  <p>{player.name}</p>
                  <p
                    className={`${getBgColor(
                      player.position
                    )} flex items-center justify-center text-xs w-5 h-5  rounded-full`}
                  >
                    {player.number}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center mb-4">
        <p className="text-center text-gray-500 font-semibold mb-2">
          Substitutes
        </p>
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-start gap-y-2">
            {homeLineup?.players.slice(11, 17).map((player) => (
              <div key={player.number} className="flex items-center gap-2">
                <p
                  className={`${getBgColor(
                    player.position
                  )} flex items-center justify-center text-xs w-5 h-5  rounded-full`}
                >
                  {player.number}
                </p>
                <p>{player.name}</p>
              </div>
            ))}
            <div className="-space-y-1 mt-5">
              <p className="text-gray-400 font-semibold">Coach</p>
              <p>{homeLineup.coach}</p>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-end gap-y-2">
              {awayLineup?.players.slice(11, 17).map((player) => (
                <div key={player.number} className="flex items-center gap-2">
                  <p>{player.name}</p>
                  <p
                    className={`${getBgColor(
                      player.position
                    )} flex items-center justify-center text-xs w-5 h-5  rounded-full`}
                  >
                    {player.number}
                  </p>
                </div>
              ))}
              <div className="-space-y-1 mt-5 text-right">
                <p className="text-gray-400 font-semibold">Coach</p>
                <p>{awayLineup.coach}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineUps;
