import useListReducer from "lib/useListReducer/useListReducer";
import * as React from "react";
import { IndexVolume } from "./types";
import useApi from "./useApi";

interface UseIndexVolume {
  indexVolume: IndexVolume | undefined;
  groupNames: string[];
  addToGroup: (groupName: string) => void;
  removeFromGroup: (groupName: string) => void;
}

const useIndexVolume = (volumeId: string): UseIndexVolume => {
  const [indexVolume, setIndexVolume] = React.useState<IndexVolume | undefined>(
    undefined,
  );
  const {
    items: groupNames,
    addItem,
    removeItem,
    receiveItems,
  } = useListReducer<string>(g => g);

  const {
    getIndexVolumeById,
    getGroupsForIndexVolume,
    addVolumeToGroup,
    removeVolumeFromGroup,
  } = useApi();

  React.useEffect(() => {
    getIndexVolumeById(volumeId).then(setIndexVolume);
    getGroupsForIndexVolume(volumeId).then(groups =>
      receiveItems(groups.map(g => g.name)),
    );
  }, [
    volumeId,
    getIndexVolumeById,
    setIndexVolume,
    getGroupsForIndexVolume,
    receiveItems,
  ]);

  const addToGroup = React.useCallback(
    (groupName: string) => {
      addVolumeToGroup(volumeId, groupName).then(() => addItem(groupName));
    },
    [volumeId, addVolumeToGroup, addItem],
  );
  const removeFromGroup = React.useCallback(
    (groupName: string) => {
      removeVolumeFromGroup(volumeId, groupName).then(() =>
        removeItem(groupName),
      );
    },
    [volumeId, removeVolumeFromGroup, removeItem],
  );

  return { indexVolume, groupNames, addToGroup, removeFromGroup };
};

export default useIndexVolume;
