import React, { useEffect, useState } from "react";
import { Board } from "../types/boardTypes";
import { getBoard } from "../utils/APIutils";
import { LoadingIndiacator } from "../components/common/LoadingIndicator";

const fetchBoard = (id: number, setBoard: (board: Board) => void) => {
  getBoard(id).then((data) => setBoard(data));
};

export const BoardPage = ({ id }: { id: number }) => {
  const [board, setBoard] = useState<Board>({
    title: "",
    description: "",
  });
  useEffect(() => fetchBoard(id, setBoard), [id]);
  return board.id ? (
    <div>
      <div className="my-4 ml-4 mr-8 text-slate-200">
        <h3 className="font-bold font-Montserrat text-3xl ">{board.title}</h3>
        <p className="font-light">{board.description}</p>
      </div>
    </div>
  ) : (
    <LoadingIndiacator />
  );
};
