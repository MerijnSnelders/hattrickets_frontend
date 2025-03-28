import axios from "axios";
import { Match } from "../types/match";


const API_URL = "http://localhost:8080/matches/fixtures";

export const getUpComingMatches = async (
    leagueId: number,
    season: number,
    limit: number
  ): Promise<Match[]> => {
    try {
      const response = await axios.get(API_URL, {
        params: { leagueId, season, limit },
      });
      const transformedMatches: Match[] = response.data.map((match: any) => ({
        image: match.homeTeam.logo, 
        title: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
        location: match.stadium.name,
      }));
      return transformedMatches;
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw new Error("Failed to fetch matches");
    }
};