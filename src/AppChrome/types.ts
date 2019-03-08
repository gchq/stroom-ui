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
