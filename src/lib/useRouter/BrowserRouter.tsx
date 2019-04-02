import * as React from "react";
import { Router, Route, RouteProps } from "react-router-dom";

import { History } from "history";

export const RouterContext = React.createContext<RouteProps>({});
export const HistoryContext = React.createContext<History | undefined>(
  undefined,
);

interface Props {
  history: History;
  children?: React.ReactNode;
}

const CustomRouter: React.FunctionComponent<Props> = ({
  history,
  children,
}) => (
  <Router history={history}>
    <Route>
      {routeProps => (
        <HistoryContext.Provider value={history}>
          <RouterContext.Provider value={routeProps}>
            {children}
          </RouterContext.Provider>
        </HistoryContext.Provider>
      )}
    </Route>
  </Router>
);

export default CustomRouter;
