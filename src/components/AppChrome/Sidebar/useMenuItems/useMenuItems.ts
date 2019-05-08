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
  MenuItemToggled,
  MenuItemType,
} from "../MenuItem/types";

interface MenuItemsByKey {
  [key: string]: MenuItemType;
}

interface OutProps {
  menuItems: MenuItemType[];
  menuItemsByKey: MenuItemsByKey;
  menuItemIsOpenByKey: MenuItemsOpenState;
  openMenuItemKeys: string[];
  menuItemOpened: MenuItemOpened;
  menuItemToggled: MenuItemToggled;
}

const iterateMenuItems = function(
  menuItems: MenuItemType[],
  callback: (menuItem: MenuItemType) => void,
) {
  menuItems.forEach(menuItem => {
    callback(menuItem);
    if (!!menuItem.children) {
      iterateMenuItems(menuItem.children, callback);
    }
  });
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

const DEFAULT_MENU_OPEN_STATE: MenuItemsOpenState = {};

const useMenuItems = (activeMenuItem?: string): OutProps => {
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
    value: menuItemIsOpenByKey,
    reduceValue: modifyOpenMenuItems,
  } = useLocalStorage<MenuItemsOpenState>(
    "app-chrome-menu-items-open",
    DEFAULT_MENU_OPEN_STATE,
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
  const menuItemToggled: MenuItemToggled = React.useCallback(
    (name: string) => {
      modifyOpenMenuItems(existing => ({
        ...existing,
        [name]: !existing[name],
      }));
    },
    [modifyOpenMenuItems],
  );

  const documentMenuItems = React.useMemo(
    () =>
      getDocumentTreeMenuItems(
        activeMenuItem,
        goToEditDocRef,
        undefined,
        documentTree,
      ),
    [activeMenuItem, goToEditDocRef, documentTree],
  );

  const menuItems: MenuItemType[] = React.useMemo(
    () => [
      {
        key: "welcome",
        title: "Welcome",
        onClick: goToWelcome,
        icon: "home",
        style: "nav",
      },
      documentMenuItems,
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
        onClick: () => menuItemToggled("indexing"),
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
        onClick: () => menuItemToggled("admin"),
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
            onClick: () => menuItemToggled("adminPermissions"),
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
    ],
    [
      documentMenuItems,
      menuItemToggled,
      goToWelcome,
      goToDataViewer,
      goToProcessing,
      goToIndexVolumes,
      goToIndexVolumeGroups,
      goToUserSettings,
      goToApiKeys,
      goToUsers,
      goToAuthorisationManager,
    ],
  );

  const openMenuItemKeys: string[] = React.useMemo(
    () =>
      Object.entries(menuItemIsOpenByKey)
        .filter(k => k[1])
        .map(k => k[0]),
    [menuItemIsOpenByKey],
  );

  const menuItemsByKey: MenuItemsByKey = React.useMemo(() => {
    const itemsByKey = {};

    iterateMenuItems(
      menuItems,
      menuItem => (itemsByKey[menuItem.key] = menuItem),
    );

    return itemsByKey;
  }, [menuItems]);

  return {
    menuItems,
    openMenuItemKeys,
    menuItemOpened,
    menuItemToggled,
    menuItemIsOpenByKey,
    menuItemsByKey,
  };
};

export default useMenuItems;
