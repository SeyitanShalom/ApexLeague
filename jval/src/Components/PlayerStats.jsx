import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

import PlayerStatsForm from "./PlayerStatsForm";

const PlayerStats = () => {
  const [showModal, setShowModal] = useState(false);
  const [playerStats, setPlayerStats] = useState([]);
  const [people, setPeople] = useState([]);
  const [editingStat, setEditingStat] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/people").then((res) => {
      setPeople(res.data.people);
    });
  }, []);

  const fetchPlayerStats = async () => {
    try {
      const res = await axios.get("http://localhost:4000/allplayerstats");
      setPlayerStats(res.data.allStats);
    } catch (error) {
      console.error("Error fetching player stats:", error);
    }
  };

  const handleUpdateStat = async (updatedStat) => {
    try {
      await axios.put(
        `http://localhost:4000/updatestats/${updatedStat._id}`,
        updatedStat
      );
      fetchPlayerStats();
      setEditingStat(null);
    } catch (error) {
      console.error("Error updating player stats:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this player stat?"))
      return;

    try {
      await axios.delete(`http://localhost:4000/deletestats/${id}`);
      setPlayerStats((prev) => prev.filter((stat) => stat._id !== id));
    } catch (error) {
      console.error("Error deleting player stat:", error.message);
    }
  };

  useEffect(() => {
    fetchPlayerStats();
  }, []);

  // Calculate totals
  const totalPlayers = playerStats.length;
  const totalGoals = playerStats.reduce(
    (sum, stat) => sum + (stat.goals || 0),
    0
  );
  const totalAssists = playerStats.reduce(
    (sum, stat) => sum + (stat.assists || 0),
    0
  );
  const totalCleansheets = playerStats.reduce(
    (sum, stat) => sum + (stat.cleansheets || 0),
    0
  );
  const totalYellowCards = playerStats.reduce(
    (sum, stat) => sum + (stat.yellowCards || 0),
    0
  );
  const totalRedCards = playerStats.reduce(
    (sum, stat) => sum + (stat.redCards || 0),
    0
  );

  return (
    <div>
      <div className="bg-white rounded-lg my-5 p-5">
        <div className="flex justify-between items-center">
          <p className="font-bold">Player Statistics</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-3 py-1 font-bold text-xs cursor-pointer rounded-md"
          >
            <span className="text-base mr-2">+</span>Add Player Stats
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 place-items-center text-sm">
        <div className=" bg-white w-28 text-center h-24 p-4  rounded-sm">
          <span className="text-2xl font-bold">{totalPlayers}</span>
          <br />
          Players
        </div>
        <div className=" bg-white w-28 text-center h-24 p-4  rounded-sm">
          <span className="text-2xl font-bold text-green-500">
            {totalGoals}
          </span>
          <br />
          Total Goals
        </div>
        <div className=" bg-white w-28 text-center h-24 p-4  rounded-sm">
          <span className="text-2xl font-bold text-blue-600">
            {totalAssists}{" "}
          </span>
          <br />
          Total Assists
        </div>
        <div className=" bg-white w-28 text-center h-24 p-4  rounded-sm">
          <span className="text-2xl font-bold text-cyan-400">
            {totalCleansheets}
          </span>
          <br />
          Total Cleansheets
        </div>
        <div className=" bg-white w-28 text-center h-24 p-4  rounded-sm">
          <span className="text-2xl font-bold text-yellow-400">
            {totalYellowCards}
          </span>
          <br />
          Total Yellow Cards
        </div>
        <div className=" bg-white w-28 text-center h-24 p-4  rounded-sm">
          <span className="text-2xl font-bold text-red-500">
            {totalRedCards}
          </span>
          <br />
          Total Red Cards
        </div>
      </div>
      <div className="bg-white rounded-lg my-5 p-5 text-sm w-full">
        {Array.isArray(playerStats) && playerStats.length === 0 && (
          <p className="text-gray-500 text-sm">No player stats available</p>
        )}
        {Array.isArray(playerStats) &&
          playerStats.map((stat) => (
            <div
              key={stat._id}
              className="flex justify-between items-center space-x-4 mb-5"
            >
              <div className="flex flex-col justify-between items-center border border-gray-200 rounded-md p-4 w-full gap-3">
                <div className="text-center">
                  <h2 className="font-bold text-gray-700">{stat.playerName}</h2>
                  <p className="text-gray-500 text-xs">{stat.team}</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className=" text-xs text-center rounded-sm -space-y-1">
                    <span className="font-bold text-base">{stat.matches}</span>
                    <br />
                    Matches
                  </div>
                  <div className=" text-xs text-center rounded-sm -space-y-1">
                    <span className="font-bold text-base text-green-500">
                      {stat.goals}
                    </span>
                    <br />
                    Goals
                  </div>
                  <div className=" text-xs text-center rounded-sm -space-y-1">
                    <span className="font-bold text-base text-blue-600">
                      {stat.assists}
                    </span>
                    <br />
                    Assists
                  </div>
                  <div className=" text-xs text-center rounded-sm -space-y-1">
                    <span className="font-bold text-base text-cyan-400">
                      {stat.cleansheets}
                    </span>
                    <br />
                    Cleansheets
                  </div>
                  <div className=" text-xs text-center rounded-sm -space-y-1">
                    <span className="font-bold text-base text-yellow-400">
                      {stat.yellowCards}
                    </span>
                    <br />
                    Yellows
                  </div>
                  <div className=" text-xs text-center rounded-sm -space-y-1">
                    <span className="font-bold text-base text-red-500">
                      {stat.redCards}
                    </span>
                    <br />
                    Reds
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-10">
                <div>
                  <BiEditAlt
                    className="text-green-500 text-lg"
                    onClick={() => {
                      setEditingStat(stat);
                      setShowModal(true);
                    }}
                  />
                </div>
                <div>
                  <RiDeleteBin6Line
                    className="text-red-500 text-lg cursor-pointer"
                    onClick={() => handleDelete(stat._id)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      {showModal && (
        <PlayerStatsForm
          setShowModal={setShowModal}
          players={people}
          editingStat={editingStat}
          onUpdate={handleUpdateStat}
          onSubmit={fetchPlayerStats}
        />
      )}
    </div>
  );
};

export default PlayerStats;
