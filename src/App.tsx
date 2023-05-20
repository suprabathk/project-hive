import React, { useEffect, useState } from "react";
import { me } from "./utils/APIutils";
import { User } from "./types/userTypes";
import SessionRouter from "./router/SessionRouter";

const getCurrentUser = async (setCurrentUser: (currentUser: User) => void) => {
  const currentUser = await me();
  if (currentUser.username === "") {
    localStorage.removeItem("token");
  }
  setCurrentUser(currentUser);
};

function App() {
  const [currentUser, setCurrentUser] = useState<User>({
    username: null,
    url: "",
    name: "",
  });
  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return currentUser.username && currentUser.username?.length > 0 ? (
    <div>Huhu</div>
  ) : (
    <SessionRouter />
  );
}

export default App;
