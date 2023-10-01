"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";

//@react-hook-form
import { useForm } from "react-hook-form";
import { signUpSchema, TSignUpSchema } from "@/lib/types";

//@zod
import { zodResolver } from "@hookform/resolvers/zod";

//@shadcn
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (body: TSignUpSchema) => {
    const { password } = body;
    if (password === "") {
      setError("password", {
        message: "Please enter you are password",
      });
      return;
    }
    try {
      const sendData = {
        email: body.email,
        username: body.username,
        password: body.password,
      };

      registerUser(sendData, setError, reset, navigate);

      // const res = await axios.post(`${baseUrl}/user/register`, sendData);
      // if (res.status === 201) {
      //   alert("Register successfully.");
      //   navigate("/auth");
      // }
      // console.log(res);

      // reset();
    } catch (errors) {
      console.log(errors);
    }
  };
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className=" text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  placeholder="me@xxxx.xx"
                />
                {errors.email && (
                  <p className="text-red-500">{`${errors.email.message}`}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input {...register("username")} id="username" />
                {errors.username && (
                  <p className="text-red-500">{`${errors.username.message}`}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input {...register("password")} id="password"  type="password"/>
                {errors.password && (
                  <p className="text-red-500">{`${errors.password.message}`}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input {...register("confirmPassword")} id="confirmPassword" type="password" />
                {errors.confirmPassword && (
                  <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate(-1)}
              >
                back
              </Button>

              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "loading..." : "Sign up"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          {/* @Already exists*/}
          <>
            <Label>
              Already exists?
              <Link
                to={"/auth/"}
                className=" cursor-pointer text-blue-500 ml-3"
              >
                Signin now
              </Link>
            </Label>
          </>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
