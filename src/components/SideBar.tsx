import React from "react";
import {
  BoardIcon,
  BookmarkIcon,
  HomeIcon,
  PersonIcon,
  ProjectHiveLogo,
} from "../AppIcons/appIcons";
import { ActiveLink } from "raviger";

export const SideBar = () => {
  return (
    <div className="bg-[#2721cf] py-4 m-2 px-2 rounded-xl flex flex-col min-w-[15%] justify-between">
      <div className="flex gap-2 text-white items-center">
        <ProjectHiveLogo className="w-10 h-10 stroke-white" />
        <h2 className="font-semibold text-xl tracking-widest">HIVE</h2>
      </div>
      <div className="flex flex-col gap-3">
        {[
          { page: "Home", icon: <HomeIcon className={"w-4 h-4"} />, url: "/" },
          {
            page: "Boards",
            icon: <BoardIcon className={"w-4 h-4"} />,
            url: "/boards",
          },
          {
            page: "To-Do",
            icon: <BookmarkIcon className={"w-4 h-4"} />,
            url: "/todos",
          },
        ].map((link) => (
          <ActiveLink
            href={link.url}
            key={link.url}
            className="bg-[#ffffff3e] text-white px-2 py-1 rounded-md flex gap-3 items-center"
            exactActiveClass="bg-[#ffffff7d]"
          >
            <span>{link.icon}</span>
            <span>{link.page}</span>
          </ActiveLink>
        ))}
      </div>
      <div></div>
      <div></div>
      <button
        className="hover:bg-[#ffffff7d] text-white bg-[#ffffff3e] rounded-md px-2 py-1 text-left transition-all flex gap-3 items-center"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        <PersonIcon className="w-4 h-4" />
        <span>Sign out</span>
      </button>
    </div>
  );
};
