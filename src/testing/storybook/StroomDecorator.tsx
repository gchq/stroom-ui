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

const RouteWrapper: React.StatelessComponent<Props> = ({
  children,
  history
}) => <CustomRouter history={history}>{children}</CustomRouter>;
const DragDropRouted = compose(
  DragDropContext(HTML5Backend),
  withRouter
)(RouteWrapper);

const ThemedComponent: React.StatelessComponent<{}> = ({ children }) => {
  const { theme } = useTheme();
  const { isReady } = useConfig();
  useFontAwesome();
  useTestServer(testData);

  if (!isReady) {
    return <Loader message="Waiting for config" />;
  }

  return <div className={`app-container ${theme}`}>{children}</div>;
};

const store = createStore();
export default (storyFn: RenderFunction) =>
  StoryRouter()(() => (
    <StoreContext.Provider value={store}>
      <ThemeContextProvider>
        <DragDropRouted>
          <ThemedComponent>{storyFn()}</ThemedComponent>
        </DragDropRouted>
      </ThemeContextProvider>
    </StoreContext.Provider>
  ));
