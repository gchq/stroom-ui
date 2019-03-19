import styled, { css } from "../../styled/styled-components";

import {
  flat,
  raisedHigh,
  header,
  borderless
} from "../../styled/ThemeStyling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StyledAppContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const StyledAppChrome = styled.div`
  ${flat}
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const StyledAppChrome_sidebar = styled.div`
  ${raisedHigh}
  height: inherit;
  position: relative;
`;

export const StyledAppChrome_sidebar_expanded = styled(StyledAppChrome_sidebar)`
  width: 20rem;
`;
export const StyledAppChrome_sidebar_collapsed = styled(
  StyledAppChrome_sidebar
)`
  width: 2.5rem;
`;

export const StyledAppChrome_sidebarMenu = styled.div`
  overflow-y: auto;
  position: absolute;
  height: calc(100% - 2.2rem);
  width: 100%;
`;

export const StyledAppChrome_sidebarMenuContainer = styled.div`
  outline: none;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const StyledAppChrome_sidebarButtons = styled.div`
  & .button {
    color: white;
  }
`;

export const StyledAppChrome_sidebarHeader = styled.div`
  ${header}
  position: relative;
  height: 2.2rem;
`;

export const sidebarLogo = css`
  & svg path {
    fill: ${({ theme }) => theme.sidebar_headerColor};
  }
`;

export const sidebarMenuItem = css`
  color: ${({ theme }) => theme.textColor_deemphasised};
  display: inline-flex;
  outline: none;
  width: 100%;

  &.is-active {
    background-color: ${({ theme }) =>
      theme.raisedHigh_selectedBackgroundColor};
  }

  &.nav:hover {
    background-color: ${({ theme }) =>
      theme.raisedHigh_selectedBackgroundColor};
  }

  &.doc:hover {
    background-color: ${({ theme }) =>
      theme.raisedHigh_selectedBackgroundColor};
  }

  &.nav {
    padding: 0.35rem 0 0.35rem 0.1rem;
    color: white;
    outline: inherit;
    white-space: nowrap;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }

  &.doc {
    color: white;
    outline: inherit;
    white-space: nowrap;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }

  &.selected {
    font-weight: bold;
  }

  &.doc.dnd-over {
    font-weight: italic;
  }

  &.doc {
    font-size: 0.85rem;
  }

  &.doc.collapsed {
    padding: 0 0 0 0.1rem;
  }

  &.child.collapsed {
    padding-left: 0;
  }

  &.nav.collapsed {
  }

  &.doc.can-drop {
    color: green;
  }
  &.doc.cannot-drop {
    color: red;
  }
`;

export const menuItem_menuIcon = styled.div`
  padding: 0 0.3125rem 0 0.4125rem;
`;

export const SidebarFontAwesomeIcon = styled(FontAwesomeIcon)`
  width: 1.5rem;

  ${borderless}
  ${sidebarMenuItem}
  ${menuItem_menuIcon}
`;

export const sidebar_children = css`
  margin-bottom: 0.4rem;
`;

/*

.app-chrome__content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.content-tabs {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.content-tabs__content {
  position: absolute;
  width: 100%;
  display: flex;
  flex-flow: column;
  height: 100%;
}

.app-chrome__content .ui.grid {
  margin: 0;
}

.content-tabs__grid {
  display: block;
}

.app-chrome__content .ui.grid .column {
  padding: 0.3rem;
}

.content-tabs__close-btn {
  border: none;
}

.content-tabs__close-btn:hover {
  color: red;
}

.sidebar__logo {
  display: inline;
  align-items: center;
  position: absolute;
  left: 40px;
}

.menu-item__menu-icon {
}

&.has-children--open {
  padding-bottom: 0;
}

.menu-item__text {
  padding-left: 0.65rem;
}
*/
