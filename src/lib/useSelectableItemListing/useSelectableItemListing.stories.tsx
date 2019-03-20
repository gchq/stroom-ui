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
import * as uuidv4 from "uuid/v4";
import { useState } from "react";
import { storiesOf } from "@storybook/react";

import useSelectableItemListing from "./useSelectableItemListing";
import { SelectionBehaviour } from "./enums";
import JsonDebug from "../../testing/JsonDebug";

type Animal = {
  uuid: string;
  species: string;
  name: string;
};

let initialAnimals: Array<Animal> = [
  {
    uuid: uuidv4(),
    species: "Dog",
    name: "Rover"
  },
  {
    uuid: uuidv4(),
    species: "Cat",
    name: "Tiddles"
  },
  {
    uuid: uuidv4(),
    species: "Mouse",
    name: "Pixie"
  },
  {
    uuid: uuidv4(),
    species: "Tyrannosaurus Rex",
    name: "Fluffy"
  }
];

const TestList = () => {
  const [lastAction, setLastAction] = useState<string>("no action");
  const [externalSelectedItems, setExternalSelectedItems] = useState<
    Array<Animal>
  >([]);

  const {
    onKeyDownWithShortcuts,
    selectedItemIndexes,
    focusIndex,
    toggleSelection
  } = useSelectableItemListing<Animal>({
    getKey: a => a.name,
    openItem: a => setLastAction(`Opened Item ${a.name}`),
    items: initialAnimals,
    selectionBehaviour: SelectionBehaviour.MULTIPLE,
    onSelectionChanged: setExternalSelectedItems
  });

  return (
    <div tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
      <h3>Test Selectable Item Listing</h3>
      <ul>
        {initialAnimals.map((animal, i) => (
          <li
            key={i}
            onClick={() => toggleSelection(animal.name)}
            style={{
              borderStyle: focusIndex === i ? "solid" : "none",
              backgroundColor: selectedItemIndexes.has(i)
                ? "lightblue"
                : "white"
            }}
          >
            {animal.species} - {animal.name}
          </li>
        ))}
      </ul>
      <JsonDebug value={{ lastAction, externalSelectedItems }} />
    </div>
  );
};

storiesOf("Custom Hooks/useSelectableItemListing", module).add(
  "A List",
  TestList
);
