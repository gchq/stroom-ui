// a comment xxxx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Routes from './startup/Routes';
import useFontAwesome from './startup/useFontAwesome';

import { ThemeContextProvider } from './lib/theme';
import { CustomRouter } from './lib/useRouter';

import createHistory from 'history/createBrowserHistory';
import { ConfigProvider } from './startup/config';
export const history = createHistory();

import 'react-table/react-table.css';
import './styles/main.css';
import { AuthorisationContextProvider } from './startup/Authorisation';
import { AuthenticationContextProvider } from './startup/Authentication';
import { DocumentTreeContextProvider } from './api/explorer';
import { ErrorReportingContextProvider } from './components/ErrorPage';

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

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
