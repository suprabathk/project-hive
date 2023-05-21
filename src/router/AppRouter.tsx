import { Redirect, useRoutes } from "raviger";
import { Home } from "../pages/Home";
import Page404 from "../pages/Page404";
import { Boards } from "../pages/Boards";
import { ToDo } from "../pages/ToDo";

export default function AppRouter() {
  const routes = {
    "/": () => <Home />,
    "/login": () => <Redirect to="/" />,
    "/boards": () => <Boards />,
    "/todos": () => <ToDo />,
  };
  let routeResult = useRoutes(routes) || <Page404 />;
  return routeResult;
}
