import { useEffect, useCallback } from "react";

import useApi from "./useApi";
import { useActionCreators } from "./redux";
import { useApi as useIndexVolumeApi } from "../indexVolume/useApi";
import { useActionCreators as useVolumeActionCreators } from "../indexVolume/redux";

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
  const { indexVolumeGroupReceived } = useActionCreators();
  const { indexVolumesInGroupReceived } = useVolumeActionCreators();
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
    getIndexVolumeGroup(groupName).then(indexVolumeGroupReceived);
    getIndexVolumesInGroup(groupName).then(v =>
      indexVolumesInGroupReceived(groupName, v)
    );
  }, [
    groupName,
    getIndexVolumeGroup,
    indexVolumeGroupReceived,
    getIndexVolumesInGroup,
    indexVolumesInGroupReceived
  ]);

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
