import * as React from "react";
import { storiesOf } from "@storybook/react";
import useCustomFocus from "./useCustomFocus";
import JsonDebug from "testing/JsonDebug";

const items: string[] = ["one", "two", "three", "four", "five"];

const focusStyle: React.CSSProperties = {
  border: "solid thin black",
};

const TestHarness: React.FunctionComponent = () => {
  const { down, up, clear, focusIndex, focussedItem } = useCustomFocus({
    items,
  });

  return (
    <div>
      <h1>Custom Focus Test</h1>
      {items.map((item, i) => (
        // eslint-disable-next-line prettier/prettier
        <div key={i} style={i === focusIndex ? focusStyle : {}}>{item}</div>
      ))}
      <button onClick={up}>Up</button>
      <button onClick={down}>Down</button>
      <button onClick={clear}>Clear</button>
      <JsonDebug value={{ focusIndex, focussedItem }} />
    </div>
  );
};

storiesOf("lib/useCustomFocus", module).add("basic", () => <TestHarness />);
