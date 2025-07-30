"use client";
import { useParams } from "next/navigation";
import { matches } from "@/data/matches";
import MatchEvents from "@/components/MatchEvents";
import Image from "next/image";
import { useState } from "react";
import LineUps from "@/components/LineUps";

const MatchDetailsPage = () => {
  const params = useParams();
  const slug = params?.slug; // string like "1"
  const matchId = parseInt(slug, 10);

  const match = matches.find((m) => m.id === matchId);

  if (!matchId || !match) {
    return <p>Match not found</p>;
  }

  const liveMatch = match.status === "live";
  const upcomingMatch = match.status === "not_started";
  const finishedMatch = match.status === "finished";
  const [page, setPage] = useState("events");

  // const handleChange = () => {
  //   console.log("clicked");
  // };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-10 -mx-4">
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex flex-col items-center flex-1 gap-2">
          <Image
            src={match.homeLogo}
            alt={match.homeTeam}
            width={45}
            height={45}
          />
          <p>{match.homeTeam}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">
            {new Date(match.startTime).toLocaleDateString()} |{" "}
            {new Date(match.startTime).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC",
            })}
          </p>
          <div className="text-xl font-semibold text-center">
            {" "}
            {liveMatch ? (
              <p>
                {match.homeScore} - {match.awayScore}
              </p>
            ) : upcomingMatch ? (
              <p>VS</p>
            ) : (
              <p>
                {match.homeScore} - {match.awayScore}
              </p>
            )}
          </div>

          <div className="flex justify-center w-full items-center text-sm">
            {liveMatch ? (
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 mr-1 bg-green-600 rounded-full"></div>
                <p className="translate-y-[1px]">live</p>
              </div>
            ) : finishedMatch ? (
              <div>
                <p>FT</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex flex-col items-center flex-1 gap-2">
          <Image
            src={match.awayLogo}
            alt={match.awayTeam}
            width={45}
            height={45}
          />
          <p>{match.awayTeam}</p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full border border-(--color-primary) mt-10 ">
        <div
          onClick={() => setPage("events")}
          className={`flex flex-1 justify-center items-center py-2 cursor-pointer text-sm ${
            page === "events" ? "bg-(--color-primary) text-white" : ""
          }`}
        >
          <p>Match Events</p>
        </div>
        <div
          onClick={() => setPage("lineups")}
          className={`flex flex-1 justify-center items-center py-2 cursor-pointer text-sm ${
            page === "lineups" ? "bg-(--color-primary) text-white" : ""
          }`}
        >
          <p>Line-Ups</p>
        </div>
      </div>

      {page === "events" ? <MatchEvents /> : <LineUps />}
    </div>
  );
};

export default MatchDetailsPage;
