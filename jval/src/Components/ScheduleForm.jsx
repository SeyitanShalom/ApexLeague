import React, { useEffect, useState } from "react";
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

function getDisplayTime(match) {
  let elapsed = match.elapsedTimeMs || 0;
  if (match.status === "live" && !match.paused && match.startTime) {
    elapsed += Date.now() - new Date(match.startTime).getTime();
  }
  // Convert ms to mm:ss
  const totalSeconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const ScheduleForm = ({ onMatchAdded, setShowModal }) => {
  const [match, setMatch] = useState(initialMatch);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/allteams").then((res) => {
      const sortedTeams = (res.data.teams || []).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setTeams(sortedTeams);
    });
  }, []);

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

  const handlePauseResume = async (pause) => {
    try {
      await axios.post("http://localhost:4000/updateMatch", {
        ...match,
        paused: pause,
      });
      setMatch({ ...match, paused: pause });
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
            <select
              name="homeTeam"
              value={match.homeTeam}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            >
              <option value="">Select Home Team</option>
              {teams.map((team) => (
                <option key={team._id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Away Team</label>
            <select
              name="awayTeam"
              value={match.awayTeam}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            >
              <option value="">Select Away Team</option>
              {teams.map((team) => (
                <option key={team._id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
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
              readOnly
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
        {match.status === "live" && !match.paused && (
          <button
            onClick={() => handlePauseResume(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Pause
          </button>
        )}
        {match.status === "live" && match.paused && (
          <button
            onClick={() => handlePauseResume(false)}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Resume
          </button>
        )}
      </div>
    </div>
  );
};

export default ScheduleForm;
