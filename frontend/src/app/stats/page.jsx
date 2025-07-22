import React from "react";
import { playerStats } from "@/data/stats";
import StatSection from "@/components/StatsSection";

const Stats = () => {
  const topScorers = [...playerStats].sort((a, b) => b.goals - a.goals);
  const topAssists = [...playerStats].sort((a, b) => b.assists - a.assists);
  const topCleanSheets = [...playerStats].sort(
    (a, b) => b.cleansheets - a.cleansheets
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl text-(--color-primary) font-bold mb-5 text-center">
        Player Statistics
      </h1>

      <StatSection title="🥇 Top Scorers" data={topScorers} statKey="goals" />
      <StatSection
        title="🎯 Top Assist Providers"
        data={topAssists}
        statKey="assists"
      />
      <StatSection
        title="🧤 Most Clean Sheets"
        data={topCleanSheets}
        statKey="cleansheets"
      />
    </div>
  );
};

export default Stats;
