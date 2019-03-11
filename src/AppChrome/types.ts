import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { DocRefType } from "../types";

export type MenuItemOpened = (name: string, isOpen: boolean) => void;

export type MenuItemsOpenState = {
  [s: string]: boolean;
};

export interface MenuItemType {
  key: string;
  title?: string;
  onClick: () => void;
  icon: IconProp;
  style: "doc" | "nav";
  skipInContractedMenu?: boolean;
  children?: Array<MenuItemType>;
  docRef?: DocRefType;
  parentDocRef?: DocRefType;
  isActive?: boolean;
}

export interface NavigateApp {
  goToWelcome: () => void; // /s/welcome
  goToDataViewer: () => void; // /s/data
  goToProcessing: () => void; // /s/processing
  goToUserSettings: () => void; // /s/me
  goToAuthorisationManager: () => void; // /s/authorisationManager
  goToAuthorisationsForUser: (userUuid: string) => void; // /s/authorisationManager/:userUuid
  goToAuthorisationsForDocument: (docRefUuid: string) => void; // /s/authorisationManager/document/:docRefUuid
  goToAuthorisationsForDocumentForUser: (
    docRefUuid: string,
    userUuid: string
  ) => void; // /s/authorisationManager/document/:docRefUuid/:userUuid
  goToIndexVolumes: () => void; // /s/indexing/volumes
  goToIndexVolume: (volumeId: string) => void;
  goToIndexVolumeGroups: () => void; // /s/indexing/groups
  goToIndexVolumeGroup: (groupName: string) => void; // /s/indexing/groups/:groupName
  goToUsers: () => void; // /s/users
  goToApiKeys: () => void; // /s/apikeys
  goToError: () => void; // /s/error
  goToEditDocRefByUuid: (docRefUuid: string) => void; // /s/doc/:docRefUuid
  goToEditDocRef: (docRef: DocRefType) => void;
}
