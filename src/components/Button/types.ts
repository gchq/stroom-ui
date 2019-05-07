import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type IconSize = "small" | "medium" | "large" | "xlarge";

export enum ButtonAppearance {
  Normal,
  Text,
  Outline,
  Icon,
}

export enum ButtonAction {
  Default,
  Primary,
  Secondary,
}

/**
 * Button Properties
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The Font Awesome Icon to use */
  icon?: IconProp;
  /** Indicates how to style the button within a group (left | middle | right)  */
  groupPosition?: string;
  /** Choose the button appearance */
  appearance?: ButtonAppearance;
  /** Choose the button action */
  action?: ButtonAction;
  /** Place this text on the button */
  text?: string;
  /** Indicate the button has been selected */
  selected?: boolean;
  /** Indicate the button has been disabled */
  disabled?: boolean;
  /** Custom additional class to apply to the button */
  className?: string;
  /** The size of the icon*/
  size?: IconSize;
}
