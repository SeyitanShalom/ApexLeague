import React, { useState } from "react";
import { matches } from "@/data/matches";
import { matchEvents } from "@/data/matchEvents";
import { FaFutbol, FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoMdCard } from "react-icons/io";

const getEventIcon = (type) => {
  switch (type) {
    case "goal":
      return <FaFutbol className="text-green-600" />;
    case "yellow":
      return <IoMdCard className="text-yellow-500" />;
    case "red":
      return <IoMdCard className="text-red-600" />;
    case "sub":
      return <FaArrowRightArrowLeft className="text-blue-500" />;
    default:
      return null;
  }
};

const getMatchName = (match) => `${match.homeTeam} VS ${match.awayTeam}`;

const MatchEvents = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(matches[0].id);

  const selectedMatch = matches.find((m) => m.id === selectedMatchId);
  const matchEventObj = matchEvents.find(
    (me) => me.matchId === selectedMatchId
  );
  const eventsForMatch = matchEventObj ? matchEventObj.events : [];

  return (
    <div>
      <div className="bg-white rounded-lg my-5 p-5">
        <div className="flex justify-between items-center">
          <p className="font-bold">Match Events</p>
          <button
            className="bg-green-600 text-white px-3 py-1 font-bold text-xs cursor-pointer rounded-md"
            onClick={() => setShowModal(true)}
          >
            <span className="text-base mr-2">+</span>Add Events
          </button>
        </div>
        <div className="flex items-center justify-center mt-5 text-sm">
          <select
            className="w-60 border px-3 border-gray-600 rounded-md cursor-pointer"
            value={selectedMatchId}
            onChange={(e) => setSelectedMatchId(Number(e.target.value))}
          >
            {matches.map((m) => (
              <option key={m.id} value={m.id}>
                {getMatchName(m)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg my-5 p-5 text-sm flex flex-col items-center">
        <h2 className="font-bold">{getMatchName(selectedMatch)}</h2>
        {selectedMatch?.startTime && (
          <p className="text-xs">{selectedMatch.startTime.toLocaleString()}</p>
        )}
      </div>
      <div className="bg-white rounded-lg my-5 p-5">
        <p className="text-sm font-semibold mb-3">Match Timeline</p>
        <div>
          {eventsForMatch.length > 0 ? (
            eventsForMatch.map((event, idx) => (
              <div
                key={idx}
                className="mb-4 flex items-center gap-2 text-sm bg-green-50 p-3 rounded-md"
              >
                {getEventIcon(event.type)}
                <div>
                  <p className="font-medium">
                    {event.minute}' -{" "}
                    {event.scorer && <span>{event.scorer}</span>}
                    {event.assist && <span> ({event.assist})</span>}
                    {event.player && <span> {event.player}</span>}
                    {event.subIn && <span> In: {event.subIn} --</span>} {""}
                    {event.subOut && <span> Out: {event.subOut}</span>}
                  </p>
                  <span className="text-gray-600">{event.team}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No events for this match.</div>
          )}
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 text-sm">
          <div className="bg-white rounded-lg p-6 w-[350px] shadow-lg">
            <h2 className="font-bold text-lg mb-4">Add Match Event</h2>
            <form>
              <div className="mb-3">
                <label className="block mb-1 text-sm">Event Type</label>
                <select
                  className="border px-2 py-1 w-full rounded outline-0"
                  name=""
                  id=""
                >
                  <option value="Goal">Goal</option>
                  <option value="Yellow Card">Yellow Card</option>
                  <option value="Red Card">Red Card</option>
                  <option value="Substitution">Substitution</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm">Player</label>
                <input
                  className="border px-2 py-1 w-full rounded outline-0"
                  type="text"
                  placeholder="Player name"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm">Team</label>
                <select
                  className="border px-2 py-1 w-full rounded outline-0"
                  name=""
                  id=""
                >
                  <option value="Team A">Team A</option>
                  <option value="Team B">Team B</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm">Minute</label>
                <input
                  className="border px-2 py-1 w-full rounded outline-0"
                  type="number"
                 
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
      )}
    </div>
  );
};

export default MatchEvents;
