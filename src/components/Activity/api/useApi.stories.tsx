import * as React from "react";

import { storiesOf } from "@storybook/react";

import useApi from "./useApi";
import JsonDebug from "testing/JsonDebug";
import { Activity } from "./types";
const TestHarness: React.FunctionComponent = () => {
  // REST call promise
  const { getActivity } = useApi();
  const [activity, setActivity] = React.useState<Activity>(undefined);
  React.useEffect(() => {
    getActivity().then(setActivity);
  }, [getActivity, setActivity]);
  return (
    <div>
      <JsonDebug value={{ activity }} />
    </div>
  );
};

storiesOf("Sections/Activity/useApi", module).add("test", () => (
  <TestHarness />
));
