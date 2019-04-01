import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { storiesOf } from "@storybook/react";

import useListReducer from "./useListReducer";

class Character {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const testCharacters: Array<Character> = [
  { name: "Arnold Rimmer" },
  { name: "Dave Lister" },
  { name: "Cat" },
  { name: "Holly" },
  { name: "Kochanski" }
];

storiesOf("Custom Hooks/useListReducer", module).add("basic", () => {
  const { items, itemsReceived, itemAdded, itemRemoved } = useListReducer<
    Character
  >(c => c.name);

  const [newName, setNewName] = useState<string>("Queeq");
  useEffect(() => itemsReceived(testCharacters), [itemsReceived]);

  const onNewNameChange: React.ChangeEventHandler<
    HTMLInputElement
  > = useCallback(({ target: { value } }) => setNewName(value), [setNewName]);

  const onAddNewItem = useCallback(
    e => {
      itemAdded({ name: newName });
      e.preventDefault();
    },
    [itemAdded, newName]
  );

  return (
    <div>
      <form>
        <label>Name</label>
        <input value={newName} onChange={onNewNameChange} />
        <button onClick={onAddNewItem}>Add</button>
      </form>
      {items.map(c => (
        <div key={c.name}>
          {c.name}
          <button onClick={() => itemRemoved(c.name)}>Remove</button>
        </div>
      ))}
    </div>
  );
});
