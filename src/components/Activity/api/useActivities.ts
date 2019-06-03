import * as React from "react";

import useApi from "./useApi";
import { Activity } from "./types";

/**
 * Convenience function for using Index Volume.
 * This hook connects the REST API calls to the Redux Store.
 */
interface UseActivities {
  activities: Activity[];
  deleteActivity: (id: string, onComplete: () => void) => void;
  refresh: () => void;
}

interface ReceiveAction {
  type: "received";
  activities: Activity[];
}

interface DeleteAction {
  type: "deleted";
  id: string;
}

const reducer = (
  state: Activity[],
  action: ReceiveAction | DeleteAction,
): Activity[] => {
  switch (action.type) {
    case "received":
      return action.activities;
    case "deleted":
      return state.filter(v => v.id !== action.id);
    default:
      return state;
  }
};

const useActivities = (): UseActivities => {
  const [activities, dispatch] = React.useReducer(reducer, []);

  const { getActivities, deleteActivity } = useApi();

  const doDelete = React.useCallback(
    (id: string, onComplete) =>
      deleteActivity(id).then(() => {
        dispatch({
          type: "deleted",
          id,
        });
        onComplete();
      }),
    [deleteActivity],
  );

  const doRefresh = React.useCallback(
    () => {
      getActivities().then(v => {
        dispatch({
          type: "received",
          activities: v,
        });
      });
    },
    [dispatch, getActivities],
  );

  React.useEffect(() => {
    doRefresh();
  }, [doRefresh]);

  return {
    activities,
    deleteActivity: doDelete,
    refresh: doRefresh,
  };
};

export default useActivities;