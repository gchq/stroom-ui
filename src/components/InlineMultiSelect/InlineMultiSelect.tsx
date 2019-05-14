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
  simpleOptions?: string[];
  onChange?: (event: string) => void;
  selected?: string[];
}

const InlineMultiSelect: React.FunctionComponent<Props> = ({
  options,
  simpleOptions,
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

  const remainingOptions = options.filter(option => selectedItems.indexOf(option.value) <= 0);
  return (
    <span>
      [
      {selectedItems.map((selectedItem, index) => {
        return (
          <React.Fragment key={selectedItem}>
            <InlineSelect
              options={options}
              selected={selectedItem}
              onChange={handleChange}
              {...rest}
            />
            ,{"\u00A0"}
          </React.Fragment>

        )
      })}
      <InlineSelect {...rest} options={options} emitOnly={true}
        onChange={handleChange} />

      ]
    </span>
  )
};

export default InlineMultiSelect;
