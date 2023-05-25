import React, { useState } from "react";
import { Errors, Board, validateBoard } from "../types/boardTypes";
import { updateBoard } from "../utils/APIutils";
import { ProjectHiveLogo } from "../AppIcons/appIcons";

export default function EditBoard({
  prevBoard,
  updateBoardCB,
}: {
  prevBoard: Board;
  updateBoardCB: (board: Board) => void;
}) {
  const [board, setBoard] = useState<Board>(prevBoard);
  const [errors, setErrors] = useState<Errors<Board>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setBoard({ ...board, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateBoard(board);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        board.id && (await updateBoard(board.id, board));
        updateBoardCB(board);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-200 font-extrabold">Edit board</h1>

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
              value={board.title}
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
              value={board.description}
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
          {loading ? (
            <div className="flex gap-2 items-center justify-center">
              <ProjectHiveLogo className="w-5 h-5 stroke-white animate-spin ease-out" />
              <span>Saving board...</span>
            </div>
          ) : (
            "Save board"
          )}
        </button>
      </form>
    </div>
  );
}
