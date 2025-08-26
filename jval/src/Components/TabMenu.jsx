'use client'
import React, { useState } from "react";

const TabMenu = ({page, setPage}) => {
  

  return (
    <div>
      <div className="flex items-center justify-between bg-white -mx-4 px-1 text-sm">
        <div
          onClick={() => setPage("teams")}
          className={`cursor-pointer py-4 px-2 ${
            page === "teams"
              ? "bg-green-50 border-b-2 border-green-500"
              : ""
          } `}
        >
          <p>Teams</p>
        </div>
        <div
          onClick={() => setPage("team lineups")}
          className={`cursor-pointer py-4 px-2 ${
            page === "team lineups"
              ? "bg-green-50 border-b-2 border-green-500"
              : ""
          } `}
        >
          <p>Team Lineups</p>
        </div>
        <div
          onClick={() => setPage("schedule")}
          className={`cursor-pointer py-4 px-2 ${
            page === "schedule" ? "bg-green-50 border-b-2 border-green-500" : ""
          } `}
        >
          <p>Schedules</p>
        </div>
        <div
          onClick={() => setPage("player stats")}
          className={`cursor-pointer py-4 px-2 ${
            page === "player stats"
              ? "bg-green-50 border-b-2 border-green-500"
              : ""
          } `}
        >
          <p>Player Stats</p>
        </div>
        <div
          onClick={() => setPage("match events")}
          className={`cursor-pointer py-4 px-2 ${
            page === "match events"
              ? "bg-green-50 border-b-2 border-green-500"
              : ""
          } `}
        >
          <p>Match Events</p>
        </div>
      </div>
    </div>
  );
};

export default TabMenu;
