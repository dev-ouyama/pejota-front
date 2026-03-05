import { api } from "../api/client";
import { setToken } from "./token";

type LoginResponse = {
  access_token: string;
  token_type: string;
};

export async function login(email: string, password: string) {
  /*   const data = await api<LoginResponse>("auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }); */
  const data = await api<LoginResponse>("session", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  setToken(data.access_token);

  return data.access_token;
}
