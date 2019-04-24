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
import { storiesOf } from "@storybook/react";

import useSelectableItemListing from "./useSelectableItemListing";
import { SelectionBehaviour } from "./enums";
import JsonDebug from "testing/JsonDebug";
import Button from "components/Button";
import useTestAnimals, { Animal } from "./useTestAnimals";

const TestList = () => {
  const [lastAction, setLastAction] = React.useState<string>("no action");
  const [externalSelectedItem, setExternalSelectedItem] = React.useState<
    Animal | undefined
  >(undefined);
  const { animals, preFocusWrap, reset } = useTestAnimals();

  const {
    onKeyDownWithShortcuts,
    selectedItemIndexes,
    selectedItem,
    focusIndex,
    toggleSelection,
  } = useSelectableItemListing({
    getKey: a => a.name,
    openItem: a => setLastAction(`Opened Item ${a.name}`),
    items: animals,
    selectionBehaviour: SelectionBehaviour.MULTIPLE,
    preFocusWrap,
  });

  // Demonstrates how to 'watch' for selection changes
  React.useEffect(() => setExternalSelectedItem(selectedItem), [
    selectedItem,
    setExternalSelectedItem,
  ]);

  return (
    <div tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
      <h3>Test Selectable Item Listing</h3>
      <Button text="Reset" onClick={reset} />
      <ul>
        {animals.map((animal, i) => (
          <li
            key={i}
            onClick={() => toggleSelection(animal.name)}
            style={{
              borderStyle: focusIndex === i ? "solid" : "none",
              backgroundColor: selectedItemIndexes.has(i)
                ? "lightblue"
                : "white",
            }}
          >
            {animal.species} - {animal.name}
          </li>
        ))}
      </ul>
      <JsonDebug value={{ lastAction, externalSelectedItem }} />
    </div>
  );
};

storiesOf("lib/useSelectableItemListing", module).add("A List", TestList);
