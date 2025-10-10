// Schedule.jsx
import React, { useEffect, useState, useRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import ScheduleForm from "./ScheduleForm";
import axios from "axios";
import { io as ioClient } from "socket.io-client";

const SOCKET_URL = "http://localhost:4000"; // change if needed

const Schedule = () => {
  const [showModal, setShowModal] = useState(false);
  const [matches, setMatches] = useState([]);
  const [timers, setTimers] = useState({});
  const [additionalTimeInput, setAdditionalTimeInput] = useState({});

  const socketRef = useRef(null);

  const fetchMatches = async () => {
    try {
      const res = await axios.get("http://localhost:4000/allmatches");
      setMatches(res.data.matches || []);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    fetchMatches();

    // connect socket
    socketRef.current = ioClient(SOCKET_URL);
    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    // When a match is updated/added/deleted on the server, update list
    socket.on("matchUpdated", (updatedMatch) => {
      setMatches((prev) =>
        prev.map((m) => (m._id === updatedMatch._id ? updatedMatch : m))
      );
    });

    socket.on("matchAdded", (newMatch) => {
      setMatches((prev) => [newMatch, ...prev]);
    });

    socket.on("matchDeleted", (deletedId) => {
      setMatches((prev) => prev.filter((m) => m._id !== deletedId));
    });

    socket.on("scoreUpdated", (updatedMatch) => {
      setMatches((prev) =>
        prev.map((m) => (m._id === updatedMatch._id ? updatedMatch : m))
      );
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, []);

  // CRUD & actions
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this match?")) return;
    try {
      await axios.delete(`http://localhost:4000/matches/${id}`);
      setMatches((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      console.error("Error deleting match:", error);
    }
  };

  const updateScore = async (id, team, action) => {
    try {
      const res = await axios.put(`http://localhost:4000/updatescore/${id}`, {
        team,
        action,
      });
      // server emits; but update local immediately too
      setMatches((prev) =>
        prev.map((m) => (m._id === id ? res.data.match : m))
      );
    } catch (err) {
      console.error("Error updating score:", err);
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

  const togglePause = async (id, paused) => {
    try {
      const res = await axios.put(`http://localhost:4000/matches/pause/${id}`, {
        paused,
      });
      setMatches((prev) =>
        prev.map((m) => (m._id === id ? res.data.match : m))
      );
    } catch (err) {
      console.error("Error toggling pause:", err);
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

  const handleAdditionalTime = async (id) => {
    try {
      await axios.put(`http://localhost:4000/matches/additional-time/${id}`, {
        additionalTime: additionalTimeInput[id] || 0,
      });
      fetchMatches();
    } catch (err) {
      console.error("Error setting additional time:", err);
    }
  };

  // Timer updater: runs every second, computes elapsed for each match
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};
      matches.forEach((m) => {
        // ensure fields exist
        const baseMs = m.elapsedTimeMs || 0;
        let elapsedMs = baseMs;

        if (m.status === "live" && m.startTime) {
          const delta = Date.now() - new Date(m.startTime).getTime();
          elapsedMs = baseMs + delta;
        }
        // paused or finished uses baseMs only (frozen)
        const minutes = Math.floor(elapsedMs / 60000);
        const seconds = Math.floor((elapsedMs % 60000) / 1000);
        updated[m._id] = { minutes, seconds, totalMs: elapsedMs };
      });
      setTimers(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [matches]);

  // format helpers
  const formatClock = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const displayElapsedPlusAdd = (match) => {
    const timer = timers[match._id];
    const minutes = timer
      ? timer.minutes
      : Math.floor((match.elapsedTimeMs || 0) / 60000);
    const add = match.additionalTime || 0;
    if (add > 0) return `${minutes}+'${add} mins'`.replace("+'", "+");
    return `${minutes}'`;
  };

  return (
    <div>
      <div className="bg-white rounded-lg my-5 p-5">
        <div className="flex justify-between items-center">
          <p className="font-bold">Match Schedule</p>
          <button
            className="bg-green-600 text-white px-3 py-1 font-bold text-xs rounded-md"
            onClick={() => setShowModal(true)}
          >
            + Add Match
          </button>
        </div>
      </div>

      {matches.length === 0 ? (
        <p className="text-gray-500 text-sm">No matches scheduled</p>
      ) : (
        matches.map((match) => {
          const t = timers[match._id];
          const elapsedMs = t ? t.totalMs : match.elapsedTimeMs || 0;
          const isPaused = match.status === "paused";
          const isLive = match.status === "live";

          return (
            <div
              key={match._id}
              className={`bg-white rounded-lg my-5 p-5 text-sm relative ${
                isPaused ? "opacity-80" : ""
              }`}
            >
              {/* paused overlay */}
              {isPaused && (
                <div className="absolute inset-0 bg-yellow-50/60 flex items-center justify-center z-10 pointer-events-none">
                  <div className="p-2 rounded bg-yellow-200 border border-yellow-300 text-yellow-800 font-semibold">
                    PAUSED
                  </div>
                </div>
              )}

              <div className="border border-gray-200 rounded-md p-4 relative z-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-gray-700">
                      {match.homeTeam} vs {match.awayTeam}
                    </h2>
                    <p className="text-gray-500 text-xs">
                      {match.date} at {match.time} | {match.venue}
                    </p>
                    <p className="text-gray-600 text-xs">
                      Score: {match.homeScore} - {match.awayScore}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {match.half === 1 ? (
                        <>
                          1st Half:{" "}
                          {timers[match._id]?.minutes >= 45 ? (
                            <>
                              45+{timers[match._id]?.minutes - 45}:
                              {String(timers[match._id]?.seconds).padStart(
                                2,
                                "0"
                              )}{" "}
                              mins
                            </>
                          ) : (
                            <>
                              {timers[match._id]?.minutes}:
                              {String(timers[match._id]?.seconds).padStart(
                                2,
                                "0"
                              )}{" "}
                              mins
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          2nd Half:{" "}
                          {timers[match._id]?.minutes >= 90 ? (
                            <>
                              90+{timers[match._id]?.minutes - 90}:
                              {String(timers[match._id]?.seconds).padStart(
                                2,
                                "0"
                              )}{" "}
                              mins
                            </>
                          ) : (
                            <>
                              {timers[match._id]?.minutes}:
                              {String(timers[match._id]?.seconds).padStart(
                                2,
                                "0"
                              )}{" "}
                              mins
                            </>
                          )}
                        </>
                      )}
                    </p>

                    <p className="text-gray-500 text-xs">
                      Status:{" "}
                      <span
                        className={
                          match.status === "live"
                            ? "text-green-600"
                            : match.status === "paused"
                            ? "text-yellow-600"
                            : "text-gray-500"
                        }
                      >
                        {match.status}
                      </span>
                    </p>
                  </div>

                  <RiDeleteBin6Line
                    className="text-red-500 text-lg cursor-pointer"
                    onClick={() => handleDelete(match._id)}
                  />
                </div>

                {/* Score Controls */}
                <div className="flex flex-wrap gap-2 justify-between mt-4">
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        updateScore(match._id, "home", "increment")
                      }
                    >
                      + Goal {match.homeTeam}
                    </button>
                    <button
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        updateScore(match._id, "home", "decrement")
                      }
                    >
                      - Goal {match.homeTeam}
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        updateScore(match._id, "away", "increment")
                      }
                    >
                      + Goal {match.awayTeam}
                    </button>
                    <button
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        updateScore(match._id, "away", "decrement")
                      }
                    >
                      - Goal {match.awayTeam}
                    </button>
                  </div>
                </div>

                {/* Match Controls */}
                <div className="mt-3 flex gap-2 items-center">
                  {match.status === "upcoming" && (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                      onClick={() => startMatch(match._id)}
                    >
                      Start Match
                    </button>
                  )}
                  {isLive && (
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => togglePause(match._id, true)}
                    >
                      Pause Match
                    </button>
                  )}
                  {isPaused && (
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                      onClick={() => togglePause(match._id, false)}
                    >
                      Resume Match
                    </button>
                  )}
                  {match.status !== "finished" && (
                    <button
                      className="bg-gray-700 text-white px-3 py-1 rounded"
                      onClick={() => finishMatch(match._id)}
                    >
                      Finish Match
                    </button>
                  )}
                </div>

                {/* Additional Time */}
                <div className="mt-3 flex items-center gap-2">
                  {/* <input
                    type="number"
                    min={0}
                    value={additionalTimeInput[match._id] ?? ""}
                    onChange={(e) =>
                      setAdditionalTimeInput((prev) => ({
                        ...prev,
                        [match._id]:
                          e.target.value === "" ? "" : Number(e.target.value),
                      }))
                    }
                    className="border border-gray-300 rounded px-2 py-1 text-sm w-32"
                    placeholder="Additional Time (mins)"
                  />
                  <button
                    onClick={() => handleAdditionalTime(match._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Set
                  </button> */}
                  <div className="text-xs text-gray-500 ml-2">
                    Display: {displayElapsedPlusAdd(match)}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      {showModal && (
        <ScheduleForm setShowModal={setShowModal} onMatchAdded={fetchMatches} />
      )}
    </div>
  );
};

export default Schedule;
