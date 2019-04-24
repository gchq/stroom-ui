import * as React from "react";

import useApi from "./useApi";
import useListReducer from "lib/useListReducer/useListReducer";
import { IndexVolumeGroup } from "./types";

interface UseIndexVolumeGroups {
  groups: IndexVolumeGroup[];
  createIndexVolumeGroup: (name: string) => Promise<void>;
  deleteIndexVolumeGroup: (name: string) => Promise<void>;
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

  React.useEffect(() => {
    getIndexVolumeGroups().then(itemsReceived);
  }, [getIndexVolumeGroups]);

  return {
    groups,
    createIndexVolumeGroup: React.useCallback(
      (groupName: string) => createIndexVolumeGroup(groupName).then(itemAdded),
      [groups, createIndexVolumeGroup],
    ),
    deleteIndexVolumeGroup: React.useCallback(
      (groupName: string) =>
        deleteIndexVolumeGroup(groupName).then(() => itemRemoved(groupName)),
      [groups, deleteIndexVolumeGroup],
    ),
  };
};

export default useIndexVolumeGroups;
