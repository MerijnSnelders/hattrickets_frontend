import { statisticsResponse } from "@/types/statistics";
import axios from "axios";
import { getToken } from "./loginService";

const API_URL = "http://localhost:8080/api/admin/statistics"; 

export const getStatistics = async (): Promise<statisticsResponse> => {
    try {
        const response = await axios.get<statisticsResponse>(
          `${API_URL}/stats`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          }
        );
        console.log(response.data);
        return response.data
    } 
    catch (error) {
        throw error
    }
}