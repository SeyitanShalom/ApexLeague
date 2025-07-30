import React from "react";
import { matches } from "@/data/matches";
import MatchCard from "./MatchCard";
import Link from "next/link";

const LiveMatch = () => {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-(--color-primary) font-bold text-lg">Live</h1>
      {matches
        .filter((m) => m.status === "live")
        .map((match, index) => (
          <Link key={index} href={`/matches/${match.id}`}>
            <MatchCard match={match} />
          </Link>
        ))}
    </div>
  );
};

export default LiveMatch;
