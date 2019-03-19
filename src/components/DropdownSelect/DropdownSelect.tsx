import * as React from "react";
import { useState } from "react";

import DefaultDropdownOption from "./DefaultDropdownOption";
import { OptionType, ControlledInput } from "../../types";
import useSelectableItemListing from "../../lib/useSelectableItemListing";
import { DropdownOptionProps } from "./types";
import { StyledDropdown, StyledDropdownContent } from "../../styled/Dropdown";

interface Props extends ControlledInput<string> {
  options: Array<OptionType>;
  OptionComponent?: React.ComponentType<DropdownOptionProps>;
}

let DropdownSelect = ({
  options,
  OptionComponent = DefaultDropdownOption,
  onChange,
  value
}: Props) => {
  const [textFocus, setTextFocus] = useState<boolean>(false);
  const [searchTerm, onSearchTermChange] = useState<string>("");

  const onSearchKeyDown: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value }
  }) => onSearchTermChange(value);
  let optionsToUse = options.filter(
    d =>
      searchTerm.length === 0 ||
      d.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  let valueToShow = textFocus ? searchTerm : value;

  const { focussedItem, onKeyDownWithShortcuts } = useSelectableItemListing({
    items: optionsToUse,
    openItem: v => onChange(v.value),
    getKey: v => v.value
  });

  return (
    <StyledDropdown>
      <input
        onFocus={() => setTextFocus(true)}
        onBlur={() => setTextFocus(false)}
        placeholder="Select a type"
        value={valueToShow}
        onChange={onSearchKeyDown}
      />
      <StyledDropdownContent tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
        {optionsToUse.map(option => (
          <OptionComponent
            key={option.value}
            inFocus={focussedItem && focussedItem.value === option.value}
            onClick={() => onChange(option.value)}
            option={option}
          />
        ))}
      </StyledDropdownContent>
    </StyledDropdown>
  );
};

export default DropdownSelect;
