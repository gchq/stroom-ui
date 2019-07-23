import useListReducer from "lib/useListReducer/useListReducer";
import * as React from "react";
import { IndexVolumeGroup } from "./types";
import useApi from "./useApi";

interface UseIndexVolumeGroups {
  groups: IndexVolumeGroup[];
  createIndexVolumeGroup: (name: string) => Promise<void>;
  deleteIndexVolumeGroup: (name: string) => Promise<void>;
}

const useIndexVolumeGroups = (): UseIndexVolumeGroups => {
  const { items: groups, receiveItems, addItem, removeItem } = useListReducer<
    IndexVolumeGroup
  >(g => g.name);

  const {
    createIndexVolumeGroup,
    deleteIndexVolumeGroup,
    getIndexVolumeGroups,
  } = useApi();

  React.useEffect(() => {
    getIndexVolumeGroups().then(receiveItems);
  }, [getIndexVolumeGroups, receiveItems]);

  return {
    groups,
    createIndexVolumeGroup: React.useCallback(
      (groupName: string) => createIndexVolumeGroup(groupName).then(addItem),
      [createIndexVolumeGroup, addItem],
    ),
    deleteIndexVolumeGroup: React.useCallback(
      (groupName: string) =>
        deleteIndexVolumeGroup(groupName).then(() => removeItem(groupName)),
      [deleteIndexVolumeGroup, removeItem],
    ),
  };
};

export default useIndexVolumeGroups;
