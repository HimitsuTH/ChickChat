import React from "react";

import { Outlet } from "react-router-dom";

export const Index = () => {
  return (
    <div className="grid h-screen items-center min-[420px]:justify-center bg-gradient-to-r from-indigo-300 to-purple-400">
      <div className="mx-2">
        <Outlet />
      </div>
    </div>
  );
};
