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
import { Route, Switch, RouteComponentProps } from "react-router";

import ErrorPage from "../ErrorPage";
import { HandleAuthenticationResponse } from "src/startup/Authentication";

import { PrivateRoute } from "src/startup/Authentication";
import PathNotFound from "../PathNotFound";
import Welcome from "../Welcome";

import AppChrome from "./AppChrome";
import { Processing } from "../Processing";
import SwitchedDocRefEditor from "../DocumentEditors/SwitchedDocRefEditor";
import IconHeader from "../IconHeader";
import DataViewer from "../DataViewer";
import UserSettings from "../UserSettings";
import IFrame from "../IFrame";

import AuthorisationManager, {
  UserAuthorisationEditor,
} from "../AuthorisationManager";
import IndexVolumes from "../IndexVolumes";
import IndexVolumeGroups from "../IndexVolumeGroups";
import IndexVolumeGroupEditor from "../IndexVolumeGroups/IndexVolumeGroupEditor";
import { useConfig } from "src/startup/config";
import DocumentPermissionEditor from "../AuthorisationManager/DocumentPermissionEditor";
import DocumentPermissionForUserEditor from "../AuthorisationManager/DocumentPermissionForUserEditor";
import IndexVolumeEditor from "../IndexVolumes/IndexVolumeEditor";
import { urlGenerator } from "./useAppNavigation";

const renderWelcome = () => (
  <AppChrome activeMenuItem="welcome" content={<Welcome />} />
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
        path={urlGenerator.goToDataViewer()}
        render={() => (
          <AppChrome activeMenuItem="data" content={<DataViewer />} />
        )}
      />
      <PrivateRoute
        exact
        path={urlGenerator.goToProcessing()}
        render={() => (
          <AppChrome activeMenuItem="processing" content={<Processing />} />
        )}
      />
      <PrivateRoute
        exact
        path={urlGenerator.goToUserSettings()}
        render={() => (
          <AppChrome activeMenuItem="userSettings" content={<UserSettings />} />
        )}
      />
      {[false, true].map(isGroup => (
        <PrivateRoute
          key={isGroup ? "Group" : "User"}
          exact
          path={urlGenerator.goToAuthorisationManager(isGroup)}
          render={() => (
            <AppChrome
              activeMenuItem={isGroup ? "groupPermissions" : "userPermissions"}
              content={<AuthorisationManager isGroup={isGroup} />}
            />
          )}
        />
      ))}

      <PrivateRoute
        exact
        path={urlGenerator.goToAuthorisationsForUser(":userUuid")}
        render={({
          match: {
            params: { userUuid },
          },
        }: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="userPermissions"
            content={<UserAuthorisationEditor userUuid={userUuid} />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urlGenerator.goToAuthorisationsForDocument(":docRefUuid")}
        render={({
          match: {
            params: { docRefUuid },
          },
        }: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="userPermissions"
            content={<DocumentPermissionEditor docRefUuid={docRefUuid} />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urlGenerator.goToAuthorisationsForDocumentForUser(
          ":docRefUuid",
          ":userUuid",
        )}
        render={({
          match: {
            params: { userUuid, docRefUuid },
          },
        }: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="userPermissions"
            content={
              <DocumentPermissionForUserEditor
                userUuid={userUuid}
                docRefUuid={docRefUuid}
              />
            }
          />
        )}
      />
      <PrivateRoute
        exact
        path={urlGenerator.goToIndexVolumes()}
        render={() => (
          <AppChrome activeMenuItem="indexVolumes" content={<IndexVolumes />} />
        )}
      />
      <PrivateRoute
        exact
        path={urlGenerator.goToIndexVolume(":volumeId")}
        render={({
          match: {
            params: { volumeId },
          },
        }: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="indexVolumes"
            content={<IndexVolumeEditor volumeId={volumeId} />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urlGenerator.goToIndexVolumeGroups()}
        render={() => (
          <AppChrome
            activeMenuItem="indexVolumeGroups"
            content={<IndexVolumeGroups />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urlGenerator.goToIndexVolumeGroup(":groupName")}
        render={({
          match: {
            params: { groupName },
          },
        }: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="indexVolumeGroups"
            content={<IndexVolumeGroupEditor groupName={groupName} />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urlGenerator.goToUsers()}
        render={() => (
          <AppChrome
            activeMenuItem="userIdentities"
            content={<UsersIFrame />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urlGenerator.goToApiKeys()}
        render={() => (
          <AppChrome activeMenuItem="apiKeys" content={<ApiTokensIFrame />} />
        )}
      />
      <PrivateRoute
        exact
        path={urlGenerator.goToError()}
        render={() => (
          <AppChrome activeMenuItem="welcome" content={<ErrorPage />} />
        )}
      />
      <PrivateRoute
        exact
        path={urlGenerator.goToEditDocRefByUuid(":docRefUuid")}
        render={(props: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="explorer"
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
          <AppChrome activeMenuItem="welcome" content={<PathNotFound />} />
        )}
      />
      {/* Default route */}
      <Route render={() => <PathNotFound message="Invalid path" />} />
    </Switch>
  );
};

export default Routes;
