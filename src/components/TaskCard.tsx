import React from "react";
import { Task } from "../types/boardTypes";
import { Draggable } from "react-beautiful-dnd";

export const TaskCard = ({ task, index }: { task: Task; index: number }) => {
  return (
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-[#212128] rounded-md flex flex-col px-2 py-1 my-2"
        >
          <h4 className="font-semibold text-2xl">{task.title}</h4>
          <p className="font-light">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};
