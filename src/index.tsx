import * as React from "react";
import * as ReactDOM from "react-dom";

import { compose } from "redux";
import { StoreContext } from "redux-react-hook";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Routes from "./startup/Routes";
import createStore from "./startup/store";
import useFontAwesome from "./startup/useFontAwesome";

import { ThemeContextProvider } from "./lib/theme";
import { CustomRouter } from "./lib/useRouter";

import createHistory from "history/createBrowserHistory";
import { ConfigProvider } from "./startup/config";
export const history = createHistory();

import "react-table/react-table.css";
import "./styles/main.css";
import { AuthorisationContextProvider } from "./startup/Authorisation";
import { AuthenticationContextProvider } from "./startup/Authentication";

const DndRoutes = compose(DragDropContext(HTML5Backend))(Routes);

const store = createStore();

const App: React.FunctionComponent = () => {
  useFontAwesome();
  return (
    <StoreContext.Provider value={store}>
      <ConfigProvider>
        <AuthenticationContextProvider>
          <AuthorisationContextProvider>
            <ThemeContextProvider>
              <CustomRouter history={history}>
                <DndRoutes />
              </CustomRouter>
            </ThemeContextProvider>
          </AuthorisationContextProvider>
        </AuthenticationContextProvider>
      </ConfigProvider>
    </StoreContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
