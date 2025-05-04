import axios from "axios";
import { Match } from "../types/match";


const API_URLGetUpComingMatches = "http://localhost:8080/api/auth/matches/fixtures";
const API_URLGetMatchById = "http://localhost:8080/api/auth/matches/";

export const getUpComingMatches = async (
    leagueId: number,
    season: number,
    limit: number
  ): Promise<Match[]> => {
    try {
      const response = await axios.get(API_URLGetUpComingMatches, {
        params: { leagueId, season, limit },
        withCredentials: true,
      });
      const transformedMatches: Match[] = response.data.map((match: any) => ({
        id: match.id,
        image: match.homeTeam.logo, 
        title: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
        location: match.stadium.name,
        awayTeam: match.awayTeam,
        homeTeam: match.homeTeam,
        stadium: match.stadium,
        soldTickets: match.soldTickets,
      }));
      return transformedMatches;
    } catch (error) { 
      console.error("Error fetching matches:", error);
      throw new Error("Failed to fetch matches");
    }
};

export const getMatchById = async(
    matchId: number
  ): Promise<Match> => {
    try {
      const response = await axios.get(API_URLGetMatchById + matchId, {
        withCredentials: true,
      });
      console.log(response)
      const match = response.data; 
      const transformedMatch: Match = {
        id: match.id,
        apiId: match.apiId,
        image: match.homeTeam.logo,
        title: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
        location: match.stadium.name,
        awayTeam: match.awayTeam,
        homeTeam: match.homeTeam,
        stadium: match.stadium,
        soldTickets: match.soldTickets,
      };
      return transformedMatch;
    } catch (error) { 
      console.error("Error fetching matches:", error);
      throw new Error("Failed to fetch matches");
    }
  };