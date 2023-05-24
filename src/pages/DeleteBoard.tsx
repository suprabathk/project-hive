import React, { useState } from "react";
import { LoadingIndiacator } from "../components/common/LoadingIndicator";

export default function DeleteBoard({
  deleteBoard,
}: {
  deleteBoard: () => void;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-200 font-extrabold">
        Delete board
      </h1>
      {loading ? (
        <LoadingIndiacator />
      ) : (
        <div className="py-4">
          <p className="font-Montserrat text-xl">
            Are you sure you want to delete the board?
          </p>
          <p className="text-red-400">This action cannot be undone</p>
          <button
            onClick={async () => {
              setLoading(true);
              await deleteBoard();
              setLoading(false);
            }}
            className="px-3 mt-4 py-1 text-md font-semibold rounded-md w-full text-center bg-red-500 text-gray-200"
          >
            Delete board
          </button>
        </div>
      )}
    </div>
  );
}
