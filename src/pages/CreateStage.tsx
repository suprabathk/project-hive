import React, { useState } from "react";
import { Errors, validateStage, Stage } from "../types/boardTypes";
import { createStage } from "../utils/APIutils";
import { LoadingIndiacator } from "../components/common/LoadingIndicator";

export default function CreateStage({
  addStage,
}: {
  addStage: (stage: Stage) => void;
}) {
  const [stage, setStage] = useState<Stage>({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<Errors<Stage>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setStage({ ...stage, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateStage(stage);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const { id } = await createStage(stage);
        addStage({ ...stage, id: id });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-200 font-extrabold">
        Add new stage
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
                value={stage.title}
                onChange={handleChange}
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
                value={stage.description}
                onChange={handleChange}
                className="rounded-none outline-none border block flex-1 min-w-0 w-full text-sm p-2.5 rounded-b-md bg-[#141418] border-gray-400 placeholder-gray-400 text-gray-200 focus:ring-0"
              />
            </div>
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>
          <button
            type="submit"
            className="px-3 py-1 text-md font-semibold border rounded-md w-full text-center bg-[#212128] text-gray-200 border-gray-400"
          >
            Add new stage
          </button>
        </form>
      )}
    </div>
  );
}
