"use client";
import MatchEvents from "@/Components/MatchEvents";
import Players from "@/Components/Players";
import PlayerStats from "@/Components/PlayerStats";
import Schedule from "@/Components/Schedule";
import TabMenu from "@/Components/TabMenu";
import TeamLineups from "@/Components/TeamLineups";
import Teams from "@/Components/Teams";
import React, { useState } from "react";

const AdminPage = () => {
  const [page, setPage] = useState("players");
  return (
    <div>
      <TabMenu page={page} setPage={setPage} />
      {page === "players" && <Players />}
      {page === "teams" && <Teams />}
      {page === "team lineups" && <TeamLineups />}
      {page === "schedule" && <Schedule />}
      {page === "player stats" && <PlayerStats />}
      {page === "match events" && <MatchEvents />}
    </div>
  );
};

export default AdminPage;
