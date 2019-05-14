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

const InlineInput: React.FunctionComponent<{ value?: string }> = ({
  value: defaultValue,
  ...rest
}) => {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [editingValue, setEditingValue] = useState(defaultValue);
  if (isEditing) {
    return (
      <input
        autoFocus={true}
        className="inline-input__editing"
        onBlur={() => {
          // Blurring sets the value
          setValue(editingValue);
          setEditing(false);
        }}
        onChange={event => {
          const newValue = event.target.value;
          setEditingValue(newValue);
        }}
        type="text"
        value={editingValue}
        onKeyDown={event => {
          if (event.key === "Enter") {
            event.preventDefault();
            // 'Enter' sets the value
            setValue(editingValue);
            setEditing(false);
          } else if (event.key === "Escape") {
            event.preventDefault();
            // 'Escape' does not set the value, and we need to update the
            // editing value to the original.
            setEditing(false);
            setEditingValue(value);
          }
        }}
        {...rest}
      />
    );
  } else {
    const textToDisplay = !!value ? value : "click to edit";
    return (
      <span
        className="inline-input__not-editing"
        onClick={() => setEditing(true)}
      >
        {textToDisplay}
      </span>
    );
  }
};

export default InlineInput;
