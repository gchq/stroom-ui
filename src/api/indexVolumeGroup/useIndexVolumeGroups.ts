import { useEffect, useCallback } from "react";

import { useActionCreators } from "./redux";
import useApi from "./useApi";
import useReduxState from "../../lib/useReduxState";
import { IndexVolumeGroup } from "../../types";

interface UseIndexVolumeGroups {
  groups: Array<IndexVolumeGroup>;
  createIndexVolumeGroup: (name: string) => void;
  deleteIndexVolumeGroup: (name: string) => void;
}

const useIndexVolumeGroups = (): UseIndexVolumeGroups => {
  const {
    indexVolumeGroupCreated,
    indexVolumeGroupDeleted,
    indexVolumeGroupsReceived
  } = useActionCreators();
  const groups = useReduxState(({ indexVolumeGroups: { groups } }) => groups);
  const {
    createIndexVolumeGroup,
    deleteIndexVolumeGroup,
    getIndexVolumeGroups
  } = useApi();

  useEffect(() => {
    getIndexVolumeGroups().then(indexVolumeGroupsReceived);
  }, [getIndexVolumeGroups]);

  return {
    groups,
    createIndexVolumeGroup: useCallback(
      (groupName: string) => {
        createIndexVolumeGroup(groupName).then(indexVolumeGroupCreated);
      },
      [createIndexVolumeGroup]
    ),
    deleteIndexVolumeGroup: useCallback(
      (groupName: string) => {
        deleteIndexVolumeGroup(groupName).then(() =>
          indexVolumeGroupDeleted(groupName)
        );
      },
      [deleteIndexVolumeGroup, indexVolumeGroupDeleted]
    )
  };
};

export default useIndexVolumeGroups;