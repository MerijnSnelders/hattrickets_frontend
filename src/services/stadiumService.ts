import axios from "axios";
import { Stadium } from "../types/stadium";


const API_URL = "http://localhost:8080/stadiums/search"; 

export const searchStadium = async (
    searchQuery: string,
    page: number,
    size: number
  ): Promise<Stadium[]> => {
    try {
        const response = await axios.get(API_URL, {
            params:{
                searchQuery,
                page,
                size,
            }
          });
      const transformedStadiums: Stadium[] = response.data.stadiums.map((stadium: any) => ({
        id: stadium.id,
        apiId: stadium.apiId,
        name: stadium.name,
        capacity: stadium.capacity,
        image: stadium.image, 
      }));
      return transformedStadiums;
    } catch (error) {
      console.error("Error fetching stadiums:", error);
      return [];
    }
};