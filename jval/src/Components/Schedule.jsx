import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import ScheduleForm from "./ScheduleForm";
import axios from "axios";

const Schedule = () => {
  const [showModal, setShowModal] = useState(false);
  const [matches, setMatches] = useState([]);
  const [timers, setTimers] = useState({}); // store timers per match
  const [additionalTime, setAdditionalTime] = useState(0);

  const fetchMatches = async () => {
    try {
      const res = await axios.get("http://localhost:4000/allmatches");
      console.log(res.data);
      setMatches(res.data.matches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this match?")) return;
    try {
      await axios.delete(`http://localhost:4000/matches/${id}`);
      setMatches((prev) => prev.filter((match) => match._id !== id));
    } catch (error) {
      console.error("Error deleting match:", error);
    }
  };

  const startMatch = async (id) => {
    try {
      const res = await axios.put(`http://localhost:4000/matches/start/${id}`);
      setMatches((prev) =>
        prev.map((m) => (m._id === id ? res.data.match : m))
      );
    } catch (err) {
      console.error("Error starting match:", err);
    }
  };

  const finishMatch = async (id) => {
    try {
      const res = await axios.put(`http://localhost:4000/matches/finish/${id}`);
      setMatches((prev) =>
        prev.map((m) => (m._id === id ? res.data.match : m))
      );
    } catch (err) {
      console.error("Error finishing match:", err);
    }
  };

  const togglePause = async (id, paused) => {
    try {
      const res = await axios.put(`http://localhost:4000/matches/pause/${id}`, {
        paused,
      });
      setMatches((prev) =>
        prev.map((m) => (m._id === id ? res.data.match : m))
      );
    } catch (err) {
      console.error("Error pausing/resuming match:", err);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const updateScore = async (id, team, action) => {
    try {
      const res = await axios.put(`http://localhost:4000/updatescore/${id}`, {
        team,
        action,
      });
      setMatches((prev) =>
        prev.map((m) => (m._id === id ? res.data.match : m))
      );
    } catch (err) {
      console.error("Error updating score:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(`http://localhost:4000/updatestatus/${id}`, {
        status,
      });
      setMatches((prev) =>
        prev.map((m) => (m._id === id ? res.data.match : m))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleAdditionalTime = async (id) => {
    await axios.put(`http://localhost:4000/matches/additional-time/${id}`, {
      additionalTime,
    });
    // Optionally refetch matches or update state
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };
        matches.forEach((m) => {
          if (m.status === "live" && m.startTime) {
            let elapsedMs = m.elapsedTimeMs || 0;
            if (!m.paused) {
              elapsedMs += Date.now() - new Date(m.startTime).getTime();
            }
            const minutes = Math.floor(elapsedMs / 60000);
            const seconds = Math.floor((elapsedMs % 60000) / 1000);
            updated[m._id] = { minutes, seconds };
          }
        });
        return updated;
      });
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, [matches]);

  return (
    <div>
      <div className="bg-white rounded-lg my-5 p-5">
        <div className="flex justify-between items-center">
          <p className="font-bold">Match Schedule</p>
          <button
            className="bg-green-600 text-white px-3 py-1 font-bold text-xs cursor-pointer rounded-md"
            onClick={() => setShowModal(true)}
          >
            <span className="text-base mr-2">+</span>
            Add Match
          </button>
        </div>
      </div>

      {matches.length === 0 ? (
        <p className="text-gray-500 text-sm">No matches scheduled</p>
      ) : (
        matches.map((match) => (
          <div key={match._id} className="bg-white rounded-lg my-5 p-5 text-sm">
            <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center">
              <div className="flex justify-between items-center w-full ">
                <div>
                  <h2 className="font-bold text-gray-700">
                    {match.homeTeam} VS {match.awayTeam}
                  </h2>
                  <p className="text-gray-500 text-xs">
                    {match.date} at {match.time}
                  </p>
                  <p className="text-gray-500 text-xs">{match.venue}</p>
                  <p className="text-gray-500 text-xs">
                    Score: {match.homeScore} - {match.awayScore}
                  </p>
                </div>
                <div>
                  <RiDeleteBin6Line
                    className="text-red-500 text-lg cursor-pointer"
                    onClick={() => handleDelete(match._id)}
                  />
                </div>
              </div>
              <div className="flex justify-evenly mt-2 gap-x-5">
                {/* Home team score controls */}
                <div className="flex flex-col items-center gap-3">
                  <button
                    className="bg-blue-500 w-40 text-white px-2 py-1 rounded"
                    onClick={() => updateScore(match._id, "home", "increment")}
                  >
                    + Goal {match.homeTeam}
                  </button>
                  <button
                    className="bg-gray-500 w-40 text-white px-2 py-1 rounded "
                    onClick={() => updateScore(match._id, "home", "decrement")}
                  >
                    - Goal {match.homeTeam}
                  </button>
                </div>

                {/* Away team score controls */}
                <div className="flex flex-col items-center gap-3">
                  <button
                    className="bg-red-500 w-40 text-white px-2 py-1 rounded ml-2"
                    onClick={() => updateScore(match._id, "away", "increment")}
                  >
                    + Goal {match.awayTeam}
                  </button>
                  <button
                    className="bg-gray-500 w-40 text-white px-2 py-1 rounded ml-2"
                    onClick={() => updateScore(match._id, "away", "decrement")}
                  >
                    - Goal {match.awayTeam}
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <div className="mt-3">
                  <p className="text-gray-500 text-xs">
                    {match.status === "live"
                      ? `Time: ${timers[match._id]?.minutes || 0}' ${
                          timers[match._id]?.seconds || 0
                        }"${match.additionalTime > 0 && `+${match.additionalTime}'`}`
                      : match.status === "finished"
                      ? `FT ${match.elapsedTime || 0}'`
                      : "Not Started"}
                  </p>

                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => updateStatus(match._id, "live")}
                  >
                    Start Match
                  </button>
                  <button
                    className={`bg-purple-500 text-white px-2 py-1 rounded mr-2`}
                    onClick={() => togglePause(match._id, !match.paused)}
                  >
                    {match.paused ? "Resume" : "Pause"}
                  </button>
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => updateStatus(match._id, "finished")}
                  >
                    Finish Match
                  </button>
                </div>
                <div className="mt-2">
                  <input
                    type="number"
                    min={0}
                    value={additionalTime}
                    onChange={(e) => setAdditionalTime(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                    placeholder="Additional Time (mins)"
                  />
                  <button
                    onClick={() => handleAdditionalTime(match._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded ml-2 text-sm"
                  >
                    Set Additional Time
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Modal */}
      {showModal && (
        <ScheduleForm setShowModal={setShowModal} onMatchAdded={fetchMatches} />
      )}
    </div>
  );
};

export default Schedule;
