export interface AuthRequest {
    email: string;
    password: string;
  }
  
  export interface SignupRequest {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
  }
export interface DecodedToken {
   sub: string;
  role: string;
  exp: number;
}