import { Board, Stage, Task, unparsedTask } from "../types/boardTypes";
import { PaginationParams } from "../types/common";

const API_BASE_URL = "https://reactforall.onrender.com/api/";

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: object = {}
) => {
  let url: string;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.entries(data)
          .map((entry) => `${entry[0]}=${entry[1]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  // Token Auth
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + token : "";
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? payload : null,
  });
  try {
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      throw Error(json);
    }
  } catch (err) {
    console.log();
  }
};

export const login = (username: string, password: string) => {
  return request("auth-token/", "POST", { username, password });
};

export const me = () => {
  return request("users/me/", "GET", {});
};

export const getBoards = (pageParams?: PaginationParams) => {
  return request("boards/", "GET", pageParams);
};

export const getBoard = (id: number) => {
  return request(`boards/${id}/`, "GET");
};

export const createBoard = (board: Board) => {
  return request("boards/", "POST", board);
};

export const deleteBoard = (boardID: number) => {
  return request(`boards/${boardID}/`, "DELETE");
};

export const updateBoard = (boardID: number, board: Partial<Board>) => {
  return request(`boards/${boardID}/`, "PATCH", board);
};

export const getStages = () => {
  return request("status/", "GET");
};

export const createStage = (stage: Stage) => {
  return request("status/", "POST", stage);
};

export const deleteStage = (stageID: number) => {
  return request(`status/${stageID}/`, "DELETE");
};

export const updateStage = (stage: Stage) => {
  return request(`status/${stage.id}/`, "PATCH", stage);
};

export const createTask = (boardID: number, task: Task) => {
  const stringifiedTask = {
    ...task,
    description: JSON.stringify(task.description),
  };
  return request(`boards/${boardID}/tasks/`, "POST", stringifiedTask);
};

export const getTasks = async (boardID: number) => {
  const { results }: { results: unparsedTask[] } = await request(
    `boards/${boardID}/tasks/`,
    "GET"
  );
  return results.map((task) => {
    return {
      ...task,
      description: JSON.parse(task.description),
    };
  });
};

export const updateTask = (boardID: number, task: Task) => {
  const stringifiedTask = {
    ...task,
    description: JSON.stringify(task.description),
  };
  return request(
    `boards/${boardID}/tasks/${task.id}/`,
    "PATCH",
    stringifiedTask
  );
};

export const moveTask = (taskID: number, boardID: number, statusID: number) => {
  return request(`boards/${boardID}/tasks/${taskID}/`, "PATCH", {
    status: statusID,
  });
};
