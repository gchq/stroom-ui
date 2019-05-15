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
import InlineSelect, { SelectOption } from "components/InlineSelect/InlineSelect";
import useListReducer from "lib/useListReducer";
import * as React from "react";
import { ChangeEvent, useEffect, useMemo } from "react";

const getKey = (k: string) => k;

interface ValueAndChangeHandler {
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  onRemove: () => void;
}

interface Props {
  options?: SelectOption[];
  selected?: string[];
  onChange?: (selectOptions: string[]) => void;
}

const InlineMultiSelect: React.FunctionComponent<Props> = ({
  options,
  selected,
  onChange,
  ...rest
}) => {
  // Use the standard list reducer to manage the items
  const {
    items,
    addItem,
    updateItemAtIndex,
    removeItemAtIndex,
  } = useListReducer<string>(getKey, selected);

  // const {
  //   items: selectedItems,
  //   addItem: addSelectedItem,
  //   updateItemAtIndex: updateSelectedItemAtIndex,
  //   removeItemAtIndex: removeSelectedItemAtIndex,
  // } = useListReducer<SelectOption>(getKey, options);
  // const addNewItem = useCallback(() => addItem({}), [addItem]);

  useEffect(() => onChange(items), [onChange, items]);

  const valuesAndChangeHandlers: ValueAndChangeHandler[] = useMemo(
    () => 
    selected.map((value, valueIndex) => ({
      onChange: ({target: {value:newValue}}: ChangeEvent<HTMLSelectElement>) =>
        updateItemAtIndex(valueIndex, newValue),
        onRemove: () => removeItemAtIndex(valueIndex),
        value
      })),
      [selected, updateItemAtIndex, removeItemAtIndex],
    );

  // const [selectedItems, setSelectedItems] = React.useState(selected);
  // const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //   const value = event.target.value;
  //   selectedItems.push(value);
  //   const newSelectedItems = Object.assign([], selectedItems);
  //   setSelectedItems(newSelectedItems);
  //   if (!!onChange) {
  //     onChange(value);
  //   }
  // };

  // We only want to allow something to be selected once, so we need to
  // work out what options are remaining...
  const remainingOptions = options.filter(
    option => items.indexOf(option.value) < 0,
  );
  return (
    <span>
      [
      {/* {selectedItems.map((selectedItem, index) => { */}
      {valuesAndChangeHandlers.map(({value, onChange, onRemove}, index) => {
        //... but we must have this option present in the list, otherwise
        // it can't be selected
        const thisSelectsOptions = Object.assign([], remainingOptions);
        thisSelectsOptions.push(
          options.find(option => option.value === value),
        );
        return (
          <React.Fragment key={index}>
            <InlineSelect
              options={thisSelectsOptions}
              selected={value}
              // selected={options.find(option => option.value === value)}
              onChange={onChange}
              {...rest}
            />
            <Button
              size="small"
              appearance="icon"
              action="secondary"
              text="Remove"
              icon="times"
              title="Remove"
              onClick={onRemove}
              // onClick={() => {
              //   const newSelectedItems = selectedItems.filter(
              //     item => item !== selectedItem,
              //   );
              //   setSelectedItems(newSelectedItems);
              // }}
            />
            {/* we only want to display this if we're not at the end of the list */}
            {index !== options.length - 1 ? (
              <span>,{"\u00A0"}</span>
            ) : (
              undefined
            )}
          </React.Fragment>
        );
      })}
      {/* We only want to display this if there are options left to select */}
      {remainingOptions.length > 0 ? (
        <InlineSelect
          usePlaceholderButton={true}
          options={remainingOptions}
          emitOnly={true}
          // onChange={addNewItem}
          {...rest}
        />
      ) : (
        undefined
      )}
      ]
    </span>
  );
};

export default InlineMultiSelect;
