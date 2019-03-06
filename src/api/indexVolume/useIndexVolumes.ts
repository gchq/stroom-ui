import { useEffect, useCallback } from "react";

import useApi from "./useApi";
import { useActionCreators } from "./redux";
import { IndexVolume } from "../../types";
import useReduxState from "../../lib/useReduxState";

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

export default (): UseIndexVolumes => {
  const indexVolumes = useReduxState(
    ({ indexVolumes: { indexVolumes } }) => indexVolumes
  );
  const {
    getIndexVolumes,
    deleteIndexVolume,
    addVolumeToGroup,
    createIndexVolume
  } = useApi();

  const {
    indexVolumesReceived,
    indexVolumeDeleted,
    indexVolumeCreated,
    indexVolumeAddedToGroup
  } = useActionCreators();

  useEffect(() => {
    getIndexVolumes().then(indexVolumesReceived);
  }, [indexVolumesReceived, getIndexVolumes]);

  return {
    indexVolumes,
    createIndexVolume: useCallback((nodeName: string, path: string) => {
      createIndexVolume(nodeName, path).then(indexVolumeCreated);
    }, []),
    deleteIndexVolume: useCallback(
      (id: string) => {
        deleteIndexVolume(id).then(() => indexVolumeDeleted(id));
      },
      [deleteIndexVolume]
    ),
    addVolumeToGroup: useCallback(
      (volumeId: string, groupName: string) => {
        addVolumeToGroup(volumeId, groupName).then(() =>
          indexVolumeAddedToGroup(volumeId, groupName)
        );
      },
      [addVolumeToGroup, indexVolumeAddedToGroup]
    )
  };
};
