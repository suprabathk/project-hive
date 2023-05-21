import { Redirect, useRoutes } from "raviger";
import { Home } from "../pages/Home";
import Page404 from "../pages/Page404";

export default function AppRouter() {
  const routes = {
    "/": () => <Home />,
    "/login": () => <Redirect to="/" />,
  };
  let routeResult = useRoutes(routes) || <Page404 />;
  return routeResult;
}
