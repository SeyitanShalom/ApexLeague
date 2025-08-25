import React, { useState } from "react";
import { matches } from "@/data/matches";
import { matchEvents } from "@/data/matchEvents";
import { FaFutbol, FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoMdCard } from "react-icons/io";
import EventForm from "./EventForm";

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

const getEventBackground = (type) => {
  switch (type) {
    case "goal":
      return "bg-green-50";
    case "yellow":
      return "bg-yellow-50";
    case "red":
      return "bg-red-50";
    case "sub":
      return "bg-blue-50";
    default:
      return "bg-gray-50";
  }
};

const getMatchName = (match) =>
  match ? `${match.homeTeam} VS ${match.awayTeam}` : "No Match Selected";

const MatchEvents = () => {
  // Ensure matches is not empty
  const [selectedMatchId, setSelectedMatchId] = useState(
    matches.length > 0 ? String(matches[0]._id) : ""
  );
  const [showModal, setShowModal] = useState(false);

  const selectedMatch = matches.find((m) => m._id === selectedMatchId);
  const matchEventObj = matchEvents.find(
    (me) => me.matchId === selectedMatchId
  );
  const eventsForMatch = matchEventObj ? matchEventObj.events : [];

  console.log("selectedMatchId:", selectedMatchId);
  console.log(
    "matches ids:",
    matches.map((m) => m._id)
  );
  console.log("selectedMatch:", selectedMatch);
console.log(typeof matches[0]._id, matches[0]._id);
console.log(typeof selectedMatchId, selectedMatchId);


  return (
    <div>
      {/* Header */}
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

        {/* Match selector */}
        {matches.length > 0 ? (
          <div className="flex items-center justify-center mt-5 text-sm">
            <select
              className="w-60 border px-3 border-gray-600 rounded-md cursor-pointer"
              value={selectedMatchId}
              onChange={(e) => setSelectedMatchId(e.target.value)}
            >
              {matches.map((m, idx) => (
                <option key={idx} value={m._id}>
                  {getMatchName(m)}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="text-center text-sm text-gray-500 mt-5">
            No matches available.
          </p>
        )}
      </div>

      {/* Match Info */}
      {selectedMatch && (
        <div className="bg-white rounded-lg my-5 p-5 text-sm flex flex-col items-center">
          <h2 className="font-bold">{getMatchName(selectedMatch)}</h2>
          {selectedMatch.startTime && (
            <p className="text-xs">
              {new Date(selectedMatch.startTime).toLocaleString()}
            </p>
          )}
        </div>
      )}

      {/* Timeline */}
      <div className="bg-white rounded-lg my-5 p-5">
        <p className="text-sm font-semibold mb-3">Match Timeline</p>
        <div>
          {eventsForMatch.length > 0 ? (
            eventsForMatch.map((event) => {
              // Generate unique key from event data
              const eventKey = `${event.minute}-${event.type}-${
                event.player || event.scorer || Math.random()
              }`;
              return (
                <div
                  key={eventKey}
                  className={`mb-4 flex items-center gap-2 text-sm p-3 rounded-md ${getEventBackground(
                    event.type
                  )}`}
                >
                  {getEventIcon(event.type)}
                  <div>
                    <p className="font-medium">
                      {event.minute}' -{" "}
                      {event.scorer && <span>{event.scorer}</span>}
                      {event.assist && <span> ({event.assist})</span>}
                      {event.player && <span> {event.player}</span>}
                      {event.subIn && <span> In: {event.subIn} --</span>}{" "}
                      {event.subOut && <span> Out: {event.subOut}</span>}
                    </p>
                    <span className="text-gray-600">{event.team}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-gray-500">No events for this match.</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <EventForm matchId={selectedMatchId} setShowModal={setShowModal} />
            <button
              onClick={() => setShowModal(false)}
              className="mt-3 bg-red-500 text-white px-4 py-1 rounded-md text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchEvents;
