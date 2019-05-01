import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { DocRefType } from "components/DocumentEditors/useDocumentApi/types/base";

export type ActiveMenuItem =
  | "welcome"
  | "userSettings"
  | "data"
  | "processing"
  | "groupPermissions"
  | "userPermissions"
  | "indexVolumes"
  | "indexVolumeGroups"
  | "userIdentities"
  | "apiKeys"
  | "explorer";

export type MenuItemOpened = (name: string, isOpen: boolean) => void;

export interface MenuItemsOpenState {
  [s: string]: boolean;
}

export interface MenuItemType {
  key: string;
  title?: string;
  onClick: () => void;
  icon: IconProp;
  style: "doc" | "nav";
  skipInContractedMenu?: boolean;
  children?: MenuItemType[];
  docRef?: DocRefType;
  parentDocRef?: DocRefType;
  isActive?: boolean;
}

export interface NavigateApp<IN, OUT> {
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
