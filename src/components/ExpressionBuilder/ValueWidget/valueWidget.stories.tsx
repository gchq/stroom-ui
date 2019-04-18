import * as React from "react";
import { storiesOf } from "@storybook/react";

import SingleValueWidget from "./SingleValueWidget";
import InValueWidget from "./InValueWidget";
import BetweenValueWidget from "./BetweenValueWidget";
import JsonDebug from "src/testing/JsonDebug";

const stories = storiesOf("Expression/Value Widgets", module);

[
  { valueType: "text", defaultValue: "Some Value" },
  { valueType: "number", defaultValue: "10" },
  { valueType: "datetime-local", defaultValue: `${Date.now()}` },
].forEach(({ valueType, defaultValue }) => {
  stories
    .add(`Single ${valueType}`, () => {
      const TestHarness: React.FunctionComponent = () => {
        const [value, onChange] = React.useState(defaultValue);
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

      return <TestHarness />;
    })
    .add(`In ${valueType}`, () => {
      const TestHarness: React.FunctionComponent = () => {
        const [value, onChange] = React.useState(defaultValue);

        return (
          <div>
            <InValueWidget value={value} onChange={onChange} />
            <JsonDebug value={{ value }} />
          </div>
        );
      };
      return <TestHarness />;
    })
    .add(`Between ${valueType}`, () => {
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

      return <TestHarness />;
    });
});
