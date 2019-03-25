import { useEffect, useCallback, useReducer } from "react";

import useApi from "./useApi";
import { IndexVolume } from "../../types";

/**
 * Convenience function for using Index Volume.
 * This hook connects the REST API calls to the Redux Store.
 */
interface UseIndexVolumes {
  indexVolumes: Array<IndexVolume>;
  createIndexVolume: (nodeName: string, path: string) => void;
  deleteIndexVolume: (id: string) => void;
  addVolumeToGroup: (indexVolumeId: string, groupName: string) => void;
}

type ReceiveAction = {
  type: "received";
  indexVolumes: Array<IndexVolume>;
};
type DeleteAction = {
  type: "deleted";
  id: string;
};
type CreateAction = {
  type: "created";
  indexVolume: IndexVolume;
};

const reducer = (
  state: Array<IndexVolume>,
  action: ReceiveAction | DeleteAction | CreateAction
): Array<IndexVolume> => {
  switch (action.type) {
    case "received":
      return action.indexVolumes;
    case "created":
      return state.concat([action.indexVolume]);
    case "deleted":
      return state.filter(v => v.id !== action.id);
  }

  return state;
};

const useIndexVolumes = (): UseIndexVolumes => {
  const [indexVolumes, dispatch] = useReducer(reducer, []);

  const {
    getIndexVolumes,
    deleteIndexVolume,
    addVolumeToGroup,
    createIndexVolume
  } = useApi();

  useEffect(() => {
    getIndexVolumes().then(v =>
      dispatch({
        type: "received",
        indexVolumes: v
      })
    );
  }, [dispatch, getIndexVolumes]);

  return {
    indexVolumes,
    createIndexVolume: useCallback(
      (nodeName: string, path: string) =>
        createIndexVolume(nodeName, path).then(indexVolume =>
          dispatch({
            type: "created",
            indexVolume
          })
        ),
      [createIndexVolume]
    ),
    deleteIndexVolume: useCallback(
      (id: string) =>
        deleteIndexVolume(id).then(() =>
          dispatch({
            type: "deleted",
            id
          })
        ),
      [deleteIndexVolume]
    ),
    addVolumeToGroup: useCallback(
      (volumeId: string, groupName: string) =>
        addVolumeToGroup(volumeId, groupName),
      [addVolumeToGroup]
    )
  };
};

export default useIndexVolumes;
