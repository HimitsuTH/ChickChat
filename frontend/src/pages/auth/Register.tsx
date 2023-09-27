"use client";

import React from "react";
import { Link } from "react-router-dom";

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

const Register = () => {
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className=" text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="name" placeholder="me@xxxx.xx" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Username">Username</Label>
                <Input id="Username" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="conPassword">Confirm Password</Label>
                <Input id="conPassword" />
              </div>
            </div>
          </form>
          <div className="mt-2 text-center">
            <Label>
              Already exists?
              <Link to={"/auth/"} className=" cursor-pointer text-blue-500">
                {" "}
                SignIn now
              </Link>
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end items-center">
          <Button>Sign up</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
