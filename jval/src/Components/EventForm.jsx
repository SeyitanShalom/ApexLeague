import React, { useState } from "react";
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

const EventForm = ({ matchId, setShowModal }) => {
  const [event, setEvent] = useState(initialEvent);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send as an array of events, you can add multiple events if needed
      await axios.post("http://localhost:4000/creatematchevent", {
        matchId,
        events: [event],
      });
      alert("Event added!");
      setEvent(initialEvent);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 text-sm">
      <div className="bg-white rounded-lg p-6 w-[350px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Team</label>
            <input
              type="text"
              name="team"
              value={event.team}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Player</label>
            <input
              type="text"
              name="player"
              value={event.player}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Description</label>
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
          <div>
            <label>Assist</label>
            <input
              type="text"
              name="assist"
              value={event.assist}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Sub In</label>
            <input
              type="text"
              name="subIn"
              value={event.subIn}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Sub Out</label>
            <input
              type="text"
              name="subOut"
              value={event.subOut}
              onChange={handleChange}
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
