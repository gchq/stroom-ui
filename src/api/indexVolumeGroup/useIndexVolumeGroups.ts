import { useEffect, useCallback, useReducer } from "react";

import useApi from "./useApi";
import { IndexVolumeGroup } from "../../types";

interface UseIndexVolumeGroups {
  groups: Array<IndexVolumeGroup>;
  createIndexVolumeGroup: (name: string) => void;
  deleteIndexVolumeGroup: (name: string) => void;
}

type Received = {
  type: "received";
  groups: Array<IndexVolumeGroup>;
};
type Created = {
  type: "created";
  group: IndexVolumeGroup;
};
type Deleted = {
  type: "deleted";
  groupName: string;
};

const reducer = (
  state: Array<IndexVolumeGroup>,
  action: Received | Created | Deleted
): Array<IndexVolumeGroup> => {
  switch (action.type) {
    case "received":
      return action.groups;
    case "created":
      return state.concat([action.group]);
    case "deleted":
      return state.filter(g => g.name !== action.groupName);
  }

  return state;
};

const useIndexVolumeGroups = (): UseIndexVolumeGroups => {
  const [groups, dispatch] = useReducer(reducer, []);

  const {
    createIndexVolumeGroup,
    deleteIndexVolumeGroup,
    getIndexVolumeGroups
  } = useApi();

  useEffect(() => {
    getIndexVolumeGroups().then(groups =>
      dispatch({ type: "received", groups })
    );
  }, [getIndexVolumeGroups]);

  return {
    groups,
    createIndexVolumeGroup: useCallback(
      (groupName: string) =>
        createIndexVolumeGroup(groupName).then(group =>
          dispatch({ type: "created", group })
        ),
      [groups, createIndexVolumeGroup]
    ),
    deleteIndexVolumeGroup: useCallback(
      (groupName: string) =>
        deleteIndexVolumeGroup(groupName).then(() =>
          dispatch({ type: "deleted", groupName })
        ),
      [groups, deleteIndexVolumeGroup]
    )
  };
};

export default useIndexVolumeGroups;
