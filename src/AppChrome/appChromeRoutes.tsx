import * as React from "react";

import { AppChrome } from ".";
import { Processing } from "../sections/Processing";
import SwitchedDocRefEditor from "../components/SwitchedDocRefEditor";
import IconHeader from "../components/IconHeader";
import Welcome from "../sections/Welcome";
import DataViewer from "../sections/DataViewer";
import UserSettings from "../sections/UserSettings";
import PathNotFound from "../components/PathNotFound";
import IFrame from "../components/IFrame";
import ErrorPage from "../components/ErrorPage";

import { RouteComponentProps, RouteProps } from "react-router";
import AuthorisationManager, {
  UserAuthorisationEditor
} from "../sections/AuthorisationManager";
import IndexVolumes from "../sections/IndexVolumes";
import IndexVolumeGroups from "../sections/IndexVolumeGroups";
import IndexVolumeGroupEditor from "../sections/IndexVolumeGroups/IndexVolumeGroupEditor";
import useConfig from "../startup/config/useConfig";
import Loader from "../components/Loader";
import DocumentPermissionEditor from "../sections/AuthorisationManager/DocumentPermissionEditor";

const renderWelcome = () => (
  <AppChrome activeMenuItem="Welcome" content={<Welcome />} />
);

const UsersIFrame = () => {
  const config = useConfig();

  if (!config.isReady) {
    return <Loader message="Awaiting Config" />;
  }

  const {
    values: { authUsersUiUrl }
  } = config;

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
  const config = useConfig();

  if (!config.isReady) {
    return <Loader message="Awaiting Config" />;
  }

  const {
    values: { authTokensUiUrl }
  } = config;

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
    render: () => (
      <AppChrome
        activeMenuItem="Data"
        content={<DataViewer dataViewerId="system" />}
      />
    )
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
    path: "/s/authorisationManager/document/:docRefType/:docRefUuid",
    render: (props: RouteComponentProps<any>) => (
      <AppChrome
        activeMenuItem="User Authorisation"
        content={
          <DocumentPermissionEditor
            docRef={{
              uuid: props.match.params.docRefUuid,
              type: props.match.params.docRefType
            }}
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
    path: "/s/doc/:type/:uuid",
    render: (props: RouteComponentProps<any>) => (
      <AppChrome
        activeMenuItem="Explorer"
        content={<SwitchedDocRefEditor docRef={{ ...props.match.params }} />}
      />
    )
  },
  {
    render: () => (
      <AppChrome activeMenuItem="Welcome" content={<PathNotFound />} />
    )
  }
] as Array<RouteProps>;
