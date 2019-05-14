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

  const remainingOptions = options.filter(option => selectedItems.indexOf(option.value) < 0);
  // console.log({remainingOptions});
  return (
    <span>
      [
      {selectedItems.map((selectedItem, index) => {
        const thisSelectsOptions = Object.assign([], remainingOptions);
        thisSelectsOptions.push(options.find(option => option.value === selectedItem));
        console.log({thisSelectsOptions});
        return (
          <React.Fragment key={selectedItem}>
            <InlineSelect
              options={thisSelectsOptions}
              selected={selectedItem}
              onChange={handleChange}
              {...rest}
            />
            {index !== options.length - 1 ? 
            <span>,{"\u00A0"}</span> : undefined }
          </React.Fragment>

        )
      })}

      {remainingOptions.length > 0 ?
      <InlineSelect {...rest} options={remainingOptions} emitOnly={true}
        onChange={handleChange} />
        : undefined}

      ]
    </span>
  )
};

export default InlineMultiSelect;
