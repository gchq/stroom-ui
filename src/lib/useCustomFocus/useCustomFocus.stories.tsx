import * as React from "react";
import * as loremIpsum from "lorem-ipsum";
import { storiesOf } from "@storybook/react";
import useCustomFocus from "./useCustomFocus";
import JsonDebug from "testing/JsonDebug";
import useListReducer from "lib/useListReducer";

const generateItem = () => loremIpsum({ count: 3, units: "words" });

const TEST_ITEMS: string[] = Array(5)
  .fill(null)
  .map(generateItem);

const focusStyle: React.CSSProperties = {
  border: "solid thin black",
};

interface Props {
  initialItems: string[];
}

interface ItemWithClick<T> {
  item: T;
  onClick: () => void;
}

const TestHarness: React.FunctionComponent<Props> = ({ initialItems }) => {
  const { items, itemAtIndexRemoved, itemAdded } = useListReducer(
    d => d,
    initialItems,
  );

  const preFocusWrap = React.useCallback(() => {
    if (items.length < 9) {
      itemAdded(generateItem());
      return false;
    } else {
      return true;
    }
  }, [items, itemAdded]);

  const { set, down, up, clear, focusIndex, focussedItem } = useCustomFocus({
    items,
    preFocusWrap,
  });

  const removeFirstItem = React.useCallback(() => itemAtIndexRemoved(0), [
    itemAtIndexRemoved,
  ]);

  const itemsWithClick: ItemWithClick<string>[] = React.useMemo(
    () =>
      items.map((item, i) => ({
        item,
        onClick: () => set(i),
      })),
    [items, set],
  );

  return (
    <div>
      <h1>Custom Focus Test</h1>
      {itemsWithClick.map(({ item, onClick }, i) => (
        <div
          key={i}
          onClick={onClick}
          style={i === focusIndex ? focusStyle : {}}
        >
          {item}
        </div>
      ))}
      <button onClick={up}>Up</button>
      <button onClick={down}>Down</button>
      <button onClick={clear}>Clear</button>
      <button onClick={removeFirstItem}>Remove First</button>
      <JsonDebug value={{ focusIndex, focussedItem }} />
    </div>
  );
};

storiesOf("lib/useCustomFocus", module).add("basic", () => (
  <TestHarness initialItems={TEST_ITEMS} />
));
