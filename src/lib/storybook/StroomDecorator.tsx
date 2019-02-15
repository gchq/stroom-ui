import * as React from "react";
import { compose } from "recompose";
import { RenderFunction } from "@storybook/react";
import { Provider } from "react-redux";
import { StoreContext } from "redux-react-hook";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import StoryRouter from "storybook-react-router";

import createStore from "../../startup/store";

import { setupTestServer } from "../../lib/storybook/PollyDecorator";

import FontAwesomeProvider from "../../startup/FontAwesomeProvider";
import testData from "./fullTestData";
import { ThemeContextProvider, useTheme } from "../theme";
import { withRouter, RouteComponentProps } from "react-router";
import { HistoryContext } from "../useHistory";

interface Props extends RouteComponentProps {}

const enhanceLocal = compose(
  setupTestServer(testData),
  DragDropContext(HTML5Backend),
  FontAwesomeProvider,
  withRouter
);

const store = createStore();

const WrappedComponent: React.StatelessComponent<Props> = props => {
  const { theme } = useTheme();

  return (
    <HistoryContext.Provider value={props.history}>
      {" "}
      <div className={`app-container ${theme}`}>{props.children}</div>
    </HistoryContext.Provider>
  );
};

const ThemedComponent = enhanceLocal(WrappedComponent);

export default (storyFn: RenderFunction) =>
  StoryRouter()(() => (
    <StoreContext.Provider value={store}>
      <Provider store={store}>
        <ThemeContextProvider>
          <ThemedComponent>{storyFn()}</ThemedComponent>
        </ThemeContextProvider>
      </Provider>
    </StoreContext.Provider>
  ));
