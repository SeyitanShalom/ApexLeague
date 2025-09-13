import React, { useState } from "react";
import axios from "axios";

const initialStats = {
  playerName: "",
  team: "",
  matches: "",
  goals: "",
  assists: "",
  cleansheets: "",
  yellows: "",
  reds: "",
};

const PlayerStatsForm = ({ onSubmit, setShowModal }) => {
  const [stats, setStats] = useState(initialStats);

  const handleChange = (e) => {
    setStats({ ...stats, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/addplayerstats", stats);
      alert("Player Stats Added!");
      onSubmit(stats);
      setStats(initialStats);
      if (setShowModal) setShowModal(false);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 text-sm">
      <div className="bg-white rounded-lg p-6 w-[350px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Schedule a new match</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-5 rounded-lg"
        >
          <div>
            <label>Player Name</label>
            <input
              type="text"
              name="playerName"
              value={stats.playerName}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Team</label>
            <input
              type="text"
              name="team"
              value={stats.team}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Matches</label>
            <input
              type="number"
              name="matches"
              value={stats.matches}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Goals</label>
            <input
              type="number"
              name="goals"
              value={stats.goals}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Assists</label>
            <input
              type="number"
              name="assists"
              value={stats.assists}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Cleansheets</label>
            <input
              type="number"
              name="cleansheets"
              value={stats.cleansheets}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Yellow Cards</label>
            <input
              type="number"
              name="yellows"
              value={stats.yellows}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Red Cards</label>
            <input
              type="number"
              name="reds"
              value={stats.reds}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div className="flex justify-evenly gap-2 mt-7">
            <button
              type="button"
              className="bg-gray-300 w-32 py-2 rounded cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white w-32 py-2 rounded cursor-pointer"
            >
              Add Stats
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerStatsForm;
