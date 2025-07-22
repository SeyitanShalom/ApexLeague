import React from "react";
import { teams } from "@/data/teams";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <h1 className="bg-(--color-primary) text-white -mx-4 text-center py-1 mb-5">
        Teams
      </h1>
      <div className="grid grid-cols-3 place-items-center gap-8">
        {teams.map((team) => (
          <div className="w-32 h-32 p-3 rounded-lg shadow-md flex justify-center items-center ">
            <div className="flex flex-col items-center gap-3">
              <Image
                src={team.logo}
                alt={team.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <p>{team.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
