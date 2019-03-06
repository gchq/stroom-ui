import { useEffect, useCallback } from "react";

import useApi from "./useApi";
import { IndexVolumeGroup, IndexVolume } from "../../types";
import useReduxState from "../../lib/useReduxState";

interface UseIndexVolume {
  indexVolume: IndexVolume | undefined;
  groups: Array<IndexVolumeGroup>;
  addToGroup: (groupName: string) => void;
  removeFromGroup: (groupName: string) => void;
}

export default (volumeId: string): UseIndexVolume => {
  const {
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

  useEffect(() => {
    getGroupsForIndexVolume(volumeId);
  }, [volumeId, getGroupsForIndexVolume]);

  const indexVolume: IndexVolume | undefined = indexVolumes.find(
    v => v.id === volumeId
  );

  const groups = groupsByIndexVolume[volumeId] || [];

  const addToGroup = useCallback(
    (groupName: string) => {
      addVolumeToGroup(volumeId, groupName);
    },
    [volumeId, addVolumeToGroup]
  );
  const removeFromGroup = useCallback(
    (groupName: string) => {
      removeVolumeFromGroup(volumeId, groupName);
    },
    [volumeId, removeVolumeFromGroup]
  );

  return { indexVolume, groups, addToGroup, removeFromGroup };
};
