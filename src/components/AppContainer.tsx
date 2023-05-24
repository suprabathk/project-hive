import React, { ReactNode } from "react";
import { SideBar } from "./SideBar";

export const AppContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex bg-black min-h-screen font-Lato">
      <SideBar />
      <div className="w-full ml-[15%] bg-[#141418] rounded-md">{children}</div>
    </div>
  );
};
