// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { baseUrl } from "@/lib/service";
import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

import { TSignInSchema } from "@/lib/types";

import { UseFormSetError, UseFormReset } from "react-hook-form";

interface TUser {
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
type TLogin = (
  userData: TUser,
  setError: UseFormSetError<TSignInSchema>,
  reset: UseFormReset<TSignInSchema>,
  navigate: NavigateFunction
) => void;

interface AuthContextType {
  user: TUser | null;
  login: TLogin;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(() => {
    const saveItem = localStorage.getItem("user");
    const UserInfo = saveItem ? (JSON.parse(saveItem) as TUser) : null;
    return UserInfo;
  });

  const login:TLogin = async (body, setError, reset, navigate ) => {
    try {
      const res = await axios.post(`${baseUrl}/user/login`, body);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
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
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
