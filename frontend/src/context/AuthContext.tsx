// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { baseUrl } from "@/lib/service";
import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

import { TSignInSchema, TSignUpSchema } from "@/lib/types";

import { UseFormSetError, UseFormReset } from "react-hook-form";

export interface TUser {
  id?: string 
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
  registerUser: TAuth;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(() => {
    const saveItem = localStorage.getItem("user");
    const UserInfo = saveItem ? JSON.parse(saveItem) : null;
    return UserInfo ;
  });

  const login: TAuth = useCallback(async (body, setError, reset, navigate) => {
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
        navigate("/auth");
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");

  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerUser }}>
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
