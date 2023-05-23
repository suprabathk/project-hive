import React, { useEffect, useState } from "react";
import { Board, Stage, Task } from "../types/boardTypes";
import {
  deleteBoard,
  deleteStage,
  getBoard,
  getStages,
  getTasks,
} from "../utils/APIutils";
import { LoadingIndiacator } from "../components/common/LoadingIndicator";
import { DeleteIcon, EditIcon, PlusIcon } from "../AppIcons/appIcons";
import Modal from "../components/common/Modal";
import CreateStage from "./CreateStage";
import { DragDropContext } from "react-beautiful-dnd";
import { StageCard } from "../components/StageCard";
import CreateTask from "./CreateTask";
import { navigate } from "raviger";
import EditBoard from "./EditBoard";
import EditStage from "./EditStage";

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
  const [editBoard, setEditBoard] = useState(false);
  const [editStage, setEditStage] = useState(false);

  const showAddTaskModal = (stageID: number) => {
    setStageID(stageID);
    setNewTask(true);
  };

  const showEditTaskModal = (stageID: number) => {
    setStageID(stageID);
    setEditStage(true);
  };

  const addTaskToGlobal = (task: Task) => {
    setTasks((tasks) => [...tasks, task]);
  };

  const deleteCurrentBoard = async () => {
    await deleteBoard(id);
    navigate("/boards");
  };

  const deleteCurrentStage = (stageID: number) => {
    deleteStage(stageID);
    setStages((stages) => stages.filter((stage) => stage.id !== stageID));
  };

  const updateBoardCB = (board: Board) => {
    setBoard((originalBoard) => {
      return {
        ...originalBoard,
        title: board.title,
        description: board.description,
      };
    });
    setEditBoard(false);
  };

  const updateStageCB = (stage: Stage) => {
    setStages((stages) => {
      return stages.map((prevStage) => {
        if (prevStage.id === stageID) {
          return stage;
        } else {
          return prevStage;
        }
      });
    });
    setEditStage(false);
  };

  useEffect(() => fetchBoardData(id, setBoard, setStages, setTasks), [id]);

  return board.id ? (
    <div className="my-4 ml-4 mr-8  text-slate-200">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="font-bold font-Montserrat text-3xl">{board.title}</h2>
          <p className="font-light">{board.description}</p>
        </div>
        <div>
          <button
            onClick={() => setEditBoard(true)}
            className="transition-all flex gap-1 items-center text-blue-300 hover:text-blue-500"
          >
            <EditIcon className="w-4 h-4" />
            <span>Edit board</span>
          </button>
          <button
            onClick={deleteCurrentBoard}
            className="transition-all flex gap-1 items-center text-red-300 hover:text-red-500"
          >
            <DeleteIcon className="w-4 h-4" />
            <span>Delete board</span>
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center my-4">
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
                addTaskToStage={showAddTaskModal}
                editStage={showEditTaskModal}
                deleteStage={deleteCurrentStage}
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
      <Modal open={editBoard} closeCB={() => setEditBoard(false)}>
        <EditBoard prevBoard={board} updateBoardCB={updateBoardCB} />
      </Modal>
      <Modal open={editStage} closeCB={() => setEditStage(false)}>
        <EditStage
          prevStage={stages.filter((stage) => stage.id === stageID)[0]}
          updateStageCB={updateStageCB}
        />
      </Modal>
    </div>
  ) : (
    <LoadingIndiacator />
  );
};
