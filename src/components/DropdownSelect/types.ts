import { OptionType } from "src/types";

export interface DropdownOptionProps {
  option: OptionType;
  inFocus: boolean;
  onClick: () => void;
}
