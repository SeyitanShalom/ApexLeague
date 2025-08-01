"use client";
import React from "react";
import { FaFutbol, FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoMdCard } from "react-icons/io";
import { matches } from "@/data/matches";
import { matchEvents as allMatchEvents } from "@/data/matchEvents";
import { useParams } from "next/navigation";

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

const MatchEvents = () => {
  const params = useParams();
  const matchId = parseInt(params.slug); // assuming slug is just the match ID like "1"
  const match = matches.find((m) => m.id === matchId);
  const matchEventData = allMatchEvents.find((m) => m.matchId === matchId);
  const events = matchEventData?.events || [];

  if (!match) return <p>Match not found</p>;

  if (events.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No match events yet. Match hasn’t started.
      </p>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-5">
      {events.map((event, index) => (
        <div key={index} className="grid grid-cols-3 items-center text-sm">
          {/* Left Event (Team A) */}
          {event.team === match.homeTeam ? (
            <div className="text-left">
              {event.type === "sub" ? (
                <div>
                  <p className="text-xs text-gray-500 text-right">
                    {event.subOut}
                  </p>
                  <div className="flex items-center space-x-1">
                    <p className="font-semibold">{event.subIn}</p>
                    {getEventIcon(event.type)}
                  </div>
                </div>
              ) : event.type === "goal" ? (
                <div>
                  <div className="flex items-center justify-end space-x-1">
                    <p className="font-semibold">{event.scorer}</p>
                    {getEventIcon(event.type)}
                  </div>
                  <p className="text-xs text-gray-500 text-right">
                    {event.assist}
                  </p>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <p>{event.player}</p>
                  {getEventIcon(event.type)}
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}

          {/* Center Minute */}
          <div className="text-center text-gray-600 font-medium">
            {event.minute}'
          </div>

          {/* Right Event (Team B) */}
          {event.team === match.awayTeam ? (
            <div className="text-right">
              {event.type === "sub" ? (
                <div>
                  <p className="text-xs text-gray-500 text-left">
                    {event.subOut}
                  </p>
                  <div className="flex items-center justify-end space-x-1">
                    {getEventIcon(event.type)}
                    <p className="font-semibold">{event.subIn}</p>
                  </div>
                </div>
              ) : event.type === "goal" ? (
                <div>
                  <div className="flex items-center justify-end space-x-1">
                    {getEventIcon(event.type)}
                    <p className="font-semibold">{event.scorer}</p>
                  </div>
                  <p className="text-xs text-gray-500 text-left">
                    {event.assist}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-end space-x-2">
                  {getEventIcon(event.type)}
                  <p>{event.player}</p>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MatchEvents;
