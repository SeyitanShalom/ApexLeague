import React, { useState, useEffect } from "react";
import axios from "axios";

const initialStats = {
  playerId: "",
  matches: "",
  goals: "",
  assists: "",
  cleansheets: "",
  yellowCards: "",
  redCards: "",
};

const PlayerStatsForm = ({ setShowModal, players, editingStat, onUpdate }) => {
  const [stats, setStats] = useState(editingStat || initialStats);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (editingStat) setStats(editingStat);
  }, [editingStat]);

 

  const handleChange = (e) => {
    setStats({ ...stats, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStat) {
        await onUpdate(stats);
      } else {
        await axios.post("http://localhost:4000/addplayerstats", stats);
        alert("Player Stats Added!");
      }
      setStats(initialStats);
      setShowModal(false);
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
            <label>Player</label>
            <select
              name="playerId"
              value={stats.playerId}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            >
              <option value="">Select Player</option>
              {players
                .filter((p) => p.role === "player")
                .map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
            </select>
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
              name="yellowCards"
              value={stats.yellowCards}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Red Cards</label>
            <input
              type="number"
              name="redCards"
              value={stats.redCards}
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
