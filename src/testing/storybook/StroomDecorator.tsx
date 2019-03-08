import * as React from "react";
import { compose } from "redux";
import { RenderFunction } from "@storybook/react";
import { StoreContext } from "redux-react-hook";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import StoryRouter from "storybook-react-router";

import createStore from "../../startup/store";

import { useTestServer } from "./PollyDecorator";

import useFontAwesome from "../../startup/useFontAwesome";
import testData from "../data";
import { ThemeContextProvider, useTheme } from "../../lib/theme";
import { withRouter, RouteComponentProps } from "react-router";
import { CustomRouter } from "../../lib/useRouter";
import useConfig from "../../startup/config/useConfig";
import Loader from "../../components/Loader";

interface Props extends RouteComponentProps {}

const enhanceLocal = compose(
  DragDropContext(HTML5Backend),
  withRouter
);

const store = createStore();

const WrappedComponent: React.StatelessComponent<Props> = ({
  history,
  children
}) => {
  const { theme } = useTheme();
  const { isReady } = useConfig();
  useFontAwesome();
  useTestServer(testData);

  if (!isReady) {
    return <Loader message="Waiting for config" />;
  }

  return (
    <CustomRouter>
      {" "}
      <div className={`app-container ${theme}`}>{children}</div>
    </CustomRouter>
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
