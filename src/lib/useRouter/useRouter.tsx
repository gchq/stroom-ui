import { useContext } from "react";
import { History, createBrowserHistory } from "history";
import { RouteProps } from "react-router";
import { RouterContext, HistoryContext } from "./BrowserRouter";

interface UseRouter {
  history: History;
  router: RouteProps;
}

const DEFAULT_HISTORY = createBrowserHistory();

export default function useRouter(): UseRouter {
  const router = useContext(RouterContext);
  const history = useContext(HistoryContext);

  return {
    router,
    history: history || DEFAULT_HISTORY
  };
}
