import { ThemeInterface, ThemeDefaults } from "./types";

// These variables are lighter version of the Stroom blue.
// We might need additional colours, e.g. border colour
//    The main colour of an item when selected.
// $selected-item-colour: rgb(224, 240, 255);
// //    The hover colour of an item that might be selecter.
// $hover-item-colour: rgb(247, 251, 255);
// $low-priority-component-color: rgb(152, 155, 160);
// $low-priority-component-color-hover: rgb(118, 121, 126);
// $dark-grey: #4d5250;
// $primary-bg-colour: #2185d0;
// $primary-text-colour: white;
// $very-light-grey: #eeeeee;

const theme: ThemeInterface = {
  ...ThemeDefaults,
  // General
  backgroundColor: "#fff",
  textColor: "rgba(0, 0, 0, 0.8)",
  textColor_deemphasised: `#fff`,
  selectedColor: `#cae1f1`,
  focussedColor: `#809db1`,
  hoverColor: `#e8e8e8`,
  raisedLow_backgroundColor: `#e4e4e4`,
  raisedHigh_backgroundColor: `#2185d0`,
  raisedHigh_selectedBackgroundColor: `#1c70b1`,
  raisedElement_border: `1px solid #fff`,
  border: `1px solid #dfe0e1`,
  // Specific
  sidebar_headerColor: `#fff`,
  header_iconColor: `#2185d0`,
  dropdown_backgroundColor: `#fff`,
  dropdown_border: `1px solid #dfe0e1`,
  dropdown_hoverColor: `#dfe0e1`,
  breadcrumb_divider__color: `black`,
  breadcrumb_section__color: `black`,
  breadcrumb_sectionActive__color: `black`,
  iconButton_border: `none`,
  iconButton_backgroundColor: `#e4e4e4`,
  iconButton_backgroundColor_hover: `#a8a8a8`,
  iconButton_color: `#4d5250`,
  iconButton_color_hover: `black`,
  scrollbar_trackColor: `#d3d3d3`,
  scrollbar_thumbColor: `#a7a6a6`
};

export default theme;
