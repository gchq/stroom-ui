// Service layer to define state to store and invoke rest http functions to populate state

import * as React from "react";
import useApi from "./useApi";
import { Activity } from "./types";

const useActivity = (): Activity => {
  // Get the API object the provides the function that returns the promise
  const { getActivity } = useApi();

  // Declare the React state object to hold the response from the REST API
  const [activity, setActivity] = React.useState<Activity>({
    userId: "TBD",
    details: {
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
    },
  });

  // Use an effect to set the build info state when the component is mounted
  React.useEffect(() => {
    getActivity().then(setActivity);
  }, [setActivity, getActivity]);

  return activity;
};

export default useActivity;
