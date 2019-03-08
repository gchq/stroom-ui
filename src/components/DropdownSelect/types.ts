import { OptionType } from "../../types";

export interface DropdownOptionProps {
  option: OptionType;
  inFocus: boolean;
  onClick: () => void;
}
