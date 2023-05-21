import React, { ReactNode } from "react";
import { User } from "../types/userTypes";
import { SideBar } from "./SideBar";

export const AppContainer = ({
  currentUser,
  children,
}: {
  currentUser: User;
  children: ReactNode;
}) => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideBar />
      <div className="w-full">{children}</div>
    </div>
  );
};
