import * as React from "react";

import useApi from "./useApi";
import { IndexVolume, NewIndexVolume, UpdateIndexVolumeDTO } from "./types";

/**
 * Convenience function for using Index Volume.
 * This hook connects the REST API calls to the Redux Store.
 */
interface UseIndexVolumes {
  indexVolumes: IndexVolume[];
  update: (indexVolume: IndexVolume) => Promise<IndexVolume>;
  createIndexVolume: (newIndexVolume: NewIndexVolume) => void;
  deleteIndexVolume: (id: string) => void;
}

interface ReceiveAction {
  type: "received";
  indexVolumes: IndexVolume[];
}
interface DeleteAction {
  type: "deleted";
  id: string;
}
interface CreateAction {
  type: "created";
  indexVolume: IndexVolume;
}

const reducer = (
  state: IndexVolume[],
  action: ReceiveAction | DeleteAction | CreateAction,
): IndexVolume[] => {
  switch (action.type) {
    case "received":
      return action.indexVolumes;
    case "created":
      return state.concat([action.indexVolume]);
    case "deleted":
      return state.filter(v => v.id !== action.id);
    default:
      return state;
  }
};

const useIndexVolumes = (): UseIndexVolumes => {
  const [indexVolumes, dispatch] = React.useReducer(reducer, []);

  const {
    getIndexVolumes,
    deleteIndexVolume,
    createIndexVolume,
    update,
  } = useApi();

  React.useEffect(() => {
    getIndexVolumes().then(v =>
      dispatch({
        type: "received",
        indexVolumes: v,
      }),
    );
  }, [dispatch, getIndexVolumes]);

  return {
    indexVolumes,
    createIndexVolume: React.useCallback(
      (newIndexVolume: NewIndexVolume) =>
        createIndexVolume(newIndexVolume).then(indexVolume =>
          dispatch({
            type: "created",
            indexVolume,
          }),
        ),
      [createIndexVolume],
    ),
    deleteIndexVolume: React.useCallback(
      (id: string) =>
        deleteIndexVolume(id).then(() =>
          dispatch({
            type: "deleted",
            id,
          }),
        ),
      [deleteIndexVolume],
    ),
    update: React.useCallback(
      (indexVolume: IndexVolume) => {
        let dto: UpdateIndexVolumeDTO = {
          id: indexVolume.id,
          indexVolumeGroupId: indexVolume.indexVolumeGroupId,
          path: indexVolume.path,
          nodeName: indexVolume.nodeName,
        };
        return update(dto);
      },
      [update],
    ),
  };
};

export default useIndexVolumes;
