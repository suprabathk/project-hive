import { useRoutes } from "raviger";
import { Login } from "../components/Login";

export default function SessionRouter() {
  const routes = {
    "/login": () => <Login />,
  };
  let routeResult = useRoutes(routes) || <Login />;
  return routeResult;
}
