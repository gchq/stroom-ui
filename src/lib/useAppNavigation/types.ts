import { DocRefType } from "components/DocumentEditors/useDocumentApi/types/base";

export interface RawNavigateApp<IN, OUT> {
  goToActivity: (activityId: IN) => OUT;
  goToApiKey: (id: string) => OUT;
  goToApiKeys: () => OUT;
  goToAuthorisationManager: (isGroup: IN) => OUT;
  goToAuthorisationsForDocument: (docRefUuid: IN) => OUT;
  goToAuthorisationsForDocumentForUser: (docRefUuid: IN, userUuid: IN) => OUT;
  goToAuthorisationsForUser: (userUuid: IN) => OUT;
  goToEditDocRef: (docRef: DocRefType) => OUT;
  goToEditDocRefByUuid: (docRefUuid: IN) => OUT;
  goToError: () => OUT;
  goToIndexVolume: (volumeId: IN) => OUT;
  goToIndexVolumeGroup: (groupName: IN) => OUT;
  goToIndexVolumeGroups: () => OUT;
  goToIndexVolumes: () => OUT;
  goToLogin: () => OUT;
  goToNewApiKey: () => OUT;
  goToNewUser: () => OUT;
  goToProcessing: () => OUT;
  goToStreamBrowser: () => OUT;
  goToUser: (userId: string) => OUT;
  goToUserSettings: () => OUT;
  goToUsers: () => OUT;
  goToWelcome: () => OUT;
}

export interface NavigateApp {
  nav: RawNavigateApp<string, void>;
  urlGenerator: RawNavigateApp<string | undefined, string>;
}
