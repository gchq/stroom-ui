import { useContext } from "react";
import { RouterContext, HistoryContext } from "./BrowserRouter";

export default function useRouter() {
  const router = useContext(RouterContext);
  const history = useContext(HistoryContext);

  if (!history) {
    throw new Error("Could not find history");
  }

  return {
    router,
    history,
  };
}
