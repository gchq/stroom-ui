import { useEffect, useCallback } from "react";

import useApi from "./useApi";
import { useApi as useIndexVolumeApi } from "../indexVolume/useApi";

import useReduxState from "../../lib/useReduxState";
import { IndexVolume, IndexVolumeGroup } from "src/types";

interface UseIndexVolumeGroup {
  indexVolumes: Array<IndexVolume>;
  indexVolumeGroup: IndexVolumeGroup | undefined;
  removeVolume: (volumeId: string) => void;
}

export default (groupName: string): UseIndexVolumeGroup => {
  const { getIndexVolumeGroup } = useApi();
  const { getIndexVolumesInGroup, removeVolumeFromGroup } = useIndexVolumeApi();
  const { indexVolumesByGroup, groups } = useReduxState(
    ({
      indexVolumeGroups: { groups },
      indexVolumes: { indexVolumesByGroup }
    }) => ({
      groups,
      indexVolumesByGroup
    })
  );

  useEffect(() => {
    getIndexVolumeGroup(groupName);
    getIndexVolumesInGroup(groupName);
  }, [groupName, getIndexVolumeGroup, getIndexVolumesInGroup]);

  const indexVolumes = indexVolumesByGroup[groupName] || [];

  const indexVolumeGroup: IndexVolumeGroup | undefined = groups.find(
    g => g.name === groupName
  );

  const removeVolume = useCallback(
    (volumeId: string) => {
      removeVolumeFromGroup(volumeId, groupName);
    },
    [groupName, removeVolumeFromGroup]
  );

  return {
    indexVolumes,
    indexVolumeGroup,
    removeVolume
  };
};
