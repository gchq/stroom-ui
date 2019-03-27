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

import { Route, Switch, RouteComponentProps } from "react-router-dom";

import ErrorPage from "../components/ErrorPage";
import { HandleAuthenticationResponse } from "./Authentication";

import { PrivateRoute } from "./Authentication";
import PathNotFound from "../components/PathNotFound";
import Welcome from "../components/Welcome";

import AppChrome from "../components/AppChrome";
import { Processing } from "../components/Processing";
import SwitchedDocRefEditor from "../components/SwitchedDocRefEditor";
import IconHeader from "../components/IconHeader";
import DataViewer from "../components/DataViewer";
import UserSettings from "../components/UserSettings";
import IFrame from "../components/IFrame";

import AuthorisationManager, {
  UserAuthorisationEditor
} from "../components/AuthorisationManager";
import IndexVolumes from "../components/IndexVolumes";
import IndexVolumeGroups from "../components/IndexVolumeGroups";
import IndexVolumeGroupEditor from "../components/IndexVolumeGroups/IndexVolumeGroupEditor";
import { useConfig } from "./config";
import DocumentPermissionEditor from "../components/AuthorisationManager/DocumentPermissionEditor";
import DocumentPermissionForUserEditor from "../components/AuthorisationManager/DocumentPermissionForUserEditor";
import IndexVolumeEditor from "../components/IndexVolumes/IndexVolumeEditor";
import { IsGroup } from "../api/userGroups";

const renderWelcome = () => (
  <AppChrome activeMenuItem="Welcome" content={<Welcome />} />
);

const UsersIFrame = () => {
  const { authUsersUiUrl } = useConfig();

  return (
    <React.Fragment>
      <IconHeader icon="users" text="Users" />
      {authUsersUiUrl ? (
        <IFrame key="users" url={authUsersUiUrl} />
      ) : (
        <div>No Users URL in Config</div>
      )}
    </React.Fragment>
  );
};

const ApiTokensIFrame = () => {
  const { authTokensUiUrl } = useConfig();

  return (
    <React.Fragment>
      <IconHeader icon="key" text="API keys" />
      {authTokensUiUrl ? (
        <IFrame key="apikeys" url={authTokensUiUrl} />
      ) : (
        <div>No Api Keys URL in Config</div>
      )}
    </React.Fragment>
  );
};

const Routes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route
        exact
        path="/handleAuthenticationResponse"
        render={() => <HandleAuthenticationResponse />}
      />
      <Route exact path="/error" component={ErrorPage} />
      <Route exact path="/openWelcome" component={Welcome} />
      <PrivateRoute exact path="/" render={renderWelcome} />
      <PrivateRoute exact path="/s/welcome" render={renderWelcome} />
      <PrivateRoute
        exact
        path="/s/data"
        render={() => (
          <AppChrome activeMenuItem="Data" content={<DataViewer />} />
        )}
      />
      <PrivateRoute
        exact
        path="/s/processing"
        render={() => (
          <AppChrome activeMenuItem="Processing" content={<Processing />} />
        )}
      />
      <PrivateRoute
        exact
        path="/s/me"
        render={() => (
          <AppChrome activeMenuItem="Me" content={<UserSettings />} />
        )}
      />
      {(["Group", "User"] as Array<IsGroup>).map(isGroup => (
        <PrivateRoute
          key={isGroup}
          exact
          path={`/s/authorisationManager/${isGroup}`}
          render={() => (
            <AppChrome
              activeMenuItem={isGroup as string}
              content={<AuthorisationManager isGroup={isGroup} />}
            />
          )}
        />
      ))}

      <PrivateRoute
        exact
        path="/s/authorisationManager/:userUuid"
        render={(props: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="User Authorisation"
            content={
              <UserAuthorisationEditor userUuid={props.match.params.userUuid} />
            }
          />
        )}
      />
      <PrivateRoute
        exact
        path="/s/authorisationManager/document/:docRefUuid"
        render={(props: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="User Authorisation"
            content={
              <DocumentPermissionEditor
                docRefUuid={props.match.params.docRefUuid}
              />
            }
          />
        )}
      />
      <PrivateRoute
        exact
        path="/s/authorisationManager/document/:docRefUuid/:userUuid"
        render={(props: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="User Authorisation"
            content={
              <DocumentPermissionForUserEditor
                userUuid={props.match.params.userUuid}
                docRefUuid={props.match.params.docRefUuid}
              />
            }
          />
        )}
      />
      <PrivateRoute
        exact
        path="/s/indexing/volumes"
        render={() => (
          <AppChrome
            activeMenuItem="Index Volumes"
            content={<IndexVolumes />}
          />
        )}
      />
      <PrivateRoute
        exact
        path="/s/indexing/volumes/:volumeId"
        render={(props: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="Index Volumes"
            content={
              <IndexVolumeEditor volumeId={props.match.params.volumeId} />
            }
          />
        )}
      />
      <PrivateRoute
        exact
        path="/s/indexing/groups"
        render={() => (
          <AppChrome
            activeMenuItem="Index Groups"
            content={<IndexVolumeGroups />}
          />
        )}
      />
      <PrivateRoute
        exact
        path="/s/indexing/groups/:groupName"
        render={(props: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="Index Groups"
            content={
              <IndexVolumeGroupEditor
                groupName={props.match.params.groupName}
              />
            }
          />
        )}
      />
      <PrivateRoute
        exact
        path="/s/users"
        render={() => (
          <AppChrome activeMenuItem="Users" content={<UsersIFrame />} />
        )}
      />
      <PrivateRoute
        exact
        path="/s/apikeys"
        render={() => (
          <AppChrome activeMenuItem="API Keys" content={<ApiTokensIFrame />} />
        )}
      />
      <PrivateRoute
        exact
        path="/s/error"
        render={() => (
          <AppChrome activeMenuItem="Error" content={<ErrorPage />} />
        )}
      />
      <PrivateRoute
        exact
        path="/s/doc/:docRefUuid"
        render={(props: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="Explorer"
            content={
              <SwitchedDocRefEditor
                docRefUuid={props.match.params.docRefUuid}
              />
            }
          />
        )}
      />
      <PrivateRoute
        render={() => (
          <AppChrome activeMenuItem="Welcome" content={<PathNotFound />} />
        )}
      />
      {/* Default route */}
      <Route render={() => <PathNotFound message="Invalid path" />} />
    </Switch>
  );
};

export default Routes;
