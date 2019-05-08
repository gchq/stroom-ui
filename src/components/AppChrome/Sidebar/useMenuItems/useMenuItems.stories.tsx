import * as React from "react";
import { storiesOf } from "@storybook/react";

import useMenuItems from "./useMenuItems";
import JsonDebug from "testing/JsonDebug";
import {
  MenuItemType,
  MenuItemsOpenState,
  MenuItemToggled,
} from "../MenuItem/types";

interface MenuItemListProps {
  menuItems: MenuItemType[];
  areMenuItemsOpen: MenuItemsOpenState;
  menuItemToggled: MenuItemToggled;
}

const MenuItemList: React.FunctionComponent<MenuItemListProps> = ({
  menuItems,
  areMenuItemsOpen,
  menuItemToggled,
}) => (
  <ul>
    {menuItems.map(({ key, title, children }) => (
      <li key={key}>
        {!!children ? (
          <span onClick={() => menuItemToggled(key)}>
            {title} - {areMenuItemsOpen[key] ? "OPEN" : "CLOSED"}
          </span>
        ) : (
          <span>{title}</span>
        )}
        {children && areMenuItemsOpen[key] && (
          <MenuItemList
            {...{ areMenuItemsOpen, menuItemToggled }}
            menuItems={children}
          />
        )}
      </li>
    ))}
  </ul>
);

const TestHarness: React.FunctionComponent = () => {
  const {
    menuItems,
    areMenuItemsOpen,
    openMenuItems,
    menuItemToggled,
  } = useMenuItems();

  return (
    <div>
      <p>
        Click on the title of a folder to expand it. Be aware leaf nodes will
        not be shown.
      </p>
      <MenuItemList {...{ menuItems, areMenuItemsOpen, menuItemToggled }} />
      <JsonDebug value={{ areMenuItemsOpen, openMenuItems }} />
    </div>
  );
};

storiesOf("App Chrome/Sidebar/useMenuItems", module).add("test", () => (
  <TestHarness />
));
