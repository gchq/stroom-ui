import * as React from "react";

import { NavigateApp } from "./types";
import useRouter from "lib/useRouter";
import { DocRefType } from "components/DocumentEditors/useDocumentApi/types/base";
import useUrlGenerator from "./useUrlGenerator";
import { WithChromeContext } from "lib/useRouter/BrowserRouter";

const useAppNavigation = (): NavigateApp => {
  const { history: h } = useRouter();
  const { urlPrefix } = React.useContext(WithChromeContext);
  const u = useUrlGenerator(urlPrefix); // just to make all the following rote lines short
  return React.useMemo(
    () => ({
      urlGenerator: u,
      nav: {
        goToCreateActivity: () => h.push(u.goToCreateActivity()),
        goToEditActivity: (activityId: string) =>
          h.push(u.goToEditActivity(activityId)),
        goToWelcome: () => h.push(u.goToWelcome()),
        goToStreamBrowser: () => h.push(u.goToStreamBrowser()),
        goToProcessing: () => h.push(u.goToProcessing()),
        goToUserSettings: () => h.push(u.goToUserSettings()),
        goToAuthorisationManager: (isGroup: string) =>
          h.push(u.goToAuthorisationManager(isGroup)),
        goToAuthorisationsForUser: (userUuid: string) =>
          h.push(u.goToAuthorisationsForUser(userUuid)),
        goToAuthorisationsForDocument: (docRefUuid: string) =>
          h.push(u.goToAuthorisationsForDocument(docRefUuid)),
        goToAuthorisationsForDocumentForUser: (
          docRefUuid: string,
          userUuid: string,
        ) =>
          h.push(u.goToAuthorisationsForDocumentForUser(docRefUuid, userUuid)),
        goToIndexVolumes: () => h.push(u.goToIndexVolumes()),
        goToIndexVolume: (volumeId: string) =>
          h.push(u.goToIndexVolume(volumeId)),
        goToIndexVolumeGroups: () => h.push(u.goToIndexVolumeGroups()),
        goToIndexVolumeGroup: (groupName: string) =>
          h.push(u.goToIndexVolumeGroup(groupName)),
        goToUsers: () => h.push(u.goToUsers()),
        goToUser: (userId: string) => h.push(u.goToUser(userId)),
        goToNewUser: () => h.push(u.goToNewUser()),
        goToNewApiKey: () => h.push(u.goToNewApiKey()),
        goToApiKey: (id: string) => h.push(u.goToApiKey(id)),
        goToApiKeys: () => h.push(u.goToApiKeys()),
        goToError: () => h.push(u.goToError()),
        goToEditDocRefByUuid: (docRefUuid: string) =>
          h.push(u.goToEditDocRefByUuid(docRefUuid)),
        goToEditDocRef: (docRef: DocRefType) =>
          h.push(u.goToEditDocRef(docRef)),
      },
    }),
    [h, u],
  );
};

export default useAppNavigation;
