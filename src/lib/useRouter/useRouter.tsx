import * as React from "react";
import { RouterContext, HistoryContext } from "./BrowserRouter";

export default function useRouter() {
  const router = React.useContext(RouterContext);
  const history = React.useContext(HistoryContext);

  if (!history) {
    throw new Error("Could not find history");
  }

  return {
    router,
    history,
  };
}
