import * as React from "react";
import { SubMenuProps } from "../types";
import { MenuItemType } from "../../MenuItem/types";

const useDataViewerMenu = ({
  navigateApp: { goToDataViewer },
}: SubMenuProps): MenuItemType =>
  React.useMemo(
    () => ({
      key: "data",
      title: "Data",
      onClick: goToDataViewer,
      icon: "database",
      style: "nav",
    }),
    [goToDataViewer],
  );

export default useDataViewerMenu;
