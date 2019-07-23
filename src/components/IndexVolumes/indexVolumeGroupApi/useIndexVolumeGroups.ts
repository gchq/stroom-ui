import useListReducer from "lib/useListReducer/useListReducer";
import * as React from "react";
import { IndexVolumeGroup } from "./types";
import useApi from "./useApi";

interface UseIndexVolumeGroups {
  groups: IndexVolumeGroup[];
  createIndexVolumeGroup: (name?: string) => Promise<void>;
  deleteIndexVolumeGroup: (name: string) => Promise<void>;
  update: (entity: IndexVolumeGroup) => Promise<void>;
}

const useIndexVolumeGroups = (): UseIndexVolumeGroups => {
  const {
    items: groups,
    receiveItems,
    addItem,
    removeItem,
    updateItemAtIndex,
  } = useListReducer<IndexVolumeGroup>(g => g.name);

  const {
    createIndexVolumeGroup,
    deleteIndexVolumeGroup,
    getIndexVolumeGroups,
    update,
  } = useApi();

  React.useEffect(() => {
    getIndexVolumeGroups().then(receiveItems);
  }, [getIndexVolumeGroups, receiveItems]);

  return {
    groups,
    createIndexVolumeGroup: React.useCallback(
      (name?: string) => createIndexVolumeGroup(name).then(addItem),
      [createIndexVolumeGroup, addItem],
    ),
    deleteIndexVolumeGroup: React.useCallback(
      (groupName: string) =>
        deleteIndexVolumeGroup(groupName).then(() => removeItem(groupName)),
      [deleteIndexVolumeGroup, removeItem],
    ),
    update: React.useCallback(
      (entity: IndexVolumeGroup) =>
        update(entity).then(response => {
          updateItemAtIndex(
            groups.findIndex(group => group.id == entity.id),
            response,
          );
        }),
      [update, updateItemAtIndex, groups],
    ),
  };
};

export default useIndexVolumeGroups;
