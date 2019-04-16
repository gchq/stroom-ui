import * as React from "react";

import useApi from "./useApi";
import { useApi as useIndexVolumeApi } from "src/components/IndexVolumes/api/useApi";
import { IndexVolumeGroup } from "./types";
import { IndexVolume } from "src/components/IndexVolumes/api/types";

interface UseIndexVolumeGroup {
  indexVolumes: IndexVolume[];
  indexVolumeGroup: IndexVolumeGroup | undefined;
  removeVolume: (volumeId: string) => void;
}

const useIndexVolumeGroup = (groupName: string): UseIndexVolumeGroup => {
  const [indexVolumes, setIndexVolumes] = React.useState<IndexVolume[]>([]);
  const [indexVolumeGroup, setIndexVolumeGroup] = React.useState<
    IndexVolumeGroup | undefined
  >(undefined);

  const { getIndexVolumeGroup } = useApi();
  const { getIndexVolumesInGroup, removeVolumeFromGroup } = useIndexVolumeApi();

  React.useEffect(() => {
    getIndexVolumeGroup(groupName).then(setIndexVolumeGroup);
    getIndexVolumesInGroup(groupName).then(setIndexVolumes);
  }, [
    groupName,
    getIndexVolumeGroup,
    setIndexVolumeGroup,
    getIndexVolumesInGroup,
    setIndexVolumes,
  ]);

  const removeVolume = React.useCallback(
    (volumeId: string) => removeVolumeFromGroup(volumeId, groupName),
    [groupName, removeVolumeFromGroup],
  );

  return {
    indexVolumes,
    indexVolumeGroup,
    removeVolume,
  };
};

export default useIndexVolumeGroup;
