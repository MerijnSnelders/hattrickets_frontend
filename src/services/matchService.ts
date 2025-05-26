import axios from "axios";
import { Match } from "../types/match";
import { getToken } from "./loginService";
import { promises } from "dns";


const API_URLGetUpComingMatches = "http://localhost:8080/api/auth/matches/fixtures";
const API_URLGetMatchById = "http://localhost:8080/api/auth/matches/";
const API_URLGetFilterMatches = "http://localhost:8080/api/auth/matches/filter"

export const getUpComingMatches = async (
    leagueId: number,
    season: number,
    limit: number
  ): Promise<Match[]> => {
    try {
      const response = await axios.get(API_URLGetUpComingMatches, {
        params: { leagueId, season, limit },
            headers: {
                Authorization: `Bearer ${getToken()}`
              }
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
            headers: {
                Authorization: `Bearer ${getToken()}`
              }
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
        date: match.date
      };
      return transformedMatch;
    } catch (error) { 
      console.error("Error fetching matches:", error);
      throw new Error("Failed to fetch matches");
    }
};

export const filterMatches = async (
  page: number,
  size: number,
  teamName?: string,
  stadiumName?: string,
  date?: string
): Promise<{content: Match[]; totalPages: number}> =>{

  const params: any = { page, size };
  if (teamName) params.teamName = teamName;
  if (stadiumName) params.stadiumName = stadiumName;
  if (date) params.matchDate = date;

  try{
    const response = await axios.get(API_URLGetFilterMatches, {
      params,
      headers: {
        Authorization: `Bearer ${getToken()}`
              }
    })
    const transformedMatches: Match[] = response.data.content.map((match: any) => ({
        id: match.id,
        image: match.homeTeam.logo, 
        title: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
        location: match.stadium.name,
        awayTeam: match.awayTeam,
        homeTeam: match.homeTeam,
        stadium: match.stadium,
        soldTickets: match.soldTickets,
      }));
      return {
      content: transformedMatches,
      totalPages: response.data.totalPages,
      };
    } catch (error) { 
      console.error("Error fetching matches:", error);
      throw new Error("Failed to fetch matches");
    }
}