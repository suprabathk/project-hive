import { Redirect, useRoutes } from "raviger";
import { Home } from "../pages/Home";
import Page404 from "../pages/Page404";
import { Boards } from "../pages/Boards";
import { ToDo } from "../pages/ToDo";
import { BoardPage } from "../pages/BoardPage";
import { User } from "../types/userTypes";

export default function AppRouter({ currentUser }: { currentUser: User }) {
  const routes = {
    "/": () => <Home currentUser={currentUser} />,
    "/login": () => <Redirect to="/" />,
    "/boards": () => <Boards />,
    "/boards/:id": ({ id }: { id: string }) => <BoardPage id={Number(id)} />,
    "/todos": () => <ToDo />,
  };
  let routeResult = useRoutes(routes) || <Page404 />;
  return routeResult;
}
