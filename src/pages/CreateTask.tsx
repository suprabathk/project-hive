import React, { useState } from "react";
import { Errors, Task, validateTask } from "../types/boardTypes";
import { createTask } from "../utils/APIutils";
import { LoadingIndiacator } from "../components/common/LoadingIndicator";

export default function CreateTask({
  boardID,
  statusID,
  addTask,
}: {
  boardID: number;
  statusID: number;
  addTask: (task: Task) => void;
}) {
  const [task, setTask] = useState<Task>({
    title: "",
    description: {
      priority: "Low",
      description: "",
      dueDate: "",
    },
    status: statusID,
    status_object: {
      id: statusID,
    },
  });
  const [errors, setErrors] = useState<Errors<Task>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateTask(task);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const { title, id, status_object } = await createTask(boardID, task);
        addTask({
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
      <h1 className="text-2xl my-2 text-gray-200 font-extrabold">
        Add new task
      </h1>
      {loading ? (
        <LoadingIndiacator />
      ) : (
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
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>
          <button
            type="submit"
            className="px-3 py-1 text-md font-semibold border rounded-md w-full text-center bg-[#212128] text-gray-200 border-gray-400"
          >
            Add new task
          </button>
        </form>
      )}
    </div>
  );
}
