import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" grid h-screen place-items-center">
      <div>
        <p>Hello, Chick Chat</p>

        <>
          <Link to={"/auth"}>
            <Button className=" bg-white text-black hover:text-white border">
              Login
            </Button>
          </Link>
          <Link to={"/auth/register"}>
            <Button className=" bg-white text-black hover:text-white border">
              Sign up
            </Button>
          </Link>
        </>
      </div>
    </div>
  );
};

export default Home;
