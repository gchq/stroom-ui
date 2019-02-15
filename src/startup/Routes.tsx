/*
 * Copyright 2018 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";

import { Route, Router, Switch } from "react-router-dom";

// TODO
import ErrorPage from "../components/ErrorPage";
import { appChromeRoutes } from "../sections/AppChrome";
// import { Processing } from "../sections/Processing";
import { HandleAuthenticationResponse } from "./Authentication";

import useConfig from "./useConfig";

import { PrivateRoute } from "./Authentication";
import PathNotFound from "../components/PathNotFound";
import useHistory from "src/lib/useHistory";
import Loader from "src/components/Loader";

const Routes = () => {
  const history = useHistory();
  const config = useConfig();

  if (!config.isReady) {
    return <Loader message="Configuration Loading" />;
  }

  const {
    values: { authenticationServiceUrl, authorisationServiceUrl }
  } = config;

  return (
    <Router history={history}>
      {/* basename="/"> TODO */}
      <Switch>
        <Route
          exact
          path="/handleAuthenticationResponse"
          render={() => (
            <HandleAuthenticationResponse
              authenticationServiceUrl={authenticationServiceUrl!}
              authorisationServiceUrl={authorisationServiceUrl!}
            />
          )}
        />

        <Route exact path="/error" component={ErrorPage} />

        {appChromeRoutes.map((p, i) => (
          <PrivateRoute key={i} {...p} />
        ))}

        {/* TODO Direct paths -- these paths make sections accessible outside the AppChrome
        i.e. for when we want to embed them in Stroom. */}
        {/* <PrivateRoute
        exact
        path="/trackers"
        referrer="/trackers"
        render={() => <Processing />}
      /> */}

        {/* Default route */}
        <Route render={() => <PathNotFound message="Invalid path" />} />
      </Switch>
    </Router>
  );
};

// Routes.contextTypes = {
//   store: PropTypes.object,
//   router: PropTypes.shape({
//     history: object.isRequired,
//   }),
// };

export default Routes;
