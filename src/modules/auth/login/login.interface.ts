export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    role?: string;
    phone?: string;
    status?: string;
  };
  accessToken: string;
  refreshToken: string;
}
