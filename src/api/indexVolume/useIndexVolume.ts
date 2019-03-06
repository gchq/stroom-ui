import { useEffect, useCallback } from "react";

import useApi from "./useApi";
import { IndexVolumeGroup, IndexVolume } from "../../types";
import { useActionCreators } from "./redux";
import useReduxState from "../../lib/useReduxState";

interface UseIndexVolume {
  indexVolume: IndexVolume | undefined;
  groups: Array<IndexVolumeGroup>;
  addToGroup: (groupName: string) => void;
  removeFromGroup: (groupName: string) => void;
}

export default (volumeId: string): UseIndexVolume => {
  const {
    getIndexVolumeById,
    getGroupsForIndexVolume,
    addVolumeToGroup,
    removeVolumeFromGroup
  } = useApi();
  const { indexVolumes, groupsByIndexVolume } = useReduxState(
    ({ indexVolumes: { indexVolumes, groupsByIndexVolume } }) => ({
      indexVolumes,
      groupsByIndexVolume
    })
  );

  const {
    indexVolumeReceived,
    indexGroupsForVolumeReceived,
    indexVolumeAddedToGroup,
    indexVolumeRemovedFromGroup
  } = useActionCreators();

  useEffect(() => {
    getIndexVolumeById(volumeId).then(indexVolumeReceived);
    getGroupsForIndexVolume(volumeId).then(groups =>
      indexGroupsForVolumeReceived(volumeId, groups)
    );
  }, [volumeId, getGroupsForIndexVolume, indexGroupsForVolumeReceived]);

  const indexVolume: IndexVolume | undefined = indexVolumes.find(
    v => v.id === volumeId
  );

  const groups = groupsByIndexVolume[volumeId] || [];

  const addToGroup = useCallback(
    (groupName: string) => {
      addVolumeToGroup(volumeId, groupName).then(() => {
        indexVolumeAddedToGroup(volumeId, groupName);
      });
    },
    [volumeId, addVolumeToGroup, indexVolumeAddedToGroup]
  );
  const removeFromGroup = useCallback(
    (groupName: string) => {
      removeVolumeFromGroup(volumeId, groupName).then(() => {
        indexVolumeRemovedFromGroup(volumeId, groupName);
      });
    },
    [volumeId, removeVolumeFromGroup, indexVolumeRemovedFromGroup]
  );

  return { indexVolume, groups, addToGroup, removeFromGroup };
};
