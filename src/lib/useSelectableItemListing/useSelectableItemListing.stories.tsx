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
import { useState, useCallback } from "react";
import { storiesOf } from "@storybook/react";


import useSelectableItemListing, {
  useSelectableReactTable
} from "./useSelectableItemListing";
import { SelectionBehaviour } from "./enums";
import ReactTable from "react-table";
import useForm from "../useForm";
import Button from "../../components/Button";

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

interface NewItemFormValues {
  species: string;
  name: string;
}

const defaultFormValues: NewItemFormValues = {
  species: "Dog",
  name: "Fluffy"
};

storiesOf("Custom Hooks/useSelectableItemListing", module)
  
  .add("React Table", () => {
    const {
      value: { species, name },
      generateTextInput
    } = useForm<NewItemFormValues>({ initialValues: defaultFormValues });

    const [animals, setAnimals] = useState<Array<Animal>>(initialAnimals);
    const speciesProps = generateTextInput("species");
    const nameProps = generateTextInput("name");
    const onClickAddItem = useCallback(
      e => {
        if (!!name && !!species) {
          setAnimals(
            animals.concat([
              {
                uuid: uuidv4(),
                species,
                name
              }
            ])
          );
        }
        e.preventDefault();
      },
      [animals, name, species, setAnimals]
    );

    const { onKeyDownWithShortcuts, tableProps } = useSelectableReactTable<
      Animal
    >(
      {
        getKey: a => a.uuid,
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
        <form>
          <label>Species</label>
          <input {...speciesProps} />
          <label>Name</label>
          <input {...nameProps} />

          <Button onClick={onClickAddItem} text="Add Item" />
        </form>
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
      items: initialAnimals,
      selectionBehaviour: SelectionBehaviour.MULTIPLE
    });

    return (
      <div tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
        <h3>Test Selectable Item Listing</h3>
        <p>Last Action: {lastAction}</p>
        <ul>
          {initialAnimals.map((animal, i) => (
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
