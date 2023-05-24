import React, { useEffect, useState } from "react";
import { me } from "./utils/APIutils";
import { User } from "./types/userTypes";
import SessionRouter from "./router/SessionRouter";
import AppRouter from "./router/AppRouter";
import { AppContainer } from "./components/AppContainer";

const getCurrentUser = async (setCurrentUser: (currentUser: User) => void) => {
  const currentUser = await me();
  if (!currentUser || currentUser.username === "") {
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
  return (
    <div className="selection:text-white selection:bg-purple-400">
      {currentUser.username && currentUser.username?.length > 0 ? (
        <AppContainer>
          <AppRouter currentUser={currentUser} />
        </AppContainer>
      ) : (
        <SessionRouter />
      )}
    </div>
  );
}

export default App;
