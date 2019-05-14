import * as React from "react";
import { storiesOf } from "@storybook/react";
import useActivity from "./useActivity";
import JsonDebug from "testing/JsonDebug";

const TestHarness: React.FunctionComponent = () => {
  const activity = useActivity();

  return <JsonDebug value={activity} />;
};

storiesOf("Sections/Activity/useActivity", module).add("test", () => (
  <TestHarness />
));
