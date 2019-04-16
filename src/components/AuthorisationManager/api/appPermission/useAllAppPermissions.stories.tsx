import * as React from "react";

import { storiesOf } from "@storybook/react";
import JsonDebug from "src/testing/JsonDebug";
import useAllAppPermissions from "./useAllAppPermissions";

const TestHarness: React.FunctionComponent = () => {
  const all = useAllAppPermissions();

  return <JsonDebug value={all} />;
};

storiesOf("API/useAllAppPermissions", module).add("test", () => (
  <TestHarness />
));
