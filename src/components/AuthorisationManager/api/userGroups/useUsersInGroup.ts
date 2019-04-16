import * as React from "react";

import useApi from "./useApi";
import useListReducer from "src/lib/useListReducer/useListReducer";
import { User } from "./types";

interface UseGroupsForUser {
  users: User[];
  addToGroup: (userUuid: string) => void;
  removeFromGroup: (userUuid: string) => void;
}

const useGroupsForUser = (group: User): UseGroupsForUser => {
  const {
    items: users,
    itemsReceived,
    itemAdded,
    itemRemoved,
  } = useListReducer<User>(u => u.uuid);

  const {
    findUsersInGroup,
    addUserToGroup,
    removeUserFromGroup,
    fetchUser,
  } = useApi();

  React.useEffect(() => {
    findUsersInGroup(group.uuid).then(itemsReceived);
  }, [group]);

  const addToGroup = React.useCallback(
    (userUuid: string) => {
      addUserToGroup(userUuid, group.uuid)
        .then(() => fetchUser(userUuid))
        .then(itemAdded);
    },
    [group, fetchUser, addUserToGroup],
  );
  const removeFromGroup = React.useCallback(
    (userUuid: string) => {
      removeUserFromGroup(userUuid, group.uuid).then(() =>
        itemRemoved(userUuid),
      );
    },
    [group, removeUserFromGroup],
  );

  return {
    users,
    addToGroup,
    removeFromGroup,
  };
};

export default useGroupsForUser;
