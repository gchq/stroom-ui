import * as React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import useAppNavigation from "lib/useAppNavigation/useAppNavigation";
import { useDocumentTree } from "components/DocumentEditors/api/explorer";
import {
  DocRefConsumer,
  DocRefType,
  DocRefTree,
} from "components/DocumentEditors/useDocumentApi/types/base";
import useLocalStorage, { useStoreObjectFactory } from "lib/useLocalStorage";
import {
  MenuItemsOpenState,
  MenuItemOpened,
  MenuItemType,
} from "../MenuItem/types";

interface OutProps {
  menuItems: MenuItemType[];
  openMenuItems: MenuItemType[];
  menuItemOpened: MenuItemOpened;
  areMenuItemsOpen: MenuItemsOpenState;
}

const getOpenMenuItems = function(
  menuItems: MenuItemType[],
  areMenuItemsOpen: MenuItemsOpenState,
  openMenuItems: MenuItemType[] = [],
): MenuItemType[] {
  menuItems.forEach(menuItem => {
    openMenuItems.push(menuItem);
    if (menuItem.children && areMenuItemsOpen[menuItem.key]) {
      getOpenMenuItems(menuItem.children, areMenuItemsOpen, openMenuItems);
    }
  });

  return openMenuItems;
};

const getDocumentTreeMenuItems = (
  activeMenuItem: string,
  openDocRef: DocRefConsumer,
  parentDocRef: DocRefType | undefined,
  treeNode: DocRefTree,
  skipInContractedMenu = false,
): MenuItemType => ({
  key: treeNode.uuid,
  title: treeNode.name,
  onClick: () => openDocRef(treeNode),
  icon: "folder",
  style: skipInContractedMenu ? "doc" : "nav",
  skipInContractedMenu,
  docRef: treeNode,
  parentDocRef,
  children:
    treeNode.children && treeNode.children.length > 0
      ? treeNode.children
          .filter(t => t.type === "Folder")
          .map(t =>
            getDocumentTreeMenuItems(
              activeMenuItem,
              openDocRef,
              treeNode,
              t,
              true,
            ),
          )
      : undefined,
});

const useMenuItems = (activeMenuItem: string): OutProps => {
  const {
    goToWelcome,
    goToDataViewer,
    goToProcessing,
    goToIndexVolumes,
    goToApiKeys,
    goToAuthorisationManager,
    goToIndexVolumeGroups,
    goToUserSettings,
    goToUsers,
    goToEditDocRef,
  } = useAppNavigation();

  const { documentTree } = useDocumentTree();

  const {
    value: areMenuItemsOpen,
    reduceValue: modifyOpenMenuItems,
  } = useLocalStorage<MenuItemsOpenState>(
    "app-chrome-menu-items-open",
    {},
    useStoreObjectFactory<MenuItemsOpenState>(),
  );
  const menuItemOpened: MenuItemOpened = React.useCallback(
    (name: string, isOpen: boolean) => {
      modifyOpenMenuItems(existing => ({
        ...existing,
        [name]: isOpen,
      }));
    },
    [modifyOpenMenuItems],
  );

  const menuItems: MenuItemType[] = [
    {
      key: "welcome",
      title: "Welcome",
      onClick: goToWelcome,
      icon: "home",
      style: "nav",
    },
    getDocumentTreeMenuItems(
      activeMenuItem,
      goToEditDocRef,
      undefined,
      documentTree,
    ),
    {
      key: "data",
      title: "Data",
      onClick: goToDataViewer,
      icon: "database",
      style: "nav",
    },
    {
      key: "processing",
      title: "Processing",
      onClick: goToProcessing,
      icon: "play",
      style: "nav",
    },
    {
      key: "indexing",
      title: "Indexing",
      onClick: React.useCallback(
        () => menuItemOpened("indexing", !areMenuItemsOpen.indexing),
        [menuItemOpened, areMenuItemsOpen],
      ),
      icon: "database",
      style: "nav",
      skipInContractedMenu: true,
      children: [
        {
          key: "indexVolumes",
          title: "Index Volumes",
          onClick: goToIndexVolumes,
          icon: "database",
          style: "nav",
        },
        {
          key: "indexVolumeGroups",
          title: "Index Groups",
          onClick: goToIndexVolumeGroups,
          icon: "database",
          style: "nav",
        },
      ],
    },
    {
      key: "admin",
      title: "Admin",
      onClick: React.useCallback(
        () => menuItemOpened("admin", !areMenuItemsOpen.admin),
        [menuItemOpened, areMenuItemsOpen],
      ),
      icon: "cogs",
      style: "nav",
      skipInContractedMenu: true,
      children: [
        {
          key: "userSettings",
          title: "Me",
          onClick: goToUserSettings,
          icon: "user",
          style: "nav",
        },
        {
          key: "adminPermissions",
          title: "Permissions",
          icon: "key",
          style: "nav",
          onClick: React.useCallback(
            () =>
              menuItemOpened(
                "adminPermissions",
                !areMenuItemsOpen.adminPermissions,
              ),
            [menuItemOpened, areMenuItemsOpen],
          ),
          children: [true, false].map((isGroup: boolean) => ({
            key: `${isGroup ? "groupPermissions" : "userPermissions"}`,
            title: isGroup ? "Group" : "User",
            onClick: () => goToAuthorisationManager(isGroup.toString()),
            icon: "user" as IconProp,
            style: "nav",
          })) as MenuItemType[],
        },
        {
          key: "userIdentities",
          title: "Users",
          onClick: goToUsers,
          icon: "users",
          style: "nav",
        },
        {
          key: "apiKeys",
          title: "API Keys",
          onClick: goToApiKeys,
          icon: "key",
          style: "nav",
        },
      ],
    },
  ];

  const openMenuItems = getOpenMenuItems(menuItems, areMenuItemsOpen);

  return { menuItems, openMenuItems, menuItemOpened, areMenuItemsOpen };
};

export default useMenuItems;
