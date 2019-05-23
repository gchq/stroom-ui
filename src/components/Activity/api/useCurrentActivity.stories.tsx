import * as React from "react";
import { storiesOf } from "@storybook/react";
import useCurrentActivity from "./useCurrentActivity";
import JsonDebug from "testing/JsonDebug";

const TestHarness: React.FunctionComponent = () => {
  const activity = useCurrentActivity();

  return <JsonDebug value={activity} />;
};

storiesOf("Sections/Activity/useCurrentActivity", module).add("test", () => (
  <TestHarness />
));
