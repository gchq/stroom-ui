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
import { ChangeEvent, useState } from "react";

interface Props {
  options?: SelectOption[];
  // 'select' components demand value/label pairs for their options
  // But some clients don't care about the labels, so we can let 
  // them pass an array of values and we'll map them into the
  // array of SelectOptions.
  simpleOptions?: string[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  selected?: string;
  placeholder?: string;
  // emitOnly has a very specific purpose: it allows this select to remain
  // as it was after it's been selected, and all it does is dispatch the 
  // onChange event with the item that was selected. This is necessary
  // for the multi-select.
  emitOnly?: boolean; 
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
  placeholder,
  emitOnly,
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
            onChange(event);
          }
          if(emitOnly){
            setSelectedItem(undefined);
          }
        }}
        value={selectedItem}
        {...rest}
      >
        <option disabled selected value={undefined}></option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else {
    let defaultText = placeholder || <em>click to choose</em>
    let textToDisplay: string = undefined;
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
        {textToDisplay || defaultText}
      </span>
    );
  }
};

export default InlineSelect;
