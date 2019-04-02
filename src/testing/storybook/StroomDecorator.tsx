import * as React from "react";
import { pipe } from "ramda";
import { RenderFunction } from "@storybook/react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import StoryRouter from "storybook-react-router";
import * as ReactModal from "react-modal";

import { useTestServer } from "./PollyDecorator";

import useFontAwesome from "src/lib/useFontAwesome/useFontAwesome";
import testData from "../data";
import { ThemeContextProvider, useTheme } from "src/lib/theme";
import { withRouter, RouteComponentProps } from "react-router";
import { CustomRouter } from "src/lib/useRouter";
import { ConfigProvider } from "src/startup/config";
import { AuthorisationContextProvider } from "src/startup/Authorisation";
import { AuthenticationContext } from "src/startup/Authentication";
import { DocumentTreeContextProvider } from "src/api/explorer";
import { ErrorReportingContextProvider } from "src/components/ErrorPage";

const RouteWrapper: React.StatelessComponent<RouteComponentProps> = ({
  children,
  history,
}) => <CustomRouter history={history}>{children}</CustomRouter>;
const DragDropRouted = pipe(
  DragDropContext(HTML5Backend),
  withRouter,
)(RouteWrapper);

const ThemedComponent: React.StatelessComponent<{}> = ({ children }) => {
  const { theme } = useTheme();
  useFontAwesome();
  useTestServer(testData);

  return <div className={`app-container ${theme}`}>{children}</div>;
};

ReactModal.setAppElement("#root");

export default (storyFn: RenderFunction) =>
  StoryRouter()(() => (
    <ErrorReportingContextProvider>
      <ConfigProvider>
        <AuthenticationContext.Provider
          value={{
            idToken: "PollyWannaCracker",
            setIdToken: () => {
              console.error(
                "Setting the idToken in storybook? This is most unexpected!",
              );
            },
          }}
        >
          <AuthorisationContextProvider>
            <ThemeContextProvider>
              <DragDropRouted>
                <DocumentTreeContextProvider>
                  <ThemedComponent>{storyFn()}</ThemedComponent>
                </DocumentTreeContextProvider>
              </DragDropRouted>
            </ThemeContextProvider>
          </AuthorisationContextProvider>
        </AuthenticationContext.Provider>
      </ConfigProvider>
    </ErrorReportingContextProvider>
  ));
