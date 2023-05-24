import { useRoutes } from "raviger";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

export default function SessionRouter() {
  const routes = {
    "/signin": () => <SignIn />,
    "/signup": () => <SignUp />,
  };
  let routeResult = useRoutes(routes) || <SignIn />;
  return routeResult;
}
