"use client";

import React from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
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
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="name" placeholder="me@xxxx.xx" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" />
              </div>
            </div>
          </form>
          <div className="mt-2 text-center">
            <Label>
              Not a member?
              <Link to={"/auth/register"} className=" cursor-pointer text-blue-500"> SignUp now</Link>
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end items-center">
          <Button>Login</Button>  
        </CardFooter>
        
      </Card>
    </div>
  );
};

export default Login;
