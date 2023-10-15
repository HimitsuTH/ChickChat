import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" grid h-screen place-items-center bg-gradient-to-r from-indigo-300 to-purple-400">
      <div>
        <h1 className=" font-bold text-[3rem] md:text-[5rem] drop-shadow text-white text-center">Hello, Chick Chat</h1>

        <div className="flex gap-4 justify-center md:justify-start">
          <Link to={"/auth"}>
            <Button className=" bg-white text-black hover:scale-125 transition-all" variant="outline">
              Login
            </Button>
          </Link>
          <Link to={"/auth/register"}>
            <Button className=" bg-white text-black  hover:scale-125 transition-all" variant="outline">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
