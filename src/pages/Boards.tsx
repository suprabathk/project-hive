import { useEffect, useState } from "react";
import { Board } from "../types/boardTypes";
import { getBoards } from "../utils/APIutils";
import Modal from "../components/common/Modal";
import CreateBoard from "./CreateBoard";
import { navigate, useQueryParams } from "raviger";
import {
  LeftIcon,
  PlusIcon,
  RightIcon,
  SearchIcon,
} from "../AppIcons/appIcons";
import { LoadingIndiacator } from "../components/common/LoadingIndicator";

const fetchBoards = (
  setBoards: (boards: Board[]) => void,
  setLoading: (loading: boolean) => void,
  setCountCB: (count: number) => void,
  offset: number,
  limit: number
) => {
  getBoards({ offset: offset, limit: limit }).then((data) => {
    setCountCB(data.count);
    setBoards(data.results);
    setLoading(false);
  });
};

export const Boards = () => {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  const [boards, setBoards] = useState<Board[]>([]);
  const [newBoard, setNewBoard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const limit = 2;

  useEffect(
    () => fetchBoards(setBoards, setLoading, setCount, offset, limit),
    [offset]
  );
  return (
    <div className="my-4 ml-4 mr-8 text-slate-200">
      <h3 className="font-bold font-Montserrat text-3xl">My Boards</h3>
      <div className="flex justify-between items-center mt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setQuery({ search: searchString });
          }}
        >
          <div className="w-full">
            <div className="flex">
              <input
                type="text"
                id={"search"}
                value={searchString}
                name="search"
                onChange={(event) => setSearchString(event.target.value)}
                className="border outline-none block flex-1 min-w-0 w-full text-sm p-1.5 bg-[#141418] rounded-l-md border-gray-400 placeholder-gray-400 text-gray-400 focus:ring-transparent"
                placeholder="Search for board"
              />
              <button
                type="submit"
                className="inline-flex items-center px-3 text-sm border border-l-0 rounded-r-md bg-[#212128] text-gray-400 border-gray-400"
              >
                <SearchIcon className={"w-5 h-5"} />
                <span className="ml-2 font-semibold">Search</span>
              </button>
            </div>
          </div>
        </form>
        <button
          type="submit"
          onClick={() => setNewBoard(true)}
          className="p-1.5 text-sm font-semibold h-fit border rounded-md text-center bg-[#212128] text-gray-400 border-gray-400 flex gap-1 items-center focus:outline-none"
        >
          <PlusIcon className={"w-4 h-4"} />
          <span>Create board</span>
        </button>
      </div>
      {loading ? (
        <LoadingIndiacator />
      ) : (
        <div className="flex flex-col gap-2">
          <div className="mt-5">
            {boards.length > 0 ? (
              boards
                .filter((board) =>
                  board.title
                    .toLowerCase()
                    .includes(search?.toLowerCase() || "")
                )
                .map((board) => (
                  <button
                    key={board.id}
                    onClick={() => navigate(`/boards/${board.id}`)}
                    className="bg-[#212128] w-full text-left border border-gray-400 text-gray-400 rounded-md my-2 px-4 py-2 shadow-md cursor-pointer"
                  >
                    <span className="text-xl font-Lato font-bold text-gray-200">
                      {board.title}
                    </span>
                    <p className="font-light">{board.description}</p>
                  </button>
                ))
            ) : (
              <p className="text-gray-200 mt-2">There are no boards created!</p>
            )}
          </div>
          <div className="w-full pt-4">
            <div className="flex">
              <button
                onClick={() => {
                  setOffset((offset) => {
                    return offset - limit >= 0 ? offset - limit : offset;
                  });
                }}
                className="flex gap-2 items-center px-3 text-sm border border-r-0 rounded-l-md bg-[#212128] text-gray-200 border-gray-400"
              >
                <LeftIcon className="h-5 w-5" />
                <span className="font-semibold">Prev</span>
              </button>
              <div className="rounded-none border min-w-0 w-full text-sm p-2.5 bg-[#141418] border-gray-400 placeholder-gray-200 text-gray-200 focus:ring-gray-500 focus:border-gray-500">
                <p className="text-gray-200 text-center">
                  Showing <span className="font-medium">{offset + 1}</span> to{" "}
                  <span className="font-medium">
                    {offset + limit < count ? offset + limit : count}
                  </span>{" "}
                  of <span className="font-medium">{count}</span> results
                </p>
              </div>
              <button
                onClick={() => {
                  setOffset((offset) => {
                    return offset + limit < count ? offset + limit : offset;
                  });
                }}
                className="flex gap-2 items-center px-3 text-sm border border-l-0 rounded-r-md bg-[#212128] text-gray-200 border-gray-400"
              >
                <p className="font-semibold">Next</p>
                <RightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal open={newBoard} closeCB={() => setNewBoard(false)}>
        <CreateBoard />
      </Modal>
    </div>
  );
};
