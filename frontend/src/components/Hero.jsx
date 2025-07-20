import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mt-7">
      <h1 className="font-black text-3xl mb-2">Where Future Champions Rise!</h1>
      <p className="text-center text-sm w-88 mb-10">
        Stay updated with real-time scores, team stats, and match-day actions
        from Johnvents Apex league. Dive into fixtures, player stats, and league
        tables all in one place. Football lives here.
      </p>
      <Image src="/Hero Image.png" alt="" width={400} height={400} />
    </div>
  );
};

export default Hero;
