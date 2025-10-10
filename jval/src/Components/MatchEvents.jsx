import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFutbol, FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoMdCard } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import EventForm from "./EventForm";

const getEventIcon = (type) => {
  switch (type) {
    case "goal":
      return <FaFutbol className="text-green-600" />;
    case "yellow_card":
      return <IoMdCard className="text-yellow-500" />;
    case "red_card":
      return <IoMdCard className="text-red-600" />;
    case "substitution":
      return <FaArrowRightArrowLeft className="text-blue-500" />;
    case "penalty":
      return <FaFutbol className="text-purple-600" />;
    case "own_goal":
      return <FaFutbol className="text-orange-600" />;
    default:
      return null;
  }
};

const getEventBackground = (type) => {
  switch (type) {
    case "goal":
      return "bg-green-50";
    case "yellow_card":
      return "bg-yellow-50";
    case "red_card":
      return "bg-red-50";
    case "substitution":
      return "bg-blue-50";
    case "penalty":
      return "bg-purple-50";
    case "own_goal":
      return "bg-orange-50";
    default:
      return "bg-gray-50";
  }
};

const getMatchName = (match) =>
  match ? `${match.homeTeam} VS ${match.awayTeam}` : "No Match Selected";

const MatchEvents = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eventsForMatch, setEventsForMatch] = useState([]);

  // Fetch matches on mount
  useEffect(() => {
    axios.get("http://localhost:4000/allmatches").then((res) => {
      setMatches(res.data.matches || []);
      if (res.data.matches && res.data.matches.length > 0) {
        setSelectedMatchId(String(res.data.matches[0]._id));
      }
    });
  }, []);

  // Fetch events when selectedMatchId or showModal changes
  useEffect(() => {
    if (selectedMatchId) {
      axios
        .get(`http://localhost:4000/matchevents/${selectedMatchId}`)
        .then((res) => setEventsForMatch(res.data.events || []))
        .catch(() => setEventsForMatch([]));
    }
  }, [selectedMatchId, showModal]);

  const handleDeleteEvent = async (
    minute,
    description,
    player,
    subIn,
    subOut
  ) => {
    // Filter out the event to delete by matching unique fields
    const updatedEvents = eventsForMatch.filter(
      (event) =>
        !(
          event.minute === minute &&
          event.description === description &&
          event.player === player &&
          event.subIn === subIn &&
          event.subOut === subOut
        )
    );
    // Update events in backend
    await axios.post("http://localhost:4000/creatematchevent", {
      matchId: selectedMatchId,
      events: updatedEvents,
    });
    setEventsForMatch(updatedEvents);
  };

  const selectedMatch = matches.find(
    (m) => String(m._id) === String(selectedMatchId)
  );

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
              {matches.map((m) => (
                <option key={m._id} value={m._id}>
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
            eventsForMatch.map((event, idx) => {
              const eventKey = `${event.minute}-${event.description}-${
                event.player || Math.random()
              }`;
              return (
                <div
                  key={eventKey}
                  className={`mb-4 flex items-center justify-between gap-2 text-sm p-3 rounded-md ${getEventBackground(
                    event.description
                  )}`}
                >
                  <div className="flex items-center gap-3">
                    {getEventIcon(event.description)}
                    <div>
                      <p className="font-medium">
                        {event.minute}' -{" "}
                        {event.description !== "substitution" &&
                          event.player && <span>{event.player}</span>}
                        {event.assist && <span> (Assist: {event.assist})</span>}
                        {event.description === "substitution" && (
                          <>
                            {event.subIn && <span>In: {event.subIn} -- </span>}
                            {event.subOut && <span>Out: {event.subOut}</span>}
                          </>
                        )}
                      </p>
                      <span className="text-gray-600">{event.team}</span>
                    </div>
                  </div>
                  <button
                    className="ml-2 text-xl text-red-500 hover:text-red-700"
                    onClick={() =>
                      handleDeleteEvent(
                        event.minute,
                        event.description,
                        event.player,
                        event.subIn,
                        event.subOut
                      )
                    }
                  >
                    <RiDeleteBin6Line />
                  </button>
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
            <EventForm
              matchId={selectedMatchId}
              selectedMatch={selectedMatch}
              setShowModal={setShowModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchEvents;
