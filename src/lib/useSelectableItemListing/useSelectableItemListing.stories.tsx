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
import { storiesOf } from "@storybook/react";

import StroomDecorator from "../storybook/StroomDecorator";
import useSelectableItemListing, {
  SelectionBehaviour,
  useSelectableReactTable
} from "./useSelectableItemListing";
import ReactTable from "react-table";

type Animal = {
  species: string;
  name: string;
};

let animals: Array<Animal> = [
  {
    species: "Dog",
    name: "Rover"
  },
  {
    species: "Cat",
    name: "Tiddles"
  },
  {
    species: "Mouse",
    name: "Pixie"
  },
  {
    species: "Tyrannosaurus Rex",
    name: "Fluffy"
  }
];

const COLUMNS = [
  {
    id: "species",
    Header: "Species",
    accessor: (u: Animal) => u.species
  },
  {
    id: "name",
    Header: "Name",
    accessor: (u: Animal) => u.name
  }
];

storiesOf("Custom Hooks/useSelectableItemListing", module)
  .addDecorator(StroomDecorator)
  .add("React Table", () => {
    const { onKeyDownWithShortcuts, tableProps } = useSelectableReactTable<
      Animal
    >(
      {
        getKey: a => a.species,
        items: animals,
        selectionBehaviour: SelectionBehaviour.MULTIPLE
      },
      {
        columns: COLUMNS
      }
    );

    return (
      <div tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
        <ReactTable {...tableProps} />
      </div>
    );
  })
  .add("A List", () => {
    const [lastAction, setLastAction] = useState<string>("no action");

    const {
      onKeyDownWithShortcuts,
      selectedItemIndexes,
      focusIndex,
      selectionToggled
    } = useSelectableItemListing<Animal>({
      getKey: a => a.name,
      openItem: a => setLastAction(`Opened Item ${a.name}`),
      items: animals,
      selectionBehaviour: SelectionBehaviour.MULTIPLE
    });

    return (
      <div tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
        <h3>Test Selectable Item Listing</h3>
        <p>Last Action: {lastAction}</p>
        <ul>
          {animals.map((animal, i) => (
            <li
              key={i}
              onClick={() => selectionToggled(animal.name)}
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
      </div>
    );
  });
