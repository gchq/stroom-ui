import * as React from "react";
import { RouteComponentProps, RouteProps } from "react-router";

import { AppChrome } from ".";
import { Processing } from "../Processing";
import SwitchedDocRefEditor from "../SwitchedDocRefEditor";
import IconHeader from "../IconHeader";
import Welcome from "../Welcome";
import DataViewer from "../DataViewer";
import UserSettings from "../UserSettings";
import PathNotFound from "../PathNotFound";
import IFrame from "../IFrame";
import ErrorPage from "../ErrorPage";

import AuthorisationManager, {
  UserAuthorisationEditor
} from "../AuthorisationManager";
import IndexVolumes from "../IndexVolumes";
import IndexVolumeGroups from "../IndexVolumeGroups";
import IndexVolumeGroupEditor from "../IndexVolumeGroups/IndexVolumeGroupEditor";
import useConfig from "../../startup/config/useConfig";
import DocumentPermissionEditor from "../AuthorisationManager/DocumentPermissionEditor";
import DocumentPermissionForUserEditor from "../AuthorisationManager/DocumentPermissionForUserEditor";
import IndexVolumeEditor from "../IndexVolumes/IndexVolumeEditor";

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

export default [
  {
    exact: true,
    path: "/",
    render: renderWelcome
  },
  {
    exact: true,
    path: "/s/welcome",
    render: renderWelcome
  },
  {
    exact: true,
    path: "/s/data",
    render: () => <AppChrome activeMenuItem="Data" content={<DataViewer />} />
  },
  {
    exact: true,
    path: "/s/processing",
    render: () => (
      <AppChrome activeMenuItem="Processing" content={<Processing />} />
    )
  },
  {
    exact: true,
    path: "/s/me",
    render: () => <AppChrome activeMenuItem="Me" content={<UserSettings />} />
  },
  {
    exact: true,
    path: "/s/authorisationManager",
    render: () => (
      <AppChrome
        activeMenuItem="User Authorisation"
        content={<AuthorisationManager />}
      />
    )
  },
  {
    exact: true,
    path: "/s/authorisationManager/:userUuid",
    render: (props: RouteComponentProps<any>) => (
      <AppChrome
        activeMenuItem="User Authorisation"
        content={
          <UserAuthorisationEditor userUuid={props.match.params.userUuid} />
        }
      />
    )
  },
  {
    exact: true,
    path: "/s/authorisationManager/document/:docRefUuid",
    render: (props: RouteComponentProps<any>) => (
      <AppChrome
        activeMenuItem="User Authorisation"
        content={
          <DocumentPermissionEditor
            docRefUuid={props.match.params.docRefUuid}
          />
        }
      />
    )
  },
  {
    exact: true,
    path: "/s/authorisationManager/document/:docRefUuid/:userUuid",
    render: (props: RouteComponentProps<any>) => (
      <AppChrome
        activeMenuItem="User Authorisation"
        content={
          <DocumentPermissionForUserEditor
            userUuid={props.match.params.userUuid}
            docRefUuid={props.match.params.docRefUuid}
          />
        }
      />
    )
  },
  {
    exact: true,
    path: "/s/indexing/volumes",
    render: () => (
      <AppChrome activeMenuItem="Index Volumes" content={<IndexVolumes />} />
    )
  },
  {
    exact: true,
    path: "/s/indexing/volumes/:volumeId",
    render: (props: RouteComponentProps<any>) => (
      <AppChrome
        activeMenuItem="Index Volumes"
        content={<IndexVolumeEditor volumeId={props.match.params.volumeId} />}
      />
    )
  },
  {
    exact: true,
    path: "/s/indexing/groups",
    render: () => (
      <AppChrome
        activeMenuItem="Index Groups"
        content={<IndexVolumeGroups />}
      />
    )
  },
  {
    exact: true,
    path: "/s/indexing/groups/:groupName",
    render: (props: RouteComponentProps<any>) => (
      <AppChrome
        activeMenuItem="Index Groups"
        content={
          <IndexVolumeGroupEditor groupName={props.match.params.groupName} />
        }
      />
    )
  },
  {
    exact: true,
    path: "/s/users",
    render: () => <AppChrome activeMenuItem="Users" content={<UsersIFrame />} />
  },
  {
    exact: true,
    path: "/s/apikeys",
    render: () => (
      <AppChrome activeMenuItem="API Keys" content={<ApiTokensIFrame />} />
    )
  },
  {
    exact: true,
    path: "/s/error",
    render: () => <AppChrome activeMenuItem="Error" content={<ErrorPage />} />
  },
  {
    exact: true,
    path: "/s/doc/:docRefUuid",
    render: (props: RouteComponentProps<any>) => (
      <AppChrome
        activeMenuItem="Explorer"
        content={
          <SwitchedDocRefEditor docRefUuid={props.match.params.docRefUuid} />
        }
      />
    )
  },
  {
    render: () => (
      <AppChrome activeMenuItem="Welcome" content={<PathNotFound />} />
    )
  }
] as Array<RouteProps>;
