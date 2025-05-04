import axios from "axios";
import { AuthRequest, AuthResponse, SignupRequest } from "@/types/auth";
const API_URL = "http://localhost:8080/api/auth/users"

export const login = async (data: AuthRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, data, 
    { withCredentials: true,}
  );
  return response.data;
};

export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/signup`, data,
    { withCredentials: true,});
  return response.data;
};

export const googleLogin = async (googleToken: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/googleLogin`, 
    { token: googleToken},{  withCredentials: true, });
  return response.data;
};

export const isLoggedIn = async (): Promise<number | null> => {
  try{
    const response = await axios.get(`${API_URL}/isLoggedIn`,
      {withCredentials: true});
      return response.data;
  }
  catch{
    return null
  }    
}

export const logout = async () : Promise<void> => {
  await axios.post(`${API_URL}/logout`, {} ,
    {withCredentials: true}
  )
}