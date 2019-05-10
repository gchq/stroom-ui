import { DocRefType } from "components/DocumentEditors/useDocumentApi/types/base";

export interface RawNavigateApp<IN, OUT> {
  goToWelcome: () => OUT;
  goToDataViewer: () => OUT;
  goToProcessing: () => OUT;
  goToUserSettings: () => OUT;
  goToAuthorisationManager: (isGroup: IN) => OUT;
  goToAuthorisationsForUser: (userUuid: IN) => OUT;
  goToAuthorisationsForDocument: (docRefUuid: IN) => OUT;
  goToAuthorisationsForDocumentForUser: (docRefUuid: IN, userUuid: IN) => OUT;
  goToIndexVolumes: () => OUT;
  goToIndexVolume: (volumeId: IN) => OUT;
  goToIndexVolumeGroups: () => OUT;
  goToIndexVolumeGroup: (groupName: IN) => OUT;
  goToUsers: () => OUT;
  goToUser: (userId: string) => OUT;
  goToNewUser: () => OUT;
  goToApiKeys: () => OUT;
  goToApiKey: (id: string) => OUT;
  goToNewApiKey: () => OUT;
  goToError: () => OUT;
  goToEditDocRefByUuid: (docRefUuid: IN) => OUT;
  goToEditDocRef: (docRef: DocRefType) => OUT;
}

export type NavigateApp = RawNavigateApp<string, void>;
