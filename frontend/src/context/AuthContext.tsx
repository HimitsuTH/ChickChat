// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { baseUrl } from "@/lib/service";
import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

import { TSignInSchema, TSignUpSchema } from "@/lib/types";

import { UseFormSetError, UseFormReset } from "react-hook-form";

import authHeader from "@/lib/service";

export interface TToken {
  token_type: string;
  access_token: string;
  expires_in: number;
}

export interface TUser {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
}

type ErrorData = {
  field: "email" | "password";
  statusCode: number;
  message: string;
};

export type SetError = {
  setError: () => void;
};
type TAuth = (
  body: TUser,
  setError: UseFormSetError<TSignInSchema> | UseFormSetError<TSignUpSchema>,
  reset: UseFormReset<TSignInSchema> | UseFormReset<TSignUpSchema>,
  navigate: NavigateFunction
) => void;

interface AuthContextType {
  user: TUser | null;
  login: TAuth;
  token: TToken | null;
  registerUser: TAuth;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(() => {
    const saveItem = localStorage.getItem("user");
    const UserInfo = saveItem ? JSON.parse(saveItem) : null;
    return UserInfo;
  });

  const [token, setToken] = useState<TToken | null>(() => {
    const saveItem = localStorage.getItem("token");
    const _token = saveItem ? JSON.parse(saveItem) : null;
    return _token;
  });

  const login: TAuth = useCallback(async (body, setError, reset, navigate) => {
    try {
      const res = await axios.post(`${baseUrl}/user/login`, body);

      setToken(res.data);
      localStorage.setItem("token", JSON.stringify(res?.data));

      navigate("/");
      reset();
    } catch (errors) {
      const err = errors as AxiosError;
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const errorData: ErrorData = err?.response.data as ErrorData;

          setError(errorData.field, {
            message: errorData.message,
          });
        }
      }
    }
  }, []);
  const registerUser: TAuth = useCallback(
    async (body, setError, reset, navigate) => {
      try {
        const res = await axios.post(`${baseUrl}/user/register`, body);

        if (res.status === 201) {
          alert("Register successfully.");
          navigate("/auth");
        }
        // localStorage.setItem("user", JSON.stringify(res.data));

        reset();
      } catch (errors) {
        const err = errors as AxiosError;
        console.log(err);
        if (axios.isAxiosError(err)) {
          if (err.response) {
            const errorData: ErrorData = err?.response.data as ErrorData;

            setError(errorData.field, {
              message: errorData.message,
            });
          }
        }
      }
    },
    []
  );

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (token != null) {
          // set expires_in token
          const now = new Date().getTime();
          const expires_in: number = parseInt(String(token?.expires_in)) || 0;
          const expiryTime = expires_in * 1000;

          if (expiryTime < now || token == null) {
            setUser(null);
            localStorage.removeItem("user");
            setToken(null);
            localStorage.removeItem("token");
          }

          const res = await axios.get(`${baseUrl}/user/me`, {
            headers: authHeader(token),
          });

          const user = res.data;
          localStorage.setItem("user", JSON.stringify(user));

          setUser(user);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUserInfo();
  }, [token]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
