import * as React from "react";

import SingleValueWidget from "./SingleValueWidget";
import InValueWidget from "./InValueWidget";
import BetweenValueWidget from "./BetweenValueWidget";
import JsonDebug from "testing/JsonDebug";
import { addStory } from "testing/storybook/themedStoryGenerator";
import { ChangeEventHandler, useCallback, useState } from "react";

[
  { valueType: "text", defaultValue: "Red" },
  { valueType: "number", defaultValue: "10" },
  { valueType: "datetime-local", defaultValue: "2018-06-12T19:30" },
].forEach(({ valueType, defaultValue }) => {
  const TestHarness: React.FunctionComponent = () => {
    const [value, setValue] = useState(defaultValue);
    const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      ({ target: { value } }) => setValue(value),
      [setValue],
    );
    return (
      <div>
        <SingleValueWidget
          value={value}
          onChange={onChange}
          valueType={valueType}
        />
        <JsonDebug value={{ value }} />
      </div>
    );
  };

  addStory( "Expression/Value Widgets/Single", `${valueType}`,
  module, () => <TestHarness />);
});

[
  { valueType: "text", defaultValue: "FromValue,ToValue" },
  { valueType: "number", defaultValue: "1,45" },
  { valueType: "datetime-local", defaultValue: `${Date.now()},${Date.now()}` },
].forEach(({ valueType, defaultValue }) => {
  const TestHarness: React.FunctionComponent = () => {
    const [value, onChange] = React.useState(defaultValue);

    return (
      <div>
        <InValueWidget value={value} onChange={onChange} />
        <JsonDebug value={{ value }} />
      </div>
    );
  };

  addStory("Expression/Value Widgets/In", `${valueType}`, module, () => <TestHarness />);
});

[
  { valueType: "text", defaultValue: "Red,Green,Blue" },
  { valueType: "number", defaultValue: "10,20,30,40" },
  { valueType: "datetime-local", defaultValue: `${Date.now()},${Date.now()}` },
].forEach(({ valueType, defaultValue }) => {
  const TestHarness: React.FunctionComponent = () => {
    const [value, onChange] = React.useState(defaultValue);

    return (
      <div>
        <BetweenValueWidget
          value={value}
          onChange={onChange}
          valueType={valueType}
        />
        <JsonDebug value={{ value }} />
      </div>
    );
  };

  addStory( "Expression/Value Widgets/Between", `${valueType}`,
  module, () => <TestHarness />);
});
