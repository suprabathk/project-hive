import React from "react";
import {
  BoardIcon,
  BookmarkIcon,
  PersonIcon,
  ProjectHiveLogo,
} from "../AppIcons/appIcons";
import { ActiveLink } from "raviger";

export const SideBar = () => {
  return (
    <div className="bg-black py-4 px-2 mr-2 flex flex-col sm:min-w-[15%] justify-between h-screen fixed">
      <div className="flex gap-2 text-white items-center">
        <ProjectHiveLogo className="w-10 h-10 stroke-white" />
        <h2 className="font-semibold text-xl tracking-widest hidden sm:block">
          HIVE
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {[
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
            className="bg-[#141418] text-white px-2 py-1 rounded-md flex gap-3 items-center"
            exactActiveClass="bg-[#212128]"
          >
            <span>{link.icon}</span>
            <span className="hidden sm:block">{link.page}</span>
          </ActiveLink>
        ))}
      </div>
      <div></div>
      <div></div>
      <button
        className="hover:bg-[#212128] text-white bg-[#141418] rounded-md px-2 py-1 text-left transition-all flex gap-3 items-center"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        <PersonIcon className="w-4 h-4" />
        <span className="hidden sm:block">Sign out</span>
      </button>
    </div>
  );
};
