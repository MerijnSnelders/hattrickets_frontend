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
      return response.data;
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw new Error("Failed to fetch matches");
    }
};