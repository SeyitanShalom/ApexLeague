import React, { useState } from "react";
import axios from "axios";

const initialMatch = {
  homeTeam: "",
  awayTeam: "",
  date: "",
  time: "",
  venue: "",
  status: "upcoming",
  score: "",
};

const MatchScheduleForm = ({ onMatchAdded, setShowModal }) => {
  const [match, setMatch] = useState(initialMatch);

  const handleChange = (e) => {
    setMatch({ ...match, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/addmatch", match);
      alert("Match scheduled!");
      setMatch(initialMatch);
      setShowModal(false);
      onMatchAdded(); // ✅ call here only if saving worked
    } catch (err) {
      alert("Error: " + err.message);
    }

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 text-sm">
      <div className="bg-white rounded-lg p-6 w-[350px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Schedule a new match</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Home Team</label>
            <input
              type="text"
              name="homeTeam"
              value={match.homeTeam}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Away Team</label>
            <input
              type="text"
              name="awayTeam"
              value={match.awayTeam}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={match.date}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={match.time}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Venue</label>
            <input
              type="text"
              name="venue"
              value={match.venue}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Status</label>
            <input
              type="text"
              name="status"
              id=""
              value={match.status}
              className="border px-2 py-1 rounded w-full"
            />
            {/* <select
              name="status"
              value={match.status}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            >
              <option value="live">Live</option>
              <option value="finished">Finished</option>
              <option value="upcoming">Upcoming</option>
            </select> */}
          </div>
          {/* <div>
            <label>Score</label>
            <input
              type="text"
              name="score"
              value={match.score}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
            />
          </div> */}
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
              Schedule Match
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MatchScheduleForm;
