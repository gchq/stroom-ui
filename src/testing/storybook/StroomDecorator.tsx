import * as React from "react";
import { compose } from "redux";
import { RenderFunction } from "@storybook/react";
import { StoreContext } from "redux-react-hook";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import StoryRouter from "storybook-react-router";
import * as ReactModal from "react-modal";

import createStore from "../../startup/store";

import { useTestServer } from "./PollyDecorator";

import useFontAwesome from "../../startup/useFontAwesome";
import testData from "../data";
import { ThemeContextProvider, useTheme } from "../../styled/theme";
import { withRouter, RouteComponentProps } from "react-router";
import { CustomRouter } from "../../lib/useRouter";
import { ConfigProvider } from "../../startup/config";
import GlobalStyle from "../../styled/GlobalStyle";

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
  useFontAwesome();
  useTestServer(testData);

  return (
    <div className={`app-container ${theme}`}>
      <GlobalStyle /> {children}
    </div>
  );
};

ReactModal.setAppElement("#root");

const store = createStore();
export default (storyFn: RenderFunction) =>
  StoryRouter()(() => (
    <StoreContext.Provider value={store}>
      <ConfigProvider>
        <ThemeContextProvider>
          <DragDropRouted>
            <ThemedComponent>{storyFn()}</ThemedComponent>
          </DragDropRouted>
        </ThemeContextProvider>
      </ConfigProvider>
    </StoreContext.Provider>
  ));
