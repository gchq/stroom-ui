// Service layer to define state to store and invoke rest http functions to populate state

import * as React from "react";
import useApi from "./useApi";
import { Activity } from "./types";

interface UseActivitySummary {
  activity: Activity;
  setCurrentActivity: (a: Activity) => void;
}

const useActivitySummary = (): UseActivitySummary => {
  // Get the API object the provides the function that returns the promise
  const { getCurrentActivity, setCurrentActivity } = useApi();

  // Declare the React state object to hold the response from the REST API
  const [activity, setActivity] = React.useState<Activity>({
    userId: "TBD",
    properties: [
      {
        id: "prop1",
        name: "name1",
        value: "value1",
        showInSelection: true,
        showInList: true,
      },
      {
        id: "prop2",
        name: "name2",
        value: "value2",
        showInSelection: true,
        showInList: true,
      },
    ],
  });

  // Use an effect to set the build info state when the component is mounted
  React.useEffect(() => {
    getCurrentActivity().then(setActivity);
  }, [setActivity, getCurrentActivity]);

  const _setCurrentActivity = React.useCallback(
    (activity: Activity) => {
      setCurrentActivity(activity).then(setActivity);
    },
    [setCurrentActivity, setActivity],
  );

  return { activity, setCurrentActivity: _setCurrentActivity };
};

export default useActivitySummary;
