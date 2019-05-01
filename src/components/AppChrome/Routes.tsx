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
import { Route, RouteComponentProps, Switch } from "react-router";
import {
  HandleAuthenticationResponse,
  PrivateRoute,
} from "startup/Authentication";
import AuthorisationManager, {
  UserAuthorisationEditor,
} from "../AuthorisationManager";
import DocumentPermissionEditor from "../AuthorisationManager/DocumentPermissionEditor";
import DocumentPermissionForUserEditor from "../AuthorisationManager/DocumentPermissionForUserEditor";
import DataViewer from "../DataViewer";
import SwitchedDocRefEditor from "../DocumentEditors/SwitchedDocRefEditor";
import ErrorPage from "../ErrorPage";
import IndexVolumeGroups from "../IndexVolumeGroups";
import IndexVolumeGroupEditor from "../IndexVolumeGroups/IndexVolumeGroupEditor";
import IndexVolumes from "../IndexVolumes";
import IndexVolumeEditor from "../IndexVolumes/IndexVolumeEditor";
import { Login } from "../Login";
import {
  ChangePassword,
  ResetPassword,
  ResetPasswordRequest,
} from "../password";
import PathNotFound from "../PathNotFound";
import { Processing } from "../Processing";
import { CreateToken } from "../tokens";
import { EditToken } from "../tokens/Create";
import TokenSearch from "../tokens/Search/SearchToken";
import { UserCreate, UserEdit, UserSearch } from "../users";
import UserSettings from "../UserSettings";
import Welcome from "../Welcome";
import AppChrome from "./AppChrome";
import useUrlGenerator from "./useUrlGenerator";

const renderWelcome = ({
  match: {
    params: { urlPrefix },
  },
}: RouteComponentProps<{ urlPrefix: string }>) => (
  <AppChrome
    activeMenuItem="welcome"
    urlPrefix={urlPrefix}
    content={<Welcome />}
  />
);

const Routes: React.FunctionComponent = () => {
  const urls = useUrlGenerator(":urlPrefix");
  return (
    <Switch>
      <Route
        exact
        path="/handleAuthenticationResponse"
        render={() => <HandleAuthenticationResponse />}
      />
      <Route exact path="/error" component={ErrorPage} />
      <Route exact path="/openWelcome" component={Welcome} />
      <Route exact path={"/resetPassword"} component={ResetPassword} />
      <Route
        exact
        path={"/resetPasswordRequest"}
        component={ResetPasswordRequest}
      />
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"/changepassword"} component={ChangePassword} />
      <PrivateRoute exact path="/" render={renderWelcome} />
      <PrivateRoute exact path={urls.goToWelcome()} render={renderWelcome} />
      <PrivateRoute
        exact
        path={urls.goToDataViewer()}
        render={({
          match: {
            params: { urlPrefix },
          },
        }) => (
          <AppChrome
            activeMenuItem="data"
            urlPrefix={urlPrefix}
            content={<DataViewer />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urls.goToProcessing()}
        render={({
          match: {
            params: { urlPrefix },
          },
        }) => (
          <AppChrome
            activeMenuItem="processing"
            urlPrefix={urlPrefix}
            content={<Processing />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urls.goToUserSettings()}
        render={({
          match: {
            params: { urlPrefix },
          },
        }) => (
          <AppChrome
            activeMenuItem="userSettings"
            urlPrefix={urlPrefix}
            content={<UserSettings />}
          />
        )}
      />
      {[false, true].map(isGroup => (
        <PrivateRoute
          key={isGroup ? "Group" : "User"}
          exact
          path={urls.goToAuthorisationManager(isGroup.toString())}
          render={({
            match: {
              params: { urlPrefix },
            },
          }) => (
            <AppChrome
              activeMenuItem={isGroup ? "groupPermissions" : "userPermissions"}
              urlPrefix={urlPrefix}
              content={<AuthorisationManager isGroup={isGroup} />}
            />
          )}
        />
      ))}

      <PrivateRoute
        exact
        path={urls.goToAuthorisationsForUser(undefined)}
        render={({
          match: {
            params: { urlPrefix, userUuid },
          },
        }: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="userPermissions"
            urlPrefix={urlPrefix}
            content={<UserAuthorisationEditor userUuid={userUuid} />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urls.goToAuthorisationsForDocument(undefined)}
        render={({
          match: {
            params: { urlPrefix, docRefUuid },
          },
        }: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="userPermissions"
            urlPrefix={urlPrefix}
            content={<DocumentPermissionEditor docRefUuid={docRefUuid} />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urls.goToAuthorisationsForDocumentForUser(undefined, undefined)}
        render={({
          match: {
            params: { urlPrefix, userUuid, docRefUuid },
          },
        }: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="userPermissions"
            urlPrefix={urlPrefix}
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
        path={urls.goToIndexVolumes()}
        render={({
          match: {
            params: { urlPrefix },
          },
        }) => (
          <AppChrome
            activeMenuItem="indexVolumes"
            urlPrefix={urlPrefix}
            content={<IndexVolumes />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urls.goToIndexVolume(undefined)}
        render={({
          match: {
            params: { urlPrefix, volumeId },
          },
        }: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="indexVolumes"
            urlPrefix={urlPrefix}
            content={<IndexVolumeEditor volumeId={volumeId} />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urls.goToIndexVolumeGroups()}
        render={({
          match: {
            params: { urlPrefix },
          },
        }) => (
          <AppChrome
            activeMenuItem="indexVolumeGroups"
            urlPrefix={urlPrefix}
            content={<IndexVolumeGroups />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urls.goToIndexVolumeGroup(undefined)}
        render={({
          match: {
            params: { urlPrefix, groupName },
          },
        }: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="indexVolumeGroups"
            urlPrefix={urlPrefix}
            content={<IndexVolumeGroupEditor groupName={groupName} />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urls.goToError()}
        render={({
          match: {
            params: { urlPrefix },
          },
        }) => (
          <AppChrome
            activeMenuItem="welcome"
            urlPrefix={urlPrefix}
            content={<ErrorPage />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urls.goToEditDocRefByUuid(undefined)}
        render={({
          match: {
            params: { urlPrefix, docRefUuid },
          },
        }: RouteComponentProps<any>) => (
          <AppChrome
            activeMenuItem="explorer"
            urlPrefix={urlPrefix}
            content={<SwitchedDocRefEditor docRefUuid={docRefUuid} />}
          />
        )}
      />

      <PrivateRoute
        exact
        path={urls.goToUsers()}
        render={({
          match: {
            params: { urlPrefix },
          },
        }) => (
          <AppChrome
            urlPrefix={urlPrefix}
            activeMenuItem="userIdentities"
            content={<UserSearch />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urls.goToNewUser()}
        render={({
          match: {
            params: { urlPrefix },
          },
        }) => (
          <AppChrome
            urlPrefix={urlPrefix}
            activeMenuItem="userIdentities"
            content={<UserCreate />}
          />
        )}
      />
      <PrivateRoute
        exact
        path={urls.goToUser(":userId")}
        render={({
          match: {
            params: { urlPrefix },
          },
        }) => (
          <AppChrome
            urlPrefix={urlPrefix}
            activeMenuItem="userIdentities"
            content={<UserEdit />}
          />
        )}
      />

      <PrivateRoute
        exact
        path={urls.goToApiKeys()}
        render={({
          match: {
            params: { urlPrefix },
          },
        }) => (
          <AppChrome
            activeMenuItem="apiKeys"
            urlPrefix={urlPrefix}
            content={<TokenSearch />}
          />
        )}
      />

      <PrivateRoute
        exact
        path={urls.goToNewApiKey()}
        render={({
          match: {
            params: { urlPrefix },
          },
        }) => (
          <AppChrome
            urlPrefix={urlPrefix}
            activeMenuItem="apiKeys"
            content={<CreateToken />}
          />
        )}
      />

      <PrivateRoute
        exact
        path={urls.goToApiKey(":id")}
        render={({
          match: {
            params: { urlPrefix },
          },
        }) => (
          <AppChrome
            urlPrefix={urlPrefix}
            activeMenuItem="apiKeys"
            content={<EditToken />}
          />
        )}
      />

      <PrivateRoute
        render={({
          match: {
            params: { urlPrefix },
          },
        }) => (
          <AppChrome
            activeMenuItem="welcome"
            urlPrefix={urlPrefix}
            content={<PathNotFound />}
          />
        )}
      />

      {/* Default route */}
      <Route render={() => <PathNotFound message="Invalid path" />} />
    </Switch>
  );
};

export default Routes;
