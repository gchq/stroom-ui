import * as React from "react";
import * as ReactDOM from "react-dom";

import { toClass, compose } from "recompose";
import { StoreContext } from "redux-react-hook";
import { ConnectedRouter } from "react-router-redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Routes from "./startup/Routes";
import createStore from "./startup/store";
import useFontAwesome from "./startup/useFontAwesome";
import { history } from "./startup/middleware";
import { HistoryContext } from "./lib/useHistory";

import "./styles/main.css";
import { ThemeContextProvider } from "./lib/theme";

const DndRoutes = compose(
  DragDropContext(HTML5Backend),
  toClass
)(Routes);

const store = createStore();

const App: React.FunctionComponent = () => {
  useFontAwesome();
  return (
    <StoreContext.Provider value={store}>
      <ThemeContextProvider>
        <ConnectedRouter history={history}>
          <HistoryContext.Provider value={history}>
            <DndRoutes />
          </HistoryContext.Provider>
        </ConnectedRouter>
      </ThemeContextProvider>
    </StoreContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
