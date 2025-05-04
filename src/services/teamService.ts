import axios from "axios";
import { Team } from "../types/team";


const API_URL = "http://localhost:8080/teams/search"; 

export const searchTeams = async (
    searchQuery: string,
    page: number,
    size: number
  ): Promise<Team[]> => {
    try {
        const response = await axios.get(API_URL, {
            params:{
                searchQuery,
                page,
                size,
            }
          });
      const transformedTeams: Team[] = response.data.teams.map((team: any) => ({
        id: team.id,
        apiId: team.apiId,
        name: team.name,
        logo: team.logo, 
      }));
      return transformedTeams;
    } catch (error) {
      console.error("Error fetching teams:", error);
      return [];
    }
};