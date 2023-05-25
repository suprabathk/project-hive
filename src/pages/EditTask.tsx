import React, { useState } from "react";
import { Errors, Task, validateTask } from "../types/boardTypes";
import { updateTask } from "../utils/APIutils";
import { ProjectHiveLogo } from "../AppIcons/appIcons";

export default function EditTask({
  boardID,
  editTask,
  prevTask,
  deleteTask,
}: {
  boardID: number;
  editTask: (task: Task) => void;
  deleteTask: (taskID: number) => void;
  prevTask: Task;
}) {
  const [task, setTask] = useState<Task>(prevTask);
  const [errors, setErrors] = useState<Errors<Task>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateTask(task);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const { title, id, status_object } =
          task.status_object?.id &&
          (await updateTask(boardID, {
            title: task.title,
            description: task.description,
            id: task.id,
            status: task.status_object.id,
            status_object: {
              id: task.status_object?.id,
            },
          }));
        editTask({
          title: title,
          description: task.description,
          id: id,
          status: status_object.id,
          status_object: {
            id: status_object.id,
          },
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-200 font-extrabold">Edit task</h1>

      <form className="py-4" onSubmit={handleSubmit}>
        <div className="w-full mb-6">
          <div className="flex mt-2">
            <span className="inline-flex items-center px-3 text-md font-semibold border border-r-0 rounded-l-md bg-[#212128] text-gray-200 border-gray-400">
              Title
            </span>
            <input
              type="text"
              name="title"
              id="title"
              value={task.title}
              onChange={(event) =>
                setTask((task) => {
                  return {
                    ...task,
                    title: event.target.value,
                  };
                })
              }
              className="rounded-none outline-none border block flex-1 min-w-0 w-full text-sm p-2.5 rounded-r-md bg-[#141418] border-gray-400 placeholder-gray-200 text-gray-200 focus:ring-0"
            />
          </div>
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="w-full mb-6">
          <div className="flex flex-col mt-2">
            <span className="inline-flex items-center px-3 text-md font-semibold border border-b-0 rounded-t-md bg-[#212128] text-gray-200 border-gray-400">
              Description
            </span>
            <textarea
              name="description"
              id="description"
              value={task.description.description}
              onChange={(event) =>
                setTask((task) => {
                  return {
                    ...task,
                    description: {
                      ...task.description,
                      description: event.target.value,
                    },
                  };
                })
              }
              className="rounded-none outline-none border block flex-1 min-w-0 w-full text-sm p-2.5 rounded-b-md bg-[#141418] border-gray-400 placeholder-gray-400 text-gray-200 focus:ring-0"
            />
          </div>
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="w-full mb-6">
          <div className="flex mt-2">
            <span className="inline-flex items-center px-3 text-md font-semibold border border-r-0 rounded-l-md bg-[#212128] text-gray-200 border-gray-400">
              Priority
            </span>
            <select
              name="title"
              id="title"
              value={task.description.priority}
              onChange={(event) =>
                setTask({
                  ...task,
                  description: {
                    ...task.description,
                    priority: event.target
                      .value as Task["description"]["priority"],
                  },
                })
              }
              className="rounded-none outline-none border block flex-1 min-w-0 w-full text-sm p-2.5 rounded-r-md bg-[#141418] border-gray-400 placeholder-gray-200 text-gray-200 focus:ring-0"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        <div className="w-full mb-6">
          <div className="flex mt-2">
            <span className="inline-flex items-center px-3 text-md font-semibold border border-r-0 rounded-l-md bg-[#212128] text-gray-200 border-gray-400">
              Due date
            </span>
            <input
              type="date"
              name="date"
              id="date"
              required
              value={task.description.dueDate}
              onChange={(event) =>
                setTask((task) => {
                  return {
                    ...task,
                    description: {
                      ...task.description,
                      dueDate: event.target.value,
                    },
                  };
                })
              }
              className="rounded-none outline-none border block flex-1 min-w-0 w-full text-sm p-2.5 rounded-r-md bg-[#141418] border-gray-400 placeholder-gray-200 text-gray-200 focus:ring-0"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-3 py-1 text-md font-semibold border rounded-md w-full text-center bg-[#212128] text-gray-200 border-gray-400"
        >
          {loading ? (
            <div className="flex gap-2 items-center justify-center">
              <ProjectHiveLogo className="w-5 h-5 stroke-white animate-spin ease-out" />
              <span>Saving task...</span>
            </div>
          ) : (
            "Save task"
          )}
        </button>
        <button
          onClick={() => task.id && deleteTask(task.id)}
          className="px-3 mt-4 py-1 text-md font-semibold rounded-md w-full text-center bg-red-500 text-gray-200"
        >
          Delete task
        </button>
      </form>
    </div>
  );
}
