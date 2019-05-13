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
  options: SelectOption;
  selected?: string;
}

export interface SelectOption {
  [key: string]: string;
}

const InlineSelect: React.FunctionComponent<Props> = ({
  options,
  selected,
  ...rest
}) => {
  const [isEditing, setEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selected);
  if (isEditing) {
    return (
      <select
        className="inline-select__editing"
        onBlur={() => setEditing(false)}
        onChange={event => {
          const value = event.target.value;
          setSelectedItem(value);
          setEditing(false);
        }}
        value={selectedItem}
        {...rest}
      >
        {Object.keys(options).map(name => {
          return (
            <option key={name} value={name}>
              {options[name]}
            </option>
          );
        })}
      </select>
    );
  } else {
    const textToDisplay = !!selectedItem
      ? options[selectedItem]
      : "click to choose";
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
