"use client";
import React from "react";

const tabOptions = [
  { value: "players", label: "Players" },
  { value: "teams", label: "Teams" },
  { value: "team lineups", label: "Team Lineups" },
  { value: "schedule", label: "Schedules" },
  { value: "player stats", label: "Player Stats" },
  { value: "match events", label: "Match Events" },
];

const TabMenu = ({ page, setPage }) => {
  return (
    <div className="bg-white px-4 -mx-4 py-2 flex justify-center ">
      <select
        value={page}
        onChange={(e) => setPage(e.target.value)}
        className="border border-1 border-gray-500 rounded px-3 py-2 text-sm w-md outline-none"
      >
        {tabOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TabMenu;

