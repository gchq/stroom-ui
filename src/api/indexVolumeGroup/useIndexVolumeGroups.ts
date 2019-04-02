import { useEffect, useCallback } from "react";

import useApi from "./useApi";
import { IndexVolumeGroup } from "src/types";
import useListReducer from "src/lib/useListReducer/useListReducer";

interface UseIndexVolumeGroups {
  groups: IndexVolumeGroup[];
  createIndexVolumeGroup: (name: string) => void;
  deleteIndexVolumeGroup: (name: string) => void;
}

const useIndexVolumeGroups = (): UseIndexVolumeGroups => {
  const {
    items: groups,
    itemsReceived,
    itemAdded,
    itemRemoved,
  } = useListReducer<IndexVolumeGroup>(g => g.name);

  const {
    createIndexVolumeGroup,
    deleteIndexVolumeGroup,
    getIndexVolumeGroups,
  } = useApi();

  useEffect(() => {
    getIndexVolumeGroups().then(itemsReceived);
  }, [getIndexVolumeGroups]);

  return {
    groups,
    createIndexVolumeGroup: useCallback(
      (groupName: string) => createIndexVolumeGroup(groupName).then(itemAdded),
      [groups, createIndexVolumeGroup],
    ),
    deleteIndexVolumeGroup: useCallback(
      (groupName: string) =>
        deleteIndexVolumeGroup(groupName).then(() => itemRemoved(groupName)),
      [groups, deleteIndexVolumeGroup],
    ),
  };
};

export default useIndexVolumeGroups;
