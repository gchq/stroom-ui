import { useEffect, useCallback } from "react";

import useApi from "./useApi";
import { User } from "../../types";
import useReduxState from "../../lib/useReduxState";

interface UseGroupsForUser {
  groups: Array<User>;
  addToGroup: (groupUuid: string) => void;
  removeFromGroup: (groupUuid: string) => void;
}

export default (user: User): UseGroupsForUser => {
  const { findGroupsForUser, addUserToGroup, removeUserFromGroup } = useApi();
  useEffect(() => {
    findGroupsForUser(user.uuid);
  }, [user]);

  const groupsForUser = useReduxState(
    ({ userGroups: { groupsForUser } }) => groupsForUser
  );
  const groups = groupsForUser[user.uuid] || [];

  const addToGroup = useCallback(
    (groupUuid: string) => {
      addUserToGroup(user.uuid, groupUuid);
    },
    [user, addUserToGroup]
  );
  const removeFromGroup = useCallback(
    (groupUuid: string) => {
      removeUserFromGroup(user.uuid, groupUuid);
    },
    [user, removeUserFromGroup]
  );

  return {
    groups,
    addToGroup,
    removeFromGroup
  };
};
