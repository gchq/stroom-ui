import { useEffect, useCallback } from "react";

import useApi from "./useApi";
import { useActionCreators } from "./redux";
import { User } from "../../types";
import useReduxState from "../../lib/useReduxState";

interface UseUsersInGroup {
  users: Array<User>;
  addToGroup: (userUuid: string) => void;
  removeFromGroup: (groupUuid: string) => void;
}

const useUsersInGroup = (group: User): UseUsersInGroup => {
  const { findUsersInGroup, addUserToGroup, removeUserFromGroup } = useApi();

  const {
    usersInGroupReceived,
    userAddedToGroup,
    userRemovedFromGroup
  } = useActionCreators();
  useEffect(() => {
    findUsersInGroup(group.uuid).then((users: Array<User>) =>
      usersInGroupReceived(group.uuid, users)
    );
  }, [group]);

  const { usersInGroup } = useReduxState(
    ({ userGroups: { usersInGroup } }) => ({
      usersInGroup
    })
  );
  const users = usersInGroup[group.uuid] || [];

  const addToGroup = useCallback(
    (userUuid: string) => {
      addUserToGroup(userUuid, group.uuid).then(() =>
        userAddedToGroup(userUuid, group.uuid)
      );
    },
    [group, addUserToGroup]
  );

  const removeFromGroup = useCallback(
    (userUuid: string) => {
      removeUserFromGroup(userUuid, group.uuid).then(() =>
        userRemovedFromGroup(userUuid, group.uuid)
      );
    },
    [group, removeUserFromGroup]
  );

  return {
    users,
    addToGroup,
    removeFromGroup
  };
};

export default useUsersInGroup;
