import * as React from "react";
import { Activity } from "./types";
import useApi from "./useApi";

interface UseActivity {
  activity: Activity | undefined;
  onPropChange: (id: string, value: string) => any;
}

interface SetActivity {
  type: "set";
  activity: Activity;
}

interface SetPropValue {
  type: "prop";
  id: string;
  value: string;
}

const reducer = (state: Activity, action: SetActivity | SetPropValue) => {
  console.log("Hit reducer");

  switch (action.type) {
    case "set":
      return action.activity;
    case "prop":
      return {
        ...state,
        properties: state.properties.map(prop => {
          if (prop.id === action.id) {
            return {
              ...prop,
              value: action.value,
            };
          } else {
            return prop;
          }
        }),
      };
  }

  return state;
};

const useActivity = (activityId: string): UseActivity => {
  // const [activity, setActivity] = React.useState<Activity | undefined>(
  //   undefined,
  // );

  const [activity, dispatch] = React.useReducer(reducer, undefined);

  const { getActivity } = useApi();

  React.useEffect(() => {
    getActivity(activityId).then(activity =>
      dispatch({ type: "set", activity }),
    );
  }, [activityId, getActivity, dispatch]);

  const onPropChange = React.useCallback(
    (id: string, value: string) => dispatch({ type: "prop", id, value }),
    [dispatch],
  );

  return { activity, onPropChange };
};

export default useActivity;
