import * as React from "react";

import { storiesOf } from "@storybook/react";
import JsonDebug from "src/testing/JsonDebug";
import useElements from "./useElements";

const TestHarness: React.FunctionComponent = () => {
  const elements = useElements();

  return <JsonDebug value={elements} />;
};

storiesOf("Custom Hooks/useElements", module).add("test", () => (
  <TestHarness />
));
