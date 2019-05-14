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

import InlineSelect, { SelectOption } from "components/InlineSelect/InlineSelect";
import * as React from "react";
import { ChangeEvent } from "react";

interface Props {
  options?: SelectOption[];
  onChange?: (event: string) => void;
  selected?: string[];
}

const InlineMultiSelect: React.FunctionComponent<Props> = ({
  options,
  onChange,
  selected,
  ...rest
}) => {
  const [selectedItems, setSelectedItems] = React.useState(selected);
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    selectedItems.push(value);
    const newSelectedItems = Object.assign([], selectedItems);
    setSelectedItems(newSelectedItems);
    if (!!onChange) {
      onChange(value);
    }
  }

  // We only want to allow something to be selected once, so we need to
  // work out what options are remaining...
  const remainingOptions = options.filter(option => selectedItems.indexOf(option.value) < 0);
  return (
    <span>
      [
      {selectedItems.map((selectedItem, index) => {
        //... but we must have this option present in the list, otherwise
        // it can't be selected
        const thisSelectsOptions = Object.assign([], remainingOptions);
        thisSelectsOptions.push(
          options.find(option => option.value === selectedItem));
        return (
          <React.Fragment key={selectedItem}>
            <InlineSelect
              options={thisSelectsOptions}
              selected={selectedItem}
              onChange={handleChange}
              {...rest}
            />

            {/* we only want to display this if we're not at the end of the list */}
            {index !== options.length - 1 ?
              <span>,{"\u00A0"}</span> : undefined}
          </React.Fragment>

        )
      })}

      {/* We only want to display this if there are options left to select */}
      {remainingOptions.length > 0 ?
        <InlineSelect
          options={remainingOptions}
          emitOnly={true}
          onChange={handleChange}
          {...rest}
        />
        : undefined}

      ]
    </span>
  )
};

export default InlineMultiSelect;
