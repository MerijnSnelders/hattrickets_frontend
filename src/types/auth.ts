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