import * as React from "react";
import { storiesOf } from "@storybook/react";
import useSelectable from "./useSelectable";
import JsonDebug from "testing/JsonDebug";

const TEST_ITEMS: string[] = ["BILBO", "FRODO", "SAM", "PIPPIN", "MERRIN"];

const selectedStyle: React.CSSProperties = {
  border: "solid thin black",
};

interface Props {
  items: string[];
}

const TestHarness: React.FunctionComponent<Props> = ({ items }) => {
  const { selectedItems, toggleSelection, clearSelection } = useSelectable({
    items,
    getKey: React.useCallback(d => d, []),
  });

  return (
    <div>
      <h1>Selectable Items</h1>
      <p>Click on items to toggle their selection</p>
      <ul>
        {items.map((item, i) => (
          <li
            key={i}
            style={selectedItems.includes(item) ? selectedStyle : {}}
            onClick={() => toggleSelection(item)}
          >
            {item}
          </li>
        ))}
      </ul>
      <button onClick={clearSelection}>Clear</button>
      <JsonDebug value={{ items, selectedItems }} />
    </div>
  );
};

storiesOf("lib/useSelectable", module).add("basic", () => (
  <TestHarness items={TEST_ITEMS} />
));
