import * as React from "react";
import * as ReactDOM from "react-dom";

import {} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { Routes } from "src/components/AppChrome";
import useFontAwesome from "./lib/useFontAwesome/useFontAwesome";

import { ThemeContextProvider } from "./lib/theme";
import { CustomRouter } from "./lib/useRouter";

import createHistory from "history/createBrowserHistory";
import { ConfigProvider } from "src/startup/config";
export const history = createHistory();

import "react-table/react-table.css";
import "./styles/main.css";
import { AuthorisationContextProvider } from "src/startup/Authorisation";
import { AuthenticationContextProvider } from "src/startup/Authentication";
import { DocumentTreeContextProvider } from "src/api/explorer";
import { ErrorReportingContextProvider } from "src/components/ErrorPage";

const DndRoutes = DragDropContext(HTML5Backend)(Routes);

const App: React.FunctionComponent = () => {
  useFontAwesome();
  return (
    <ErrorReportingContextProvider>
      <ConfigProvider>
        <AuthenticationContextProvider>
          <AuthorisationContextProvider>
            <ThemeContextProvider>
              <CustomRouter history={history}>
                <DocumentTreeContextProvider>
                  <DndRoutes />
                </DocumentTreeContextProvider>
              </CustomRouter>
            </ThemeContextProvider>
          </AuthorisationContextProvider>
        </AuthenticationContextProvider>
      </ConfigProvider>
    </ErrorReportingContextProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
