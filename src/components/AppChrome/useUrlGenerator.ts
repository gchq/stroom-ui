import * as React from "react";
import { NavigateApp } from "./types";
import { DocRefType } from "src/components/DocumentEditors/useDocumentApi/types/base";

const useUrlGenerator = (urlPrefix: string): NavigateApp<string> => {
  return React.useMemo(
    () => ({
      goToWelcome: () => `/${urlPrefix}/welcome`,
      goToDataViewer: () => `/${urlPrefix}/data`,
      goToProcessing: () => `/${urlPrefix}/processing`,
      goToUserSettings: () => `/${urlPrefix}/me`,
      goToAuthorisationManager: (isGroup: string = ":isGroup") =>
        `/${urlPrefix}/authorisationManager/${isGroup}`,
      goToAuthorisationsForUser: (userUuid: string = ":userUuid") =>
        `/${urlPrefix}/authorisationManager/${userUuid}`,
      goToAuthorisationsForDocument: (docRefUuid: string = ":docRefUuid") =>
        `/${urlPrefix}/authorisationManager/document/${docRefUuid}`,
      goToAuthorisationsForDocumentForUser: (
        docRefUuid: string = ":docRefUuid",
        userUuid: string = ":userUuid",
      ) =>
        `/${urlPrefix}/authorisationManager/document/${docRefUuid}/${userUuid}`,
      goToIndexVolumes: () => `/${urlPrefix}/indexing/volumes`,
      goToIndexVolume: (volumeId: string = ":volumeId") =>
        `/${urlPrefix}/indexing/volumes/${volumeId}`,
      goToIndexVolumeGroups: () => `/${urlPrefix}/indexing/groups`,
      goToIndexVolumeGroup: (groupName: string = ":groupName") =>
        `/${urlPrefix}/indexing/groups/${groupName}`,
      goToUsers: () => `/${urlPrefix}/users`,
      goToApiKeys: () => `/${urlPrefix}/apikeys`,
      goToError: () => `/${urlPrefix}/error`,
      goToEditDocRefByUuid: (docRefUuid: string = ":docRefUuid") =>
        `/${urlPrefix}/doc/${docRefUuid}`,
      goToEditDocRef: (docRef: DocRefType) =>
        `/${urlPrefix}/doc/${docRef.uuid}`,
    }),
    [urlPrefix],
  );
};

export default useUrlGenerator;