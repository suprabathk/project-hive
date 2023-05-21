import { Board } from "../types/boardTypes";

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
          .map((key, value) => `${key}=${value}`)
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

export const getBoards = () => {
  return request("boards/", "GET");
};

export const getBoard = (id: number) => {
  return request(`boards/${id}/`, "GET");
};

export const createBoard = (board: Board) => {
  return request("boards/", "POST", board);
};
