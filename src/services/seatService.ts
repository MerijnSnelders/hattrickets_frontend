import axios from "axios";
import { getToken } from "./loginService";

const API_URL = "http://localhost:8080/api/auth/seats/"; 

export const getSeatsForMatch = async (matchId: number, page = 0, size = 200, row: string | null = null) => {
    const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    });

    if (row) params.append("row", row);

    const response = await axios.get(API_URL+`${matchId}?${params.toString()}`,{
        headers: {
            Authorization: `Bearer ${getToken()}`
            }
    });
    return response.data;
};

 