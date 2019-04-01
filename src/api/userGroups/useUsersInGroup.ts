import { useEffect, useCallback } from "react";

import useApi from "./useApi";
import { User } from "src/types";
import useListReducer from "src/lib/useListReducer/useListReducer";

interface UseGroupsForUser {
  users: Array<User>;
  addToGroup: (userUuid: string) => void;
  removeFromGroup: (userUuid: string) => void;
}

const useGroupsForUser = (group: User): UseGroupsForUser => {
  const {
    items: users,
    itemsReceived,
    itemAdded,
    itemRemoved
  } = useListReducer<User>(u => u.uuid);

  const {
    findUsersInGroup,
    addUserToGroup,
    removeUserFromGroup,
    fetchUser
  } = useApi();

  useEffect(() => {
    findUsersInGroup(group.uuid).then(itemsReceived);
  }, [group]);

  const addToGroup = useCallback(
    (userUuid: string) => {
      addUserToGroup(userUuid, group.uuid)
        .then(() => fetchUser(userUuid))
        .then(itemAdded);
    },
    [group, fetchUser, addUserToGroup]
  );
  const removeFromGroup = useCallback(
    (userUuid: string) => {
      removeUserFromGroup(userUuid, group.uuid).then(() =>
        itemRemoved(userUuid)
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

export default useGroupsForUser;
