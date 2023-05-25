import React, { useEffect, useState } from "react";
import { Board, Stage, Task } from "../types/boardTypes";
import {
  deleteBoard,
  deleteStage,
  deleteTask,
  getBoard,
  getStages,
  getTasks,
  moveTask,
} from "../utils/APIutils";
import { LoadingIndiacator } from "../components/common/LoadingIndicator";
import {
  DeleteIcon,
  DownArrow,
  EditIcon,
  PlusIcon,
} from "../AppIcons/appIcons";
import Modal from "../components/common/Modal";
import CreateStage from "./CreateStage";
import { DragDropContext } from "react-beautiful-dnd";
import { StageCard } from "../components/StageCard";
import CreateTask from "./CreateTask";
import { navigate } from "raviger";
import EditBoard from "./EditBoard";
import EditStage from "./EditStage";
import EditTask from "./EditTask";
import DeleteBoard from "./DeleteBoard";
import DeleteStage from "./DeleteStage";
import { FirstBoardIllustration } from "../AppIcons/illustrations";
import DeleteTask from "./DeleteTask";

const fetchBoardData = (
  id: number,
  setBoard: (board: Board) => void,
  setStages: (stages: Stage[]) => void,
  setTasks: (tasks: Task[]) => void
) => {
  if (Number.isNaN(id)) {
    navigate("/boards");
    return;
  }
  getStages().then((data) => setStages(data.results));
  getBoard(id).then((data) => {
    if (!data) {
      navigate("/boards");
      return;
    } else setBoard(data);
  });
  getTasks(id).then((data) => {
    setTasks(data);
  });
};

const BoardPage = ({ id }: { id: number }) => {
  const [board, setBoard] = useState<Board>({
    title: "",
    description: "",
  });
  const [stages, setStages] = useState<Stage[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newStage, setNewStage] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [stageID, setStageID] = useState(0);
  const [taskID, setTaskID] = useState(0);
  const [editBoardModal, setEditBoardModal] = useState(false);
  const [editStageModal, setEditStageModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [deleteBoardModal, setDeleteBoardModal] = useState(false);
  const [deleteStageModal, setDeleteStageModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [lowFilter, setLowFilter] = useState(false);
  const [mediumFilter, setMediumFilter] = useState(false);
  const [highFilter, setHighFilter] = useState(false);
  const [overDueFilter, setOverDueFilter] = useState(false);
  const [dueTodayFilter, setDueTodayFilter] = useState(false);
  const [dueLaterFilter, setDueLaterFilter] = useState(false);

  const showAddTaskModal = (stageID: number) => {
    setStageID(stageID);
    setNewTask(true);
  };

  const showEditStageModal = (stageID: number) => {
    setStageID(stageID);
    setEditStageModal(true);
  };

  const showDeletStageModal = (stageID: number) => {
    setStageID(stageID);
    setDeleteStageModal(true);
  };

  const showEditTaskModal = (taskID: number) => {
    setTaskID(taskID);
    setEditTaskModal(true);
  };

  const addTaskToGlobal = (task: Task) => {
    setTasks((tasks) => [...tasks, task]);
    setNewTask(false);
  };

  const deleteCurrentBoard = async () => {
    await deleteBoard(id);
    navigate("/boards");
  };

  const deleteCurrentStage = async () => {
    await deleteStage(stageID);
    setStages((stages) => stages.filter((stage) => stage.id !== stageID));
    setDeleteStageModal(false);
  };

  const deleteCurrentTask = async () => {
    await deleteTask(taskID, id);
    setTasks((tasks) => tasks.filter((task) => task.id !== taskID));
    setDeleteTaskModal(false);
  };

  const updateBoardCB = (board: Board) => {
    setBoard((originalBoard) => {
      return {
        ...originalBoard,
        title: board.title,
        description: board.description,
      };
    });
    setEditBoardModal(false);
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
    setEditStageModal(false);
  };

  const updateTaskCB = (task: Task) => {
    setTasks((tasks) => {
      return tasks.map((prevTask) => {
        if (prevTask.id === taskID) {
          return task;
        } else {
          return prevTask;
        }
      });
    });
    setEditTaskModal(false);
  };

  const addStageCB = (stage: Stage) => {
    setStages((stages) => [...stages, stage]);
    setNewStage(false);
  };

  const showDeleteTaskModal = async (stageID: number) => {
    setStageID(stageID);
    setEditTaskModal(false);
    setDeleteTaskModal(true);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return today.getTime() === date.getTime();
  };

  const isOverDue = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return today.getTime() > date.getTime();
  };

  const isDueLater = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return today.getTime() < date.getTime();
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
            onClick={() => setEditBoardModal(true)}
            className="transition-all flex gap-1 items-center text-blue-300 hover:text-blue-500"
          >
            <EditIcon className="w-4 h-4" />
            <span>Edit board</span>
          </button>
          <button
            onClick={() => setDeleteBoardModal(true)}
            className="transition-all flex gap-1 items-center text-red-300 hover:text-red-500"
          >
            <DeleteIcon className="w-4 h-4" />
            <span>Delete board</span>
          </button>
        </div>
      </div>

      <div className="flex justify-between items-start my-4">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="bg-[#212128] rounded-md items-center border-gray-400 border px-2 py-1 flex justify-between"
          >
            <span>Filter tasks</span>
            <DownArrow
              className={`w-4 transition-all h-4 ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`flex flex-col gap-2 ${
              showFilters ? "" : "invisible h-0"
            }`}
          >
            <div className="flex gap-2">
              <button
                onClick={() => setLowFilter((s) => !s)}
                className={`rounded-full px-2 ${
                  lowFilter
                    ? "bg-orange-800 text-orange-200"
                    : "bg-orange-200 text-orange-800"
                }`}
              >
                Low
              </button>
              <button
                onClick={() => setMediumFilter((s) => !s)}
                className={`rounded-full px-2 ${
                  mediumFilter
                    ? "bg-green-800 text-green-200"
                    : "bg-green-200 text-green-800"
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setHighFilter((s) => !s)}
                className={`rounded-full px-2 ${
                  highFilter
                    ? "bg-red-800 text-red-200"
                    : "bg-red-200 text-red-800"
                }`}
              >
                High
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setOverDueFilter((s) => !s)}
                className={`rounded-full px-2 ${
                  overDueFilter
                    ? "bg-red-800 text-red-200"
                    : "bg-red-200 text-red-800"
                }`}
              >
                Over due
              </button>
              <button
                onClick={() => setDueTodayFilter((s) => !s)}
                className={`rounded-full px-2 ${
                  dueTodayFilter
                    ? "bg-orange-800 text-orange-200"
                    : "bg-orange-200 text-orange-800"
                }`}
              >
                Due today
              </button>
              <button
                onClick={() => setDueLaterFilter((s) => !s)}
                className={`rounded-full px-2 ${
                  dueLaterFilter
                    ? "bg-green-800 text-green-200"
                    : "bg-green-200 text-green-800"
                }`}
              >
                Due later
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          onClick={() => setNewStage(true)}
          className="p-1.5 text-sm font-semibold h-fit border rounded-md text-center bg-[#212128] text-gray-200 border-gray-400 flex gap-1 items-center justify-center focus:outline-none"
        >
          <PlusIcon className={"w-4 h-4"} />
          <span>Add new stage</span>
        </button>
      </div>
      <DragDropContext
        onDragEnd={(result) => {
          const { destination, source, draggableId } = result;
          if (!destination) return;
          if (destination.droppableId === source.droppableId) return;
          moveTask(
            Number.parseInt(draggableId),
            id,
            Number.parseInt(destination.droppableId)
          );
          setTasks((tasks) =>
            tasks.map((task) => {
              if (task.id === Number.parseInt(draggableId)) {
                return {
                  ...task,
                  status: Number.parseInt(destination.droppableId),
                  status_object: {
                    id: Number.parseInt(destination.droppableId),
                  },
                };
              } else {
                return task;
              }
            })
          );
        }}
      >
        {stages.length > 0 ? (
          <div className="flex gap-2 flex-col sm:flex-row ">
            {stages.map((stage) => (
              <StageCard
                key={stage.id}
                stage={stage}
                tasks={tasks.filter(
                  (task) =>
                    task.status_object?.id === stage.id &&
                    (lowFilter || mediumFilter || highFilter
                      ? (lowFilter && task.description.priority === "Low") ||
                        (mediumFilter &&
                          task.description.priority === "Medium") ||
                        (highFilter && task.description.priority === "High")
                      : true) &&
                    (overDueFilter || dueTodayFilter || dueLaterFilter
                      ? (overDueFilter &&
                          isOverDue(new Date(task.description.dueDate))) ||
                        (dueTodayFilter &&
                          isToday(new Date(task.description.dueDate))) ||
                        (dueLaterFilter &&
                          isDueLater(new Date(task.description.dueDate)))
                      : true)
                )}
                showTaskModal={showEditTaskModal}
                addTaskToStage={showAddTaskModal}
                editStage={showEditStageModal}
                deleteStage={showDeletStageModal}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <FirstBoardIllustration className="w-48 h-96" />
            <div>
              <p className="text-gray-200 text-4xl mt-2 font-Montserrat">
                There are no stages currently
              </p>
              <p className="text-gray-200 mt-2 text-lg">
                Please start by creating your first stage!
              </p>
            </div>
          </div>
        )}
      </DragDropContext>

      <Modal open={newStage} closeCB={() => setNewStage(false)}>
        <CreateStage addStage={addStageCB} />
      </Modal>
      <Modal open={newTask} closeCB={() => setNewTask(false)}>
        <CreateTask boardID={id} statusID={stageID} addTask={addTaskToGlobal} />
      </Modal>
      <Modal open={editBoardModal} closeCB={() => setEditBoardModal(false)}>
        <EditBoard prevBoard={board} updateBoardCB={updateBoardCB} />
      </Modal>
      <Modal open={deleteBoardModal} closeCB={() => setDeleteBoardModal(false)}>
        <DeleteBoard deleteBoard={deleteCurrentBoard} />
      </Modal>
      <Modal open={deleteStageModal} closeCB={() => setDeleteStageModal(false)}>
        <DeleteStage deleteStage={deleteCurrentStage} />
      </Modal>
      <Modal open={deleteTaskModal} closeCB={() => setDeleteTaskModal(false)}>
        <DeleteTask deleteTask={deleteCurrentTask} />
      </Modal>
      <Modal open={editStageModal} closeCB={() => setEditStageModal(false)}>
        <EditStage
          prevStage={stages.filter((stage) => stage.id === stageID)[0]}
          updateStageCB={updateStageCB}
        />
      </Modal>
      <Modal
        open={editTaskModal && taskID !== 0}
        closeCB={() => setEditTaskModal(false)}
      >
        <EditTask
          prevTask={tasks.filter((task) => task.id === taskID)[0]}
          editTask={updateTaskCB}
          deleteTask={showDeleteTaskModal}
          boardID={id}
        />
      </Modal>
    </div>
  ) : (
    <LoadingIndiacator />
  );
};

export default BoardPage;
