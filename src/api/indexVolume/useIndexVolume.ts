import { useEffect, useCallback, useState, useReducer } from "react";

import useApi from "./useApi";
import { IndexVolumeGroup, IndexVolume } from "../../types";

interface UseIndexVolume {
  indexVolume: IndexVolume | undefined;
  groupNames: Array<string>;
  addToGroup: (groupName: string) => void;
  removeFromGroup: (groupName: string) => void;
}

type GroupsReceived = {
  type: "received";
  groups: Array<IndexVolumeGroup>;
};
type GroupAdded = {
  type: "added";
  groupName: string;
};
type GroupRemoved = {
  type: "removed";
  groupName: string;
};

const groupNamesReducer = (
  state: Array<string>,
  action: GroupsReceived | GroupAdded | GroupRemoved
): Array<string> => {
  switch (action.type) {
    case "received":
      return action.groups.map(g => g.name);
    case "added":
      return state.concat([action.groupName]);
    case "removed":
      return state.filter(g => g !== action.groupName);
  }

  return state;
};

const useIndexVolume = (volumeId: string): UseIndexVolume => {
  const [indexVolume, setIndexVolume] = useState<IndexVolume | undefined>(
    undefined
  );
  const [groupNames, dispatchGroupNames] = useReducer(groupNamesReducer, []);

  const {
    getIndexVolumeById,
    getGroupsForIndexVolume,
    addVolumeToGroup,
    removeVolumeFromGroup
  } = useApi();

  useEffect(() => {
    getIndexVolumeById(volumeId).then(setIndexVolume);
    getGroupsForIndexVolume(volumeId).then(groups =>
      dispatchGroupNames({ type: "received", groups })
    );
  }, [volumeId, getIndexVolumeById, setIndexVolume, getGroupsForIndexVolume]);

  const addToGroup = useCallback(
    (groupName: string) => {
      addVolumeToGroup(volumeId, groupName).then(() =>
        dispatchGroupNames({ type: "added", groupName })
      );
    },
    [volumeId, addVolumeToGroup]
  );
  const removeFromGroup = useCallback(
    (groupName: string) => {
      removeVolumeFromGroup(volumeId, groupName).then(() =>
        dispatchGroupNames({ type: "removed", groupName })
      );
    },
    [volumeId, removeVolumeFromGroup]
  );

  return { indexVolume, groupNames, addToGroup, removeFromGroup };
};

export default useIndexVolume;
