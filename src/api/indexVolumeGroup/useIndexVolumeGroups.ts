import { useEffect } from "react";

import useApi from "./useApi";
import useReduxState from "../../lib/useReduxState";
import { IndexVolumeGroup } from "../../types";

interface UseIndexVolumeGroups {
  groups: Array<IndexVolumeGroup>;
  createIndexVolumeGroup: (name: string) => void;
  deleteIndexVolumeGroup: (name: string) => void;
}

export default (): UseIndexVolumeGroups => {
  const groups = useReduxState(({ indexVolumeGroups: { groups } }) => groups);
  const {
    createIndexVolumeGroup,
    deleteIndexVolumeGroup,
    getIndexVolumeGroups
  } = useApi();

  useEffect(() => {
    getIndexVolumeGroups();
  }, [getIndexVolumeGroups]);

  return {
    groups,
    createIndexVolumeGroup,
    deleteIndexVolumeGroup
  };
};
