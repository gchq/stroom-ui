import * as React from "react";
import { Activity } from "./types";
import useApi from "./useApi";

interface UseActivity {
  activity: Activity | undefined;
  onPropChange: (id: string, value: string) => any;
  onSave: () => void;
  isDirty: boolean;
}

interface SetActivity {
  type: "set";
  activity: Activity;
}

interface SavedActivity {
  type: "saved";
  activity: Activity;
}

interface SetPropValue {
  type: "prop";
  id: string;
  value: string;
}

interface ReducerState {
  activity: Activity;
  isDirty: boolean;
}

const reducer = (
  state: ReducerState,
  action: SetActivity | SetPropValue | SavedActivity,
): ReducerState => {
  switch (action.type) {
    case "set":
      return {
        activity: action.activity,
        isDirty: false,
      };
    case "prop":
      return {
        activity: {
          ...state.activity,
          properties: state.activity.properties.map(prop => {
            if (prop.id === action.id) {
              return {
                ...prop,
                value: action.value,
              };
            } else {
              return prop;
            }
          }),
        },
        isDirty: true,
      };
    case "saved":
      return { activity: action.activity, isDirty: false };
  }

  return state;
};

const useActivity = (activityId: string): UseActivity => {
  // const [activity, setActivity] = React.useState<Activity | undefined>(
  //   undefined,
  // );

  const [{ activity, isDirty }, dispatch] = React.useReducer(reducer, {
    activity: undefined,
    isDirty: false,
  });

  const { getActivity, updateActivity } = useApi();

  React.useEffect(() => {
    getActivity(activityId).then(activity =>
      dispatch({ type: "set", activity }),
    );
  }, [activityId, getActivity, dispatch]);

  const onPropChange = React.useCallback(
    (id: string, value: string) => dispatch({ type: "prop", id, value }),
    [dispatch],
  );

  const onSave = React.useCallback(
    () =>
      updateActivity(activity).then(activity =>
        dispatch({ type: "saved", activity }),
      ),
    [updateActivity, dispatch, activity],
  );

  return { activity, isDirty, onPropChange, onSave };
};

export default useActivity;
