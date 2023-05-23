import React from "react";
import { Stage, Task } from "../types/boardTypes";
import { Droppable } from "react-beautiful-dnd";
import { TaskCard } from "./TaskCard";
import { DeleteIcon, PlusIcon } from "../AppIcons/appIcons";

export const StageCard = ({
  stage,
  tasks,
  addTaskToStage,
  deleteStage,
}: {
  stage: Stage;
  tasks: Task[];
  addTaskToStage: (stageID: number) => void;
  deleteStage: (stageID: number) => void;
}) => {
  return (
    <div className="flex flex-col min-w-[30%] gap-2 bg-black border border-gray-400 rounded-lg py-4 px-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold">{stage.title}</h3>
          <p className="font-light">{stage.description}</p>
        </div>
        <button
          onClick={() => stage.id && deleteStage(stage.id)}
          className="transition-all flex gap-1 items-center text-red-300 hover:text-red-500"
        >
          <DeleteIcon className="w-4 h-4" />
          <span>Delete stage</span>
        </button>
      </div>
      <button
        onClick={() => stage.id && addTaskToStage(stage.id)}
        className="bg-[#212128] rounded-md px-4 py-2 flex gap-2 items-center justify-center"
      >
        <PlusIcon className="w-5 h-5" />
        <span>New task</span>
      </button>
      <Droppable droppableId={`${stage.id}`}>
        {(provided) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className=""
            >
              <div>
                {tasks.map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))}
              </div>
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};
