import * as React from "react";
import { compose } from "recompose";
import { RenderFunction } from "@storybook/react";
import { StoreContext } from "redux-react-hook";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import StoryRouter from "storybook-react-router";

import createStore from "../../startup/store";

import { useTestServer } from "../../lib/storybook/PollyDecorator";

import FontAwesomeProvider from "../../startup/FontAwesomeProvider";
import testData from "./fullTestData";
import { ThemeContextProvider, useTheme } from "../theme";
import { withRouter, RouteComponentProps } from "react-router";
import { HistoryContext } from "../useHistory";
import useConfig from "../../startup/useConfig";
import Loader from "../../components/Loader";

interface Props extends RouteComponentProps {}

const enhanceLocal = compose(
  DragDropContext(HTML5Backend),
  FontAwesomeProvider,
  withRouter
);

const store = createStore();

const WrappedComponent: React.StatelessComponent<Props> = props => {
  const { theme } = useTheme();
  const { isReady } = useConfig();
  useTestServer(testData);

  if (!isReady) {
    return <Loader message="Waiting for config" />;
  }

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
      <ThemeContextProvider>
        <ThemedComponent>{storyFn()}</ThemedComponent>
      </ThemeContextProvider>
    </StoreContext.Provider>
  ));
