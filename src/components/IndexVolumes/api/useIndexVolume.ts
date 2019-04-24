import * as React from "react";

import useApi from "./useApi";
import useListReducer from "lib/useListReducer/useListReducer";
import { IndexVolume } from "./types";

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
    itemAdded,
    itemRemoved,
    itemsReceived,
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
      itemsReceived(groups.map(g => g.name)),
    );
  }, [
    volumeId,
    getIndexVolumeById,
    setIndexVolume,
    getGroupsForIndexVolume,
    itemsReceived,
  ]);

  const addToGroup = React.useCallback(
    (groupName: string) => {
      addVolumeToGroup(volumeId, groupName).then(() => itemAdded(groupName));
    },
    [volumeId, addVolumeToGroup, itemAdded],
  );
  const removeFromGroup = React.useCallback(
    (groupName: string) => {
      removeVolumeFromGroup(volumeId, groupName).then(() =>
        itemRemoved(groupName),
      );
    },
    [volumeId, removeVolumeFromGroup, itemRemoved],
  );

  return { indexVolume, groupNames, addToGroup, removeFromGroup };
};

export default useIndexVolume;
