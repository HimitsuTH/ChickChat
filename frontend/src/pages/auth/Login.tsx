"use client";

import React from "react";

//@react-hook-form
import { useForm } from "react-hook-form";
import { signInSchema, TSignInSchema } from "@/lib/types";

//@axios
import axios from "axios";
import { baseUrl } from "@/lib/servies";

//@zod
import { zodResolver } from "@hookform/resolvers/zod";

//@shadcn/ui
import { Icons } from "@/components/icons";
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

//@react-router-dom
import { Link } from "react-router-dom";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (body: TSignInSchema) => {
    const { password } = body;
    if (password === "") {
      setError("password", {
        message: "Please enter you are password",
      });
      return;
    }
    try {
      const response = await axios.post(
        `${baseUrl}/user/login`,
        body
      );

      // const data = response.data;

   
      if (response.status  >= 200 && response.status < 300 ) {
        // response status is not 2xx
        alert("Submitting form failed!");
        return;
      }
    
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    // console.log(data);
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className=" text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          {/*@Form Login */}
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
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                />
                {errors.password && (
                  <p className="text-red-500">{`${errors.password.message}`}</p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Link to={"/"}>
                <Button className=" bg-white text-black hover:text-white border">
                  back
                </Button>
              </Link>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "loading..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          {/* @Not a member */}
          <div className="mt-2 text-center">
            <Label>
              Not a member?
              <Link
                to={"/auth/register"}
                className=" cursor-pointer text-blue-500 ml-2"
              >
                Signup now
              </Link>
            </Label>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
