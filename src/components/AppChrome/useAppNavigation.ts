import * as React from "react";

import { NavigateApp } from "./types";
import useRouter from "src/lib/useRouter";
import { DocRefType } from "src/types";

export const urlGenerator: NavigateApp<string> = {
  goToWelcome: () => `/s/welcome`,
  goToDataViewer: () => `/s/data`,
  goToProcessing: () => `/s/processing`,
  goToUserSettings: () => `/s/me`,
  goToAuthorisationManager: (isGroup: boolean) =>
    `/s/authorisationManager/${isGroup}`,
  goToAuthorisationsForUser: (userUuid: string) =>
    `/s/authorisationManager/${userUuid}`,
  goToAuthorisationsForDocument: (docRefUuid: string) =>
    `/s/authorisationManager/document/${docRefUuid}`,
  goToAuthorisationsForDocumentForUser: (
    docRefUuid: string,
    userUuid: string,
  ) => `/s/authorisationManager/document/${docRefUuid}/${userUuid}`,
  goToIndexVolumes: () => `/s/indexing/volumes`,
  goToIndexVolume: (volumeId: string) => `/s/indexing/volumes/${volumeId}`,
  goToIndexVolumeGroups: () => `/s/indexing/groups`,
  goToIndexVolumeGroup: (groupName: string) =>
    `/s/indexing/groups/${groupName}`,
  goToUsers: () => `/s/users`,
  goToApiKeys: () => `/s/apikeys`,
  goToError: () => `/s/error`,
  goToEditDocRefByUuid: (docRefUuid: string) => `/s/doc/${docRefUuid}`,
  goToEditDocRef: (docRef: DocRefType) => `/s/doc/${docRef.uuid}`,
};

const useAppNavigation = (): NavigateApp<any> => {
  const { history: h } = useRouter();
  const u = urlGenerator; // just to make all the following rote lines short
  return React.useMemo(
    () => ({
      goToWelcome: () => h.push(u.goToWelcome()),
      goToDataViewer: () => h.push(u.goToDataViewer()),
      goToProcessing: () => h.push(u.goToProcessing()),
      goToUserSettings: () => h.push(u.goToUserSettings()),
      goToAuthorisationManager: (isGroup: boolean) =>
        h.push(u.goToAuthorisationManager(isGroup)),
      goToAuthorisationsForUser: (userUuid: string) =>
        h.push(u.goToAuthorisationsForUser(userUuid)),
      goToAuthorisationsForDocument: (docRefUuid: string) =>
        h.push(u.goToAuthorisationsForDocument(docRefUuid)),
      goToAuthorisationsForDocumentForUser: (
        docRefUuid: string,
        userUuid: string,
      ) => h.push(u.goToAuthorisationsForDocumentForUser(docRefUuid, userUuid)),
      goToIndexVolumes: () => h.push(u.goToIndexVolumes()),
      goToIndexVolume: (volumeId: string) =>
        h.push(u.goToIndexVolume(volumeId)),
      goToIndexVolumeGroups: () => h.push(u.goToIndexVolumeGroups()),
      goToIndexVolumeGroup: (groupName: string) =>
        h.push(u.goToIndexVolumeGroup(groupName)),
      goToUsers: () => h.push(u.goToUsers()),
      goToApiKeys: () => h.push(u.goToApiKeys()),
      goToError: () => h.push(u.goToError()),
      goToEditDocRefByUuid: (docRefUuid: string) =>
        h.push(u.goToEditDocRefByUuid(docRefUuid)),
      goToEditDocRef: (docRef: DocRefType) => h.push(u.goToEditDocRef(docRef)),
    }),
    [h],
  );
};

export default useAppNavigation;
