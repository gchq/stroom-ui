import * as React from "react";
import { Router, Route, RouteProps } from "react-router-dom";

import { History } from "history";

export const RouterContext = React.createContext<RouteProps>({});
export const HistoryContext = React.createContext<History | undefined>(
  undefined,
);

export interface ChromeContext {
  urlPrefix: string;
  setUrlPrefix: (i: string) => void;
}

export const DEFAULT_CHROME_MODE = "withChrome";

export const WithChromeContext = React.createContext<ChromeContext>({
  urlPrefix: DEFAULT_CHROME_MODE,
  setUrlPrefix: () =>
    console.error("Setting Include Chrome on Default Implementation"),
});

interface Props {
  history: History;
  children?: React.ReactNode;
}

const CustomRouter: React.FunctionComponent<Props> = ({
  history,
  children,
}) => {
  const [urlPrefix, setUrlPrefixRaw] = React.useState<string>(
    DEFAULT_CHROME_MODE,
  );

  const setUrlPrefix = React.useCallback(
    (_urlPrefix = DEFAULT_CHROME_MODE) => setUrlPrefixRaw(_urlPrefix),
    [setUrlPrefixRaw],
  );

  return (
    <Router history={history}>
      <Route>
        {routeProps => (
          <WithChromeContext.Provider
            value={{
              urlPrefix,
              setUrlPrefix,
            }}
          >
            <HistoryContext.Provider value={history}>
              <RouterContext.Provider value={routeProps}>
                {children}
              </RouterContext.Provider>
            </HistoryContext.Provider>
          </WithChromeContext.Provider>
        )}
      </Route>
    </Router>
  );
};

export default CustomRouter;
