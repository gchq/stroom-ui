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

import { Route, Switch } from "react-router-dom";

// TODO
import ErrorPage from "../components/ErrorPage";
import { appChromeRoutes } from "../components/AppChrome";
// import { Processing } from "../sections/Processing";
import { HandleAuthenticationResponse } from "./Authentication";

import useConfig from "./config/useConfig";

import { PrivateRoute } from "./Authentication";
import PathNotFound from "../components/PathNotFound";
import Welcome from "../components/Welcome";

const Routes: React.FunctionComponent = () => {
  const { authenticationServiceUrl, authorisationServiceUrl } = useConfig();

  return (
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

      <Route exact path="/openWelcome" component={Welcome} />

      {appChromeRoutes.map((p, i) => (
        <PrivateRoute key={i} {...p} />
      ))}

      {/* Default route */}
      <Route render={() => <PathNotFound message="Invalid path" />} />
    </Switch>
  );
};

export default Routes;
