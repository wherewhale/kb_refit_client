export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResquest {
  username: string;
  password: string;
}

export interface UserResponse {
  userId: number;
  role: string;
  name: string;
  birthDate: string;
  totalCarbonPoint: number;
  totalStarPoint: number;
}
