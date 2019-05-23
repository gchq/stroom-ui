import * as React from "react";
import { pipe } from "ramda";
import { RenderFunction } from "@storybook/react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import StoryRouter from "storybook-react-router";
import * as ReactModal from "react-modal";

import { useTestServer } from "./PollyDecorator";

import setupFontAwesome from "lib/setupFontAwesome";
import testData from "../data";
import { ThemeContextProvider } from "lib/useTheme/useTheme";
import { withRouter, RouteComponentProps } from "react-router";
import { CustomRouter } from "lib/useRouter";
import ConfigProvider from "startup/config/ConfigProvider";
import { AuthorisationContextProvider } from "startup/Authorisation";
import { AuthenticationContext } from "startup/Authentication";
import { DocumentTreeContextProvider } from "components/DocumentEditors/api/explorer";
import { ErrorReportingContextProvider } from "components/ErrorPage";
import CurrentActivityContextProvider from "components/Activity/api/CurrentActivityContextProvider";

const RouteWrapper: React.StatelessComponent<RouteComponentProps> = ({
  children,
  history,
}) => {
  useTestServer(testData);
  return <CustomRouter history={history}>{children}</CustomRouter>;
};
const DragDropRouted = pipe(
  DragDropContext(HTML5Backend),
  withRouter,
)(RouteWrapper);

ReactModal.setAppElement("#root");

setupFontAwesome();

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
                  <CurrentActivityContextProvider>
                    {storyFn()}
                  </CurrentActivityContextProvider>
                </DocumentTreeContextProvider>
              </DragDropRouted>
            </ThemeContextProvider>
          </AuthorisationContextProvider>
        </AuthenticationContext.Provider>
      </ConfigProvider>
    </ErrorReportingContextProvider>
  ));
