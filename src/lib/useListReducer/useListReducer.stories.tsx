import * as React from "react";
import * as loremIpsum from "lorem-ipsum";
import { storiesOf } from "@storybook/react";

import useListReducer from "./useListReducer";

const generateItem = () => loremIpsum({ count: 3, units: "words" });

const TEST_ITEMS: string[] = Array(5)
  .fill(null)
  .map(generateItem);

interface Props {
  initialItems: string[];
}

const TestHarness: React.FunctionComponent<Props> = ({ initialItems }) => {
  const { items, itemAdded, itemRemoved } = useListReducer(
    c => c,
    initialItems,
  );

  const [newName, setNewName] = React.useState<string>(generateItem());

  const onNewNameChange: React.ChangeEventHandler<
    HTMLInputElement
  > = React.useCallback(({ target: { value } }) => setNewName(value), [
    setNewName,
  ]);

  const onAddNewItem = React.useCallback(
    e => {
      itemAdded(newName);
      e.preventDefault();
    },
    [itemAdded, newName],
  );

  return (
    <div>
      <form>
        <label>Name</label>
        <input value={newName} onChange={onNewNameChange} />
        <button onClick={onAddNewItem}>Add</button>
      </form>
      {items.map(c => (
        <div key={c}>
          {c}
          <button onClick={() => itemRemoved(c)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

storiesOf("lib/useListReducer", module).add("basic", () => (
  <TestHarness initialItems={TEST_ITEMS} />
));
