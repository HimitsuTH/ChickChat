import { TToken } from "@/context/AuthContext";

export const baseUrl = "http://localhost:3001";

export default function authHeader(token: TToken) {
  // const tokenStr = localStorage.getItem("token");

  if (token && token.access_token) {
    return { Authorization: "Bearer " + token.access_token };
  } else {
    return { Authorization: "" };
  }
}
