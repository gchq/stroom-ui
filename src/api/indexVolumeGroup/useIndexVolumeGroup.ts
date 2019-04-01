import { useEffect, useCallback, useState } from "react";

import useApi from "./useApi";
import { useApi as useIndexVolumeApi } from "../indexVolume/useApi";

import { IndexVolume, IndexVolumeGroup } from "src/types";

interface UseIndexVolumeGroup {
  indexVolumes: Array<IndexVolume>;
  indexVolumeGroup: IndexVolumeGroup | undefined;
  removeVolume: (volumeId: string) => void;
}

const useIndexVolumeGroup = (groupName: string): UseIndexVolumeGroup => {
  const [indexVolumes, setIndexVolumes] = useState<Array<IndexVolume>>([]);
  const [indexVolumeGroup, setIndexVolumeGroup] = useState<
    IndexVolumeGroup | undefined
  >(undefined);

  const { getIndexVolumeGroup } = useApi();
  const { getIndexVolumesInGroup, removeVolumeFromGroup } = useIndexVolumeApi();

  useEffect(() => {
    getIndexVolumeGroup(groupName).then(setIndexVolumeGroup);
    getIndexVolumesInGroup(groupName).then(setIndexVolumes);
  }, [
    groupName,
    getIndexVolumeGroup,
    setIndexVolumeGroup,
    getIndexVolumesInGroup,
    setIndexVolumes
  ]);

  const removeVolume = useCallback(
    (volumeId: string) => removeVolumeFromGroup(volumeId, groupName),
    [groupName, removeVolumeFromGroup]
  );

  return {
    indexVolumes,
    indexVolumeGroup,
    removeVolume
  };
};

export default useIndexVolumeGroup;
