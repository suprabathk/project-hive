import React, { useEffect, useState } from "react";
import { User } from "../types/userTypes";
import { getBoards, getTasks } from "../utils/APIutils";
import { LoadingIndiacator } from "../components/common/LoadingIndicator";
import { CalenderIcon } from "../AppIcons/appIcons";

export const Home = ({ currentUser }: { currentUser: User }) => {
  const [loading, setLoading] = useState(false);
  const [dueTodayCount, setDueTodayCount] = useState(0);
  const [highPriorityCount, setHighPriortyCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    getBoards().then((data) => {
      for (let board of data.results) {
        getTasks(board.id).then((tasks) => {
          for (let task of tasks) {
            setTotalCount((count) => (count += 1));
            if (
              new Date(task.description.dueDate).getDate() ===
              new Date().getDate()
            ) {
              setDueTodayCount((count) => (count += 1));
            }
            if (task.description.priority === "High") {
              setHighPriortyCount((count) => (count += 1));
            }
          }
        });
      }
      setLoading(false);
    });
  }, []);

  const today = new Date();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="my-4 ml-4 mr-8  text-slate-200">
      <div className="text-slate-400 flex gap-1 items-center">
        <CalenderIcon className="w-4 h-4" />
        <p>
          {weekday[today.getUTCDay()]},{" "}
          {today.toLocaleDateString("default", { month: "long" })}{" "}
          {today.getDate()}
        </p>
      </div>
      <h3 className="font-Montserrat text-6xl">
        Hello,{" "}
        {currentUser.name === "" ? currentUser.username : currentUser.name}
      </h3>
      {loading ? (
        <LoadingIndiacator />
      ) : (
        <div>
          <div className="mt-10">
            <h4 className="text-3xl font-Montserrat mb-1">Board details</h4>
            <div className="flex gap-4 flex-col sm:flex-row ">
              <div className="text-2xl border border-gray-400 bg-[#212128] rounded-md px-4 py-2 w-full">
                <p>Tasks due today</p>
                <div className="flex items-end gap-1">
                  <p className="font-extrabold mt-4">{dueTodayCount}</p>
                  <p className="text-gray-400 text-base">Task count</p>
                </div>
              </div>
              <div className="text-2xl border border-gray-400 bg-[#212128] rounded-md px-4 py-2 w-full">
                <p>High priority tasks</p>
                <div className="flex items-end gap-1">
                  <p className="font-extrabold mt-4">{highPriorityCount}</p>
                  <p className="text-gray-400 text-base">Task count</p>
                </div>
              </div>
              <div className="text-2xl border border-gray-400 bg-[#212128] rounded-md px-4 py-2 w-full">
                <p>Total tasks</p>
                <div className="flex items-end gap-1">
                  <p className="font-extrabold mt-4">{totalCount}</p>
                  <p className="text-gray-400 text-base">Task count</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
