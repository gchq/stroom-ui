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

import * as React from "react";
import { useState } from "react";

interface Props {
  options?: SelectOption[];
  simpleOptions?: string[];
  onChange?: (event: string) => void;
  selected?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

const InlineSelect: React.FunctionComponent<Props> = ({
  options,
  simpleOptions,
  onChange,
  selected,
  ...rest
}) => {
  const [isEditing, setEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selected);

  if (!!simpleOptions) {
    options = simpleOptions.map(option => ({ value: option, label: option }));
  }

  if (isEditing) {
    return (
      <select
        className="inline-select__editing"
        onBlur={() => setEditing(false)}
        onChange={event => {
          const value = event.target.value;
          setSelectedItem(value);
          setEditing(false);
          if (!!onChange) {
            onChange(event.target.value);
          }
        }}
        value={selectedItem}
        {...rest}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else {
    let textToDisplay = "click to choose";
    if (!!selectedItem) {
      const selectedOption = options.find(
        option => option.value === selectedItem,
      );
      textToDisplay = !!selectedOption
        ? selectedOption.label
        : "Error: unknown option!";
    }
    return (
      <span
        className="inline-select__not-editing"
        onClick={() => setEditing(true)}
      >
        {textToDisplay}
      </span>
    );
  }
};

export default InlineSelect;
