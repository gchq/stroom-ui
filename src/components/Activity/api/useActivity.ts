import * as React from "react";
import { Activity, Prop } from "./types";
import useApi from "./useApi";
import cogoToast from "cogo-toast";

interface UseActivity {
  activity: Activity | undefined;
  onPropChange: (prop: Prop) => any;
  onCreateOrUpdate: () => void;
  isDirty: boolean;
}

interface SetActivity {
  type: "set";
  activity: Activity;
}

interface SetPropValue {
  type: "prop";
  prop: Prop;
}

interface ReducerState {
  activity: Activity;
  isDirty: boolean;
}

const reducer = (
  state: ReducerState,
  action: SetActivity | SetPropValue,
): ReducerState => {
  switch (action.type) {
    case "set":
      return {
        activity: action.activity,
        isDirty: false,
      };
    case "prop":
      console.log("setting prop on ", state.activity);

      return {
        activity: {
          ...state.activity,
          properties: state.activity.properties
            .filter(prop => prop.id !== action.prop.id)
            .concat(action.prop),
        },
        isDirty: true,
      };
  }

  return state;
};

const newActivity: Activity = {
  properties: [],
};

const useActivity = (activityId: string): UseActivity => {
  // const [activity, setActivity] = React.useState<Activity | undefined>(
  //   undefined,
  // );

  const [{ activity, isDirty }, dispatch] = React.useReducer(reducer, {
    activity: undefined,
    isDirty: false,
  });

  const { createActivity, getActivity, updateActivity } = useApi();

  React.useEffect(() => {
    if (activityId) {
      getActivity(activityId).then(activity =>
        dispatch({ type: "set", activity }),
      );
    } else {
      dispatch({ type: "set", activity: newActivity });
    }
  }, [activityId, getActivity, dispatch]);

  const onPropChange = React.useCallback(
    (prop: Prop) => dispatch({ type: "prop", prop }),
    [dispatch],
  );

  const onCreateOrUpdate = React.useCallback(() => {
    if (activity.id) {
      updateActivity(activity).then(activity => {
        dispatch({ type: "set", activity });
        cogoToast.info(`Activity Saved`);
      });
    } else {
      createActivity(activity).then(activity => {
        dispatch({ type: "set", activity });
        cogoToast.info(`Activity Created`);
      });
    }
  }, [createActivity, updateActivity, dispatch, activity]);

  // const onUpdate = React.useCallback(
  //   () =>
  //     updateActivity(activity).then(activity => {
  //       dispatch({ type: "set", activity });
  //       cogoToast.info(`Activity Saved`);
  //     }),
  //   [updateActivity, dispatch, activity],
  // );

  return { activity, isDirty, onPropChange, onCreateOrUpdate };
};

export default useActivity;
