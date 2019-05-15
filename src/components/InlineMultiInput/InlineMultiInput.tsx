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
import InlineInput from "components/InlineInput/InlineInput";
import * as React from "react";
import { ControlledInput } from "lib/useForm/types";
import useListReducer from "lib/useListReducer";

const getKey = (k: string) => k;

interface ValueAndChangeHandler {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onRemove: () => void;
}

const InlineMultiInput: React.FunctionComponent<ControlledInput<string[]>> = ({
  onChange,
  value: values,
  ...rest
}) => {
  // Use the standard list reducer to manage the items
  const {
    items,
    itemAdded,
    itemAtIndexUpdated,
    itemAtIndexRemoved,
  } = useListReducer<string>(getKey, values);

  // New values are empty strings by default
  const addNewValue = React.useCallback(() => itemAdded(""), [itemAdded]);

  // When the items change in the list, we call the onChange handler
  React.useEffect(() => onChange(items), [onChange, items]);

  // Create memoized versions of the onChange and onRemove functions for each item
  const valuesOnChangeHandlers: ValueAndChangeHandler[] = React.useMemo(
    () =>
      values.map((value, valueIndex) => ({
        onChange: ({
          target: { value: newValue },
        }: React.ChangeEvent<HTMLInputElement>) =>
          itemAtIndexUpdated(valueIndex, newValue),
        onRemove: () => itemAtIndexRemoved(valueIndex),
        value,
      })),
    [values, itemAtIndexUpdated, itemAtIndexRemoved],
  );

  return (
    <span>
      [
      {valuesOnChangeHandlers.map(({ value, onChange, onRemove }, index) => (
        <React.Fragment key={index}>
          <InlineInput value={value} onChange={onChange} {...rest} />
          <Button
            type="button"
            size="small"
            appearance="icon"
            action="secondary"
            text="Remove"
            icon="times"
            title="Remove"
            onClick={onRemove}
          />
          {index !== values.length - 1 ? <span>,{"\u00A0"}</span> : undefined}
        </React.Fragment>
      ))}
      <Button
        size="small"
        type="button"
        appearance="icon"
        action="primary"
        text="Add"
        icon="plus"
        title="Add"
        onClick={addNewValue}
      />
      ]
    </span>
  );
};

export default InlineMultiInput;
