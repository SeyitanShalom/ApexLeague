import Image from "next/image";
import React from "react";

const MatchCard = ({ match }) => {
  const liveMatch = match.status === "live";
  const upcomingMatch = match.status === "not_started";
  const finishedMatch = match.status === "finished";
  return (
    <div>
      <div className="flex flex-col justify-center h-32 w-full shadow-md border-2 border-gray-100 mb-5 rounded-md  items-center">
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col gap-2 text-sm items-center font-medium flex-1">
            <Image src="/football club.png" alt="logo" width={35} height={35} />
            <p>{match.homeTeam}</p>
          </div>
          <div className="font-semibold text-xl text-center">
            {liveMatch ? (
              <p>
                {match.homeScore} - {match.awayScore}
              </p>
            ) : upcomingMatch ? (
              <p>VS</p>
            ) : (
              <p>
                {match.homeScore} - {match.awayScore}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 text-sm items-center font-medium flex-1">
            <Image src="/football club.png" alt="logo" width={35} height={35} />
            <p>{match.awayTeam}</p>
          </div>
        </div>
        {liveMatch ? (
          <div className="flex justify-center w-full items-center text-sm">
            <div className="w-2.5 h-2.5 mr-1 bg-green-600 rounded-full"></div>
            <p className="translate-y-[1px]">{match.status}</p>
          </div>
        ) : (
          <div className="flex justify-center w-full items-center">
            <p className="text-xs">{match.time}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
