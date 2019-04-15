import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { DocRefType } from "src/api/useDocumentApi/types/base";

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

export interface NavigateApp<T> {
  goToWelcome: () => T;
  goToDataViewer: () => T;
  goToProcessing: () => T;
  goToUserSettings: () => T;
  goToAuthorisationManager: (isGroup: string) => T;
  goToAuthorisationsForUser: (userUuid?: string) => T;
  goToAuthorisationsForDocument: (docRefUuid?: string) => T;
  goToAuthorisationsForDocumentForUser: (
    docRefUuid?: string,
    userUuid?: string,
  ) => T;
  goToIndexVolumes: () => T;
  goToIndexVolume: (volumeId?: T) => T;
  goToIndexVolumeGroups: () => T;
  goToIndexVolumeGroup: (groupName?: string) => T;
  goToStroomUsers: () => T;
  goToUsers: () => T;
  goToUser: (userId: string) => T;
  goToNewUser: () => T;
  goToApiKeys: () => T;
  goToError: () => T;
  goToEditDocRefByUuid: (docRefUuid?: string) => T;
  goToEditDocRef: (docRef: DocRefType) => T;
}
