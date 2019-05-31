import * as React from "react";

import useApi from "./useApi";
import { Activity } from "./types";

/**
 * Convenience function for using Index Volume.
 * This hook connects the REST API calls to the Redux Store.
 */
interface UseActivities {
  activities: Activity[];
  deleteActivity: (id: string) => void;
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
  console.log("useActivities");

  const [activities, dispatch] = React.useReducer(reducer, []);

  const { getActivities, deleteActivity } = useApi();

  React.useEffect(() => {
    console.log("1111 React.useEffect(() => {", activities, getActivities);

    getActivities().then(v =>
      dispatch({
        type: "received",
        activities: v,
      }),
    );
  }, [dispatch, getActivities]);

  console.log("222 React.useEffect(() => {", dispatch, getActivities);

  return {
    activities,
    deleteActivity: React.useCallback(
      (id: string) =>
        deleteActivity(id).then(() =>
          dispatch({
            type: "deleted",
            id,
          }),
        ),
      [deleteActivity],
    ),
  };
};

export default useActivities;

// indexVolumes,
// createIndexVolume: React.useCallback(
//   (newIndexVolume: NewIndexVolume) =>
//     createIndexVolume(newIndexVolume).then(indexVolume =>
//       dispatch({
//         type: "created",
//         indexVolume,
//       }),
//     ),
//   [createIndexVolume],
// ),
// deleteIndexVolume: React.useCallback(
//   (id: string) =>
//     deleteIndexVolume(id).then(() =>
//       dispatch({
//         type: "deleted",
//         id,
//       }),
//     ),
//   [deleteIndexVolume],
// ),
// addVolumeToGroup: React.useCallback(
//   (volumeId: string, groupName: string) =>
//     addVolumeToGroup(volumeId, groupName),
//   [addVolumeToGroup],
// ),
