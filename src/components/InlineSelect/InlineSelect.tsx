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

import Button from "components/Button";
import * as React from "react";
import { FunctionComponent, SelectHTMLAttributes, useState } from "react";

interface Props {
  options?: SelectOption[];
  selected?: string;
  placeholder?: string;
  usePlaceholderButton?: boolean;
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

const InlineSelect: FunctionComponent<Props & SelectHTMLAttributes<HTMLSelectElement>> = ({
  options,
  onChange,
  selected,
  placeholder,
  usePlaceholderButton,
  emitOnly,
  ...rest
}) => {
  const [isEditing, setEditing] = useState(false);

  if (isEditing) {
    return (
      <select
        className="inline-select__editing"
        onBlur={() => setEditing(false)}
        onChange={onChange}
        value={selected}
        {...rest}
      >
        <option disabled selected value={undefined}>--please select--</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else {
    let placeholderText = placeholder || <em>click to choose</em>
    const placeholderButton = <Button
              size="small"
              appearance="icon"
              action="primary"
              text="Add"
              icon="plus"
              title="Add"
            />
    let textToDisplay: string = undefined;
    if (!!selected) {
      const selectedOption = options.find(
        option => option.value === selected,
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
        {textToDisplay || (usePlaceholderButton ? placeholderButton : placeholderText)}
      </span>
    );
  }
};

export default InlineSelect;
