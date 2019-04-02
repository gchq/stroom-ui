import * as React from "react";
import { useState } from "react";

import DefaultDropdownOption from "./DefaultDropdownOption";
import { OptionType, ControlledInput } from "src/types";
import useSelectableItemListing from "src/lib/useSelectableItemListing";
import { DropdownOptionProps } from "./types";

interface Props extends ControlledInput<string> {
  options: OptionType[];
  OptionComponent?: React.ComponentType<DropdownOptionProps>;
}

let DropdownSelect = ({
  options,
  OptionComponent = DefaultDropdownOption,
  onChange,
  value,
}: Props) => {
  const [textFocus, setTextFocus] = useState<boolean>(false);
  const [searchTerm, onSearchTermChange] = useState<string>("");

  const onSearchKeyDown: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => onSearchTermChange(value);
  let optionsToUse = options.filter(
    d =>
      searchTerm.length === 0 ||
      d.text.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  let valueToShow = textFocus ? searchTerm : value;

  const { focussedItem, onKeyDownWithShortcuts } = useSelectableItemListing({
    items: optionsToUse,
    openItem: v => onChange(v.value),
    getKey: v => v.value,
  });

  return (
    <div className="dropdown">
      <input
        onFocus={() => setTextFocus(true)}
        onBlur={() => setTextFocus(false)}
        placeholder="Select a type"
        value={valueToShow}
        onChange={onSearchKeyDown}
      />
      <div
        tabIndex={0}
        onKeyDown={onKeyDownWithShortcuts}
        className="dropdown__content"
      >
        {optionsToUse.map(option => (
          <OptionComponent
            key={option.value}
            inFocus={focussedItem && focussedItem.value === option.value}
            onClick={() => onChange(option.value)}
            option={option}
          />
        ))}
      </div>
    </div>
  );
};

export default DropdownSelect;
