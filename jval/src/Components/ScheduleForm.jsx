import React, { useState } from "react";
import axios from "axios";

const initialMatch = {
  home: "",
  away: "",
  date: "",
  time: "",
  venue: "",
  status: "upcoming",
  score: "",
};

const MatchScheduleForm = ({ onSuccess }) => {
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
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Home Team</label>
        <input
          type="text"
          name="home"
          value={match.home}
          onChange={handleChange}
          required
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <div>
        <label>Away Team</label>
        <input
          type="text"
          name="away"
          value={match.away}
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
        <select
          name="status"
          value={match.status}
          onChange={handleChange}
          required
          className="border px-2 py-1 rounded w-full"
        >
          <option value="live">Live</option>
          <option value="finished">Finished</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>
      <div>
        <label>Score</label>
        <input
          type="text"
          name="score"
          value={match.score}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Schedule Match
      </button>
    </form>
  );
};

export default MatchScheduleForm;
