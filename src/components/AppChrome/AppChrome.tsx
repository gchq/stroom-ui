/*
 * Copyright 2018 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "simplebar";
import "simplebar/dist/simplebar.css";

import MenuItem from "./MenuItem";
import {
  MenuItemOpened,
  MenuItemType,
  MenuItemsOpenState,
  ActiveMenuItem,
} from "./types";

import useSelectableItemListing from "src/lib/useSelectableItemListing";
import { DocRefType, DocRefConsumer, DocRefTree } from "src/types";
import { KeyDownState } from "src/lib/useKeyIsDown";
import {
  CopyMoveDocRefDialog,
  useDialog as useCopyMoveDocRefDialog,
  ShowDialog as ShowCopyDocRefDialog,
} from "src/components/DocumentEditors/FolderExplorer/CopyMoveDocRefDialog";
import useLocalStorage, {
  storeBoolean,
  useStoreObjectFactory,
} from "src/lib/useLocalStorage";
import useRouter from "src/lib/useRouter";
import { useDocumentTree } from "src/api/explorer";
import useAppNavigation from "./useAppNavigation";
import { useTheme } from "src/lib/theme";

const PATH_PREFIX = "/s";

const getDocumentTreeMenuItems = (
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
          .map(t => getDocumentTreeMenuItems(openDocRef, treeNode, t, true))
      : undefined,
});

const getOpenMenuItems = function<
  T extends {
    key: string;
    children?: T[];
  }
>(
  menuItems: T[],
  areMenuItemsOpen: MenuItemsOpenState,
  openMenuItems: T[] = [],
): T[] {
  menuItems.forEach(menuItem => {
    openMenuItems.push(menuItem);
    if (menuItem.children && areMenuItemsOpen[menuItem.key]) {
      getOpenMenuItems(menuItem.children, areMenuItemsOpen, openMenuItems);
    }
  });

  return openMenuItems;
};

interface Props {
  content: React.ReactNode;
  activeMenuItem: ActiveMenuItem;
}

const getMenuItems = (
  isCollapsed: boolean = false,
  menuItems: MenuItemType[],
  areMenuItemsOpen: MenuItemsOpenState,
  menuItemOpened: MenuItemOpened,
  keyIsDown: KeyDownState,
  showCopyDialog: ShowCopyDocRefDialog,
  showMoveDialog: ShowCopyDocRefDialog,
  selectedItems: MenuItemType[],
  focussedItem?: MenuItemType,
  depth: number = 0,
) =>
  menuItems.map(menuItem => (
    <React.Fragment key={menuItem.key}>
      <MenuItem
        keyIsDown={keyIsDown}
        selectedItems={selectedItems}
        focussedItem={focussedItem}
        className={`sidebar__text-color ${isCollapsed ? "collapsed" : ""} ${
          depth > 0 ? "child" : ""
        }`}
        key={menuItem.key}
        menuItem={menuItem}
        depth={depth}
        isCollapsed={isCollapsed}
        showCopyDialog={showCopyDialog}
        showMoveDialog={showMoveDialog}
        menuItemOpened={menuItemOpened}
        areMenuItemsOpen={areMenuItemsOpen}
      />
      {/* TODO: we only want the 'children' class on the first set of children. We're using it to pad the bottom. Any better ideas? */}
      {menuItem.children && areMenuItemsOpen[menuItem.key] ? (
        <div className={`${depth === 0 ? "sidebar__children" : ""}`}>
          {getMenuItems(
            isCollapsed,
            menuItem.children,
            areMenuItemsOpen,
            menuItemOpened,
            keyIsDown,
            showCopyDialog,
            showMoveDialog,
            selectedItems,
            focussedItem,
            depth + 1,
          )}
        </div>
      ) : (
        undefined
      )}
    </React.Fragment>
  ));

const AppChrome: React.FunctionComponent<Props> = ({ content }) => {
  const { theme } = useTheme();

  const {
    router: { location },
  } = useRouter();
  const { documentTree, copyDocuments, moveDocuments } = useDocumentTree();

  const {
    value: areMenuItemsOpen,
    setValue: setOpenMenuItems,
  } = useLocalStorage<MenuItemsOpenState>(
    "app-chrome-menu-items-open",
    {},
    useStoreObjectFactory<MenuItemsOpenState>(),
  );
  const menuItemOpened: MenuItemOpened = (name: string, isOpen: boolean) => {
    setOpenMenuItems({
      ...areMenuItemsOpen,
      [name]: isOpen,
    });
  };

  const { value: isExpanded, setValue: setIsExpanded } = useLocalStorage(
    "isExpanded",
    true,
    storeBoolean,
  );

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

  const menuItems: MenuItemType[] = [
    {
      key: "welcome",
      title: "Welcome",
      onClick: goToWelcome,
      icon: "home",
      style: "nav",
      isActive:
        !!location && location.pathname.includes(`${PATH_PREFIX}/welcome/`),
    },
    getDocumentTreeMenuItems(goToEditDocRef, undefined, documentTree),
    {
      key: "data",
      title: "Data",
      onClick: goToDataViewer,
      icon: "database",
      style: "nav",
      isActive: !!location && location.pathname.includes(`${PATH_PREFIX}/data`),
    },
    {
      key: "processing",
      title: "Processing",
      onClick: goToProcessing,
      icon: "play",
      style: "nav",
      isActive:
        !!location && location.pathname.includes(`${PATH_PREFIX}/processing`),
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
      isActive:
        !!location &&
        (location.pathname.includes(`${PATH_PREFIX}/indexing/volumes`) ||
          location.pathname.includes(`${PATH_PREFIX}/indexing/groups`)),
      children: [
        {
          key: "indexing-volumes",
          title: "Index Volumes",
          onClick: goToIndexVolumes,
          icon: "database",
          style: "nav",
          isActive:
            !!location &&
            location.pathname.includes(`${PATH_PREFIX}/indexing/volumes`),
        },
        {
          key: "indexing-groups",
          title: "Index Groups",
          onClick: goToIndexVolumeGroups,
          icon: "database",
          style: "nav",
          isActive:
            !!location &&
            location.pathname.includes(`${PATH_PREFIX}/indexing/groups`),
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
      isActive:
        !!location &&
        (location.pathname.includes("/s/me") ||
          location.pathname.includes("/s/users") ||
          location.pathname.includes("/s/apikeys")),
      children: [
        {
          key: "admin-me",
          title: "Me",
          onClick: goToUserSettings,
          icon: "user",
          style: "nav",
          isActive: !!location && location.pathname.includes("/s/me"),
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
            key: `admin-permissions-${isGroup}`,
            title: isGroup ? "Group" : "User",
            onClick: () => goToAuthorisationManager(isGroup),
            icon: "user" as IconProp,
            style: "nav",
            isActive:
              !!location &&
              location.pathname.includes(`/s/authorisationManager/${isGroup}`),
          })) as MenuItemType[],
        },
        {
          key: "admin-users",
          title: "Users",
          onClick: goToUsers,
          icon: "users",
          style: "nav",
          isActive: !!location && location.pathname.includes("/s/users"),
        },
        {
          key: "admin-apikeys",
          title: "API Keys",
          onClick: goToApiKeys,
          icon: "key",
          style: "nav",
          isActive: !!location && location.pathname.includes("/s/apikeys"),
        },
      ],
    },
  ];
  const openMenuItems = getOpenMenuItems(menuItems, areMenuItemsOpen);

  const {
    onKeyDownWithShortcuts,
    toggleSelection,
    selectedItems,
    focussedItem,
    keyIsDown,
  } = useSelectableItemListing<MenuItemType>({
    items: openMenuItems,
    getKey: m => m.key,
    openItem: m => m.onClick(),
    enterItem: m => menuItemOpened(m.key, true),
    goBack: m => {
      if (m) {
        if (areMenuItemsOpen[m.key]) {
          menuItemOpened(m.key, false);
        } else if (!!m.parentDocRef) {
          // Can we bubble back up to the parent folder of the current selection?
          let newSelection = openMenuItems.find(
            ({ key }: MenuItemType) =>
              !!m.parentDocRef && key === m.parentDocRef.uuid,
          );
          if (!!newSelection) {
            toggleSelection(newSelection.key);
          }
          menuItemOpened(m.parentDocRef.uuid, false);
        }
      }
    },
  });

  const {
    showDialog: showCopyDialog,
    componentProps: copyDialogComponentProps,
  } = useCopyMoveDocRefDialog(copyDocuments);
  const {
    showDialog: showMoveDialog,
    componentProps: moveDialogComponentProps,
  } = useCopyMoveDocRefDialog(moveDocuments);

  const sidebarClassName = isExpanded
    ? "app-chrome__sidebar--expanded"
    : "app-chrome__sidebar--collapsed";
  return (
    <div className={`app-container ${theme}`}>
      <div className="app-chrome flat">
        <CopyMoveDocRefDialog {...copyDialogComponentProps} />
        <CopyMoveDocRefDialog {...moveDialogComponentProps} />
        <div className={`app-chrome__sidebar raised-high ${sidebarClassName}`}>
          <React.Fragment>
            <div
              className="app-chrome__sidebar_header header"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <FontAwesomeIcon
                aria-label="Show/hide the sidebar"
                className="menu-item__menu-icon sidebar__toggle sidebar__menu-item borderless "
                icon="bars"
                size="2x"
              />
              {isExpanded ? (
                <img
                  className="sidebar__logo"
                  alt="Stroom logo"
                  src={require("../../images/logo.svg")}
                />
              ) : (
                undefined
              )}
            </div>
            <div
              tabIndex={0}
              onKeyDown={onKeyDownWithShortcuts}
              className="app-chrome__sidebar-menu raised-high"
              data-simplebar
            >
              <div className="app-chrome__sidebar-menu__container">
                {getMenuItems(
                  !isExpanded,
                  menuItems,
                  areMenuItemsOpen,
                  menuItemOpened,
                  keyIsDown,
                  showCopyDialog,
                  showMoveDialog,
                  selectedItems,
                  focussedItem,
                )}
              </div>
            </div>
          </React.Fragment>
        </div>
        <div className="app-chrome__content">
          <div className="content-tabs">
            <div className="content-tabs__content">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppChrome;
