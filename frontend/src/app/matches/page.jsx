"use client";
import React from "react";
import MatchCard from "@/components/MatchCard";
import dayjs from "dayjs";
import { matches } from "@/data/matches";
import Link from "next/link";

// const matches = [
//   // 🟢 UPCOMING
//   {
//     _id: "1",
//     homeTeam: "Chelsea",
//     awayTeam: "Juventus",
//     homeScore: 0,
//     awayScore: 0,
//     status: "not_started",
//     time: "Starts at 19:30",
//     events: [],
//     startTime: new Date("2025-07-22T19:30:00Z"),
//   },
//   {
//     _id: "2",
//     homeTeam: "Atletico Madrid",
//     awayTeam: "AC Milan",
//     homeScore: 0,
//     awayScore: 0,
//     status: "not_started",
//     time: "Starts at 21:00",
//     events: [],
//     startTime: new Date("2025-07-22T21:00:00Z"),
//   },

//   // 🔴 LIVE
//   {
//     _id: "3",
//     homeTeam: "Liverpool",
//     awayTeam: "Napoli",
//     homeScore: 2,
//     awayScore: 2,
//     status: "live",
//     time: "58'",
//     events: [],
//     startTime: new Date("2025-07-20T18:00:00Z"),
//   },
//   {
//     _id: "4",
//     homeTeam: "Ajax",
//     awayTeam: "Lyon",
//     homeScore: 1,
//     awayScore: 0,
//     status: "live",
//     time: "39'",
//     events: [],
//     startTime: new Date("2025-07-20T19:00:00Z"),
//   },

//   // ⚫ FINISHED
//   {
//     _id: "5",
//     homeTeam: "Tottenham",
//     awayTeam: "RB Leipzig",
//     homeScore: 1,
//     awayScore: 3,
//     status: "finished",
//     time: "FT",
//     events: [],
//     startTime: new Date("2025-07-19T17:00:00Z"),
//   },
//   {
//     _id: "6",
//     homeTeam: "Roma",
//     awayTeam: "Sevilla",
//     homeScore: 0,
//     awayScore: 0,
//     status: "finished",
//     time: "FT",
//     events: [],
//     startTime: new Date("2025-07-19T20:00:00Z"),
//   },
// ];

const groupMatchesByDateAndStatus = (matches) => {
  const grouped = {};

  matches.forEach((match) => {
    const dateKey = new Date(match.startTime).toISOString().split("T")[0];

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        live: [],
        not_started: [],
        finished: [],
      };
    }

    grouped[dateKey][match.status]?.push(match);
  });

  return grouped;
};

const MatchPage = () => {
  const groupedMatches = groupMatchesByDateAndStatus(matches);
  const dateKeys = Object.keys(groupedMatches).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* <h1 className="text-2xl font-bold mb-6 text-center">Match Schedule</h1> */}
      <h1 className="text-(--color-primary) font-bold text-xl mb-5 py-1 -mx-4 text-center">
        Match Schedule
      </h1>

      {dateKeys.map((date, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-sm text-center font-semibold bg-(--color-primary) text-white mb-2 -mx-4 py-1">
            📅 {dayjs(date).format("MMMM D, YYYY")}
          </h2>

          {["live", "not_started", "finished"].map(
            (status) =>
              groupedMatches[date][status].length > 0 && (
                <div key={status} className="mb-5">
                  <h3 className="text-sm font-medium text-gray-700 mb-2 uppercase">
                    {status.replace("_", " ")}
                  </h3>
                  {groupedMatches[date][status].map((match, index) => (
                    <Link key={index} href={`/matches/${match.id}`}>
                      <MatchCard match={match} />
                    </Link>
                  ))}
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
};

export default MatchPage;
