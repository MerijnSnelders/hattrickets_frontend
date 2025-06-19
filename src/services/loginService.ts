import axios from "axios";
import { AuthRequest, AuthResponse, DecodedToken, SignupRequest } from "@/types/auth";
import { jwtDecode } from "jwt-decode";
const API_URL = "http://localhost:8080/api/auth/users"

export const login = async (data: AuthRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true // Important for CORS with credentials
    }
  );
  return response.data;
};

export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/signup`, data);
  return response.data;
};

export const googleLogin = async (googleToken: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/googleLogin`, 
    { token: googleToken});
  return response.data;
};

export const isLoggedIn = () => {
    const decoded = decodeToken();
    if (!decoded)
         return null;
    else
    return decoded.userId;
}

export const logout = () => {
  localStorage.removeItem("token");
};

export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => localStorage.getItem("token");

export const decodeToken = (): DecodedToken | null => {
    const token = getToken();
    if (!token) return null;
    try {
      return jwtDecode<DecodedToken>(token);
    } catch {
      return null;
    }
};

export const getUserRole = (): string | null => {
    const decoded = decodeToken();
    return decoded?.role || null;
};

export const changePassword = async (data: {
  email: string;
  oldPassword: string;
  newPassword: string;
}) => {
  const response = await axios.put(`${API_URL}/changePassword`, data);
  return response
};


