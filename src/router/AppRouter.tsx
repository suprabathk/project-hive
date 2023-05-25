import { Redirect, useRoutes } from "raviger";
import { User } from "../types/userTypes";
import { Suspense, lazy } from "react";
import { LoadingIndiacator } from "../components/common/LoadingIndicator";

const Boards = lazy(() => import("../pages/Boards"));
const BoardPage = lazy(() => import("../pages/BoardPage"));
const ToDo = lazy(() => import("../pages/ToDo"));
const Page404 = lazy(() => import("../pages/Page404"));

export default function AppRouter({ currentUser }: { currentUser: User }) {
  const routes = {
    "/": () => <Redirect to="/boards" />,
    "/signin": () => <Redirect to="/" />,
    "/signup": () => <Redirect to="/" />,
    "/boards": () => (
      <Suspense fallback={<LoadingIndiacator />}>
        <Boards currentUser={currentUser} />
      </Suspense>
    ),
    "/boards/:id": ({ id }: { id: string }) => (
      <Suspense fallback={<LoadingIndiacator />}>
        <BoardPage id={Number(id)} />
      </Suspense>
    ),
    "/todos": () => (
      <Suspense fallback={<LoadingIndiacator />}>
        <ToDo />
      </Suspense>
    ),
  };
  let routeResult = useRoutes(routes) || (
    <Suspense fallback={<LoadingIndiacator />}>
      <Page404 />;
    </Suspense>
  );
  return routeResult;
}
