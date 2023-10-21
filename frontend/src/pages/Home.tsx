import React from "react";

import Typewriter from "typewriter-effect";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" grid h-screen place-items-center bg-gradient-to-r from-indigo-300 to-purple-400 w-full overflow-hidden">
      <h1 className=" font-bold text-[3rem] md:text-[5rem] drop-shadow text-white text-center">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Hi Digio!")
              .pauseFor(2000)
              .deleteAll()
              .typeString("I'm Chinnawich")
              .deleteAll()
              .typeString("Chick Chat")
              .start();
          }}
        />
      </h1>

      <div className=" absolute top-5 right-5 flex gap-4">
        <Link to={"/auth"}>
          <Button
            className=" bg-white text-black hover:scale-125 transition-all"
            variant="outline"
          >
            Login
          </Button>
        </Link>
        <Link to={"/auth/register"}>
          <Button
            className=" bg-white text-black  hover:scale-125 transition-all"
            variant="outline"
          >
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
