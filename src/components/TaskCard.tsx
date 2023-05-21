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
        >
          {task.title}
        </div>
      )}
    </Draggable>
  );
};
