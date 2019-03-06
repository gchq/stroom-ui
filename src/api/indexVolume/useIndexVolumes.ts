import { useEffect } from "react";

import useApi from "./useApi";
import { IndexVolume } from "../../types";
import useReduxState from "../../lib/useReduxState";

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

  useEffect(getIndexVolumes, [getIndexVolumes]);

  return {
    indexVolumes,
    createIndexVolume,
    deleteIndexVolume,
    addVolumeToGroup
  };
};
