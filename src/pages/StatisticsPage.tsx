import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { statisticsResponse } from "@/types/statistics";
import { getStatistics } from "@/services/statisticsService";



const StatisticsPage = () => {
  const [stats, setStats] = useState<statisticsResponse | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStatistics()
        setStats(response);
        console.log(response);
        console.log(stats);
      } catch (error) {
        console.error("Failed to load admin statistics", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div className="p-6 text-white">Loading admin stats...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard – Match Stats</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Populairste match */}
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Match</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Teams:</strong> {stats.popularMatch.homeTeam.name} vs {stats.popularMatch.awayTeam.name}</p>
            <p><strong>Tickets Sold:</strong> {stats.popularMatch.soldTickets}</p>
          </CardContent>
        </Card>

        {/* Totale omzet */}
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>€</strong> {stats.totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>

        {/* Gem. tickets per stadion */}
        <Card>
          <CardHeader>
            <CardTitle>Avg. Tickets per Stadium</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{stats.averageTicketsPerStadium.toFixed(1)} tickets</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPage;
