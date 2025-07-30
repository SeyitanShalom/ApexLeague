import { matches } from "@/data/matches";
import React from "react";
import MatchCard from "./MatchCard";
import Link from "next/link";

const UpcomingMatches = () => {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-(--color-primary) font-bold text-lg">Fixtures</h1>
      {matches
        .filter((m) => m.status === "not_started")
        .slice(0, 2)
        .map((match, index) => (
          <Link key={index} href={`/matches/${match.id}`}>
            <MatchCard match={match} />
          </Link>
        ))}
    </div>
  );
};

export default UpcomingMatches;
