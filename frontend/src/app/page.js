import Hero from "@/components/Hero";
import LiveMatch from "@/components/LiveMatch";
import UpcomingMatches from "@/components/UpcomingMatches";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <LiveMatch />
      <UpcomingMatches />
    </div>
  );
}
