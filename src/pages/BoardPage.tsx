import React, { useEffect, useState } from "react";
import { Board, Stage, Task } from "../types/boardTypes";
import { getBoard, getStages, getTasks } from "../utils/APIutils";
import { LoadingIndiacator } from "../components/common/LoadingIndicator";
import { PlusIcon } from "../AppIcons/appIcons";
import Modal from "../components/common/Modal";
import CreateStage from "./CreateStage";
import { DragDropContext } from "react-beautiful-dnd";
import { StageCard } from "../components/StageCard";
import CreateTask from "./CreateTask";

const fetchBoardData = (
  id: number,
  setBoard: (board: Board) => void,
  setStages: (stages: Stage[]) => void,
  setTasks: (tasks: Task[]) => void
) => {
  getStages().then((data) => setStages(data.results));
  getBoard(id).then((data) => setBoard(data));
  getTasks(id).then((data) => setTasks(data.results));
};

export const BoardPage = ({ id }: { id: number }) => {
  const [board, setBoard] = useState<Board>({
    title: "",
    description: "",
  });
  const [stages, setStages] = useState<Stage[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newStage, setNewStage] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [stageID, setStageID] = useState(0);

  const addTaskToStage = (stageID: number) => {
    setStageID(stageID);
    setNewTask(true);
  };

  const addTaskToGlobal = (task: Task) => {
    setTasks((tasks) => [...tasks, task]);
  };

  useEffect(() => fetchBoardData(id, setBoard, setStages, setTasks), [id]);
  return board.id ? (
    <div className="my-4 ml-4 mr-8  text-slate-200">
      <div>
        <h3 className="font-bold font-Montserrat text-3xl ">{board.title}</h3>
        <p className="font-light">{board.description}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div></div>
        <button
          type="submit"
          onClick={() => setNewStage(true)}
          className="p-1.5 text-sm font-semibold h-fit border rounded-md text-center bg-[#212128] text-gray-400 border-gray-400 flex gap-1 items-center focus:outline-none"
        >
          <PlusIcon className={"w-4 h-4"} />
          <span>Add new stage</span>
        </button>
      </div>
      <DragDropContext onDragEnd={() => {}}>
        {stages.length > 0 ? (
          <div className="flex gap-2">
            {stages.map((stage) => (
              <StageCard
                key={stage.id}
                stage={stage}
                tasks={tasks.filter(
                  (task) => task.status_object?.id === stage.id
                )}
                addTaskToStage={addTaskToStage}
              />
            ))}
          </div>
        ) : (
          <div>
            <p>There are no stages.</p>
            <p>Please start by adding a stage.</p>
          </div>
        )}
      </DragDropContext>

      <Modal open={newStage} closeCB={() => setNewStage(false)}>
        <CreateStage />
      </Modal>
      <Modal open={newTask} closeCB={() => setNewTask(false)}>
        <CreateTask boardID={id} statusID={stageID} addTask={addTaskToGlobal} />
      </Modal>
    </div>
  ) : (
    <LoadingIndiacator />
  );
};
