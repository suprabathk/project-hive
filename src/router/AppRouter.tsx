import { Redirect, useRoutes } from "raviger";
import Page404 from "../pages/Page404";
import { Boards } from "../pages/Boards";
import { ToDo } from "../pages/ToDo";
import { BoardPage } from "../pages/BoardPage";
import { User } from "../types/userTypes";

export default function AppRouter({ currentUser }: { currentUser: User }) {
  const routes = {
    "/": () => <Redirect to="/boards" />,
    "/signin": () => <Redirect to="/" />,
    "/boards": () => <Boards currentUser={currentUser} />,
    "/boards/:id": ({ id }: { id: string }) => <BoardPage id={Number(id)} />,
    "/todos": () => <ToDo />,
  };
  let routeResult = useRoutes(routes) || <Page404 />;
  return routeResult;
}
