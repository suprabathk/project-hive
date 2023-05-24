import React from "react";
import { Task } from "../types/boardTypes";
import { Draggable } from "react-beautiful-dnd";
import { CalenderIcon, MoveIcon } from "../AppIcons/appIcons";

export const TaskCard = ({ task, index }: { task: Task; index: number }) => {
  return (
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-[#212128] rounded-md flex flex-col px-3 py-2 my-2 w-full text-left"
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h4 className="font-semibold text-2xl">{task.title}</h4>
              <p className="font-light">{task.description.description}</p>
            </div>
            <button className="p-1">
              <MoveIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-between mt-4">
            <div
              className={`rounded-full px-2 ${
                task.description.priority === "Low" &&
                "bg-orange-200 text-orange-800"
              } ${
                task.description.priority === "Medium" &&
                "bg-green-200 text-green-800"
              } ${
                task.description.priority === "High" &&
                "bg-red-200 text-red-800"
              }`}
            >
              {task.description.priority}
            </div>
            <div className="bg-purple-200 rounded-full text-purple-800 px-2 flex items-center gap-2">
              <CalenderIcon className="w-4 h-4" />
              {new Date(task.description.dueDate).getDate() ===
              new Date().getDate()
                ? "Today"
                : task.description.dueDate}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
