import React, { useState, useEffect } from "react";
import axios from "axios";

const initialEvent = {
  team: "",
  player: "",
  description: "goal",
  minute: "",
  assist: "",
  subIn: "",
  subOut: "",
};

const EventForm = ({ matchId, selectedMatch, setShowModal }) => {
  const [event, setEvent] = useState(initialEvent);
  const [players, setPlayers] = useState([]);

  // Fetch all players on mount
  useEffect(() => {
    axios.get("http://localhost:4000/people").then((res) => {
      setPlayers((res.data.people || []).filter((p) => p.role === "player"));
    });
  }, []);

  // Get teams from selectedMatch
  const teams = selectedMatch
    ? [selectedMatch.homeTeam, selectedMatch.awayTeam]
    : [];

  // Filter players by selected team
  const filteredPlayers = players.filter((p) => p.team === event.team);

  const handleChange = (e) => {
    setEvent((prev) => {
      const updated = { ...prev, [e.target.name]: e.target.value };
      // For substitutions, set player to subIn or subOut (choose one)
      // if (updated.description === "substitution") {
      //   updated.player = updated.subIn || updated.subOut || "";
      // }
      // Reset player if team changes
      if (e.target.name === "team") {
        updated.player = "";
        updated.subIn = "";
        updated.subOut = "";
        updated.assist = "";
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // For substitution, set player to subIn or subOut
    let eventToSend = { ...event };
    if (eventToSend.description === "substitution") {
      eventToSend.player = eventToSend.subIn || eventToSend.subOut || "";
    }
    try {
      let events = [];
      try {
        const res = await axios.get(
          `http://localhost:4000/matchevents/${matchId}`
        );
        if (res.data && res.data.events) {
          events = [...res.data.events, eventToSend];
        } else {
          events = [eventToSend];
        }
      } catch (err) {
        // If 404, treat as no events yet
        if (err.response && err.response.status === 404) {
          events = [eventToSend];
        } else {
          throw err;
        }
      }
      // Save (create or update) events for this match
      await axios.post("http://localhost:4000/creatematchevent", {
        matchId,
        events,
      });
      setShowModal(false);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 text-sm">
      <div className="bg-white rounded-lg p-6 w-[350px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Team</label>
            <select
              name="team"
              value={event.team}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            >
              <option value="">Select Team</option>
              {teams.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Event Type</label>
            <select
              name="description"
              value={event.description}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            >
              <option value="goal">Goal</option>
              <option value="yellow_card">Yellow Card</option>
              <option value="red_card">Red Card</option>
              <option value="substitution">Substitution</option>
              <option value="penalty">Penalty</option>
              <option value="own_goal">Own Goal</option>
            </select>
          </div>
          {/* Optional fields */}
          {event.description === "yellow_card" ||
          event.description === "red_card" ||
          event.description === "penalty" ||
          event.description === "own_goal" ? (
            <div>
              <label>Player</label>
              <select
                name="player"
                value={event.player}
                onChange={handleChange}
                required
                className="border px-2 py-1 rounded w-full"
                disabled={!event.team}
              >
                <option value="">Select Player</option>
                {filteredPlayers.map((p) => (
                  <option key={p._id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          {event.description === "goal" && (
            <div className="space-y-4">
              <div>
                <label>Player</label>
                <select
                  name="player"
                  value={event.player}
                  onChange={handleChange}
                  required
                  className="border px-2 py-1 rounded w-full"
                  disabled={!event.team}
                >
                  <option value="">Select Scorer</option>
                  {filteredPlayers.map((p) => (
                    <option key={p._id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Assist</label>
                <select
                  name="assist"
                  value={event.assist}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                  disabled={!event.team}
                >
                  <option value="">Assist (Optional)</option>
                  {filteredPlayers.map((p) => (
                    <option key={p._id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {event.description === "substitution" && (
            <>
              <div>
                <label>Sub In</label>
                {/* <input
                  type="text"
                  name="subIn"
                  value={event.subIn}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                  placeholder="Player In"
                /> */}
                <select
                  name="subIn"
                  value={event.subIn}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                  disabled={!event.team}
                >
                  <option value="">Player In</option>
                  {filteredPlayers.map((p) => (
                    <option key={p._id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Sub Out</label>
                {/* <input
                  type="text"
                  name="subOut"
                  value={event.subOut}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                  placeholder="Player Out"
                /> */}
                <select
                  name="subOut"
                  value={event.subOut}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                  disabled={!event.team}
                >
                  <option value="">Player Out</option>
                  {filteredPlayers.map((p) => (
                    <option key={p._id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          <div>
            <label>Minute</label>
            <input
              type="number"
              name="minute"
              value={event.minute}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
