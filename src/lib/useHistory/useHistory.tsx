import * as React from "react";
import { createContext, useContext } from "react";
import { history } from "../../startup/middleware";
import { History } from "history";

export const HistoryContext: React.Context<History> = createContext(history);

export const useHistory = (): History => {
  return useContext(HistoryContext);
};
