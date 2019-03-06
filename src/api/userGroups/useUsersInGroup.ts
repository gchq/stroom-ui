import { useEffect, useCallback } from "react";

import useApi from "./useApi";
import { User } from "../../types";
import useReduxState from "../../lib/useReduxState";

interface UseUsersInGroup {
  users: Array<User>;
  removeFromGroup: (groupUuid: string) => void;
}

export default (group: User): UseUsersInGroup => {
  const { findUsersInGroup, removeUserFromGroup } = useApi();
  useEffect(() => {
    findUsersInGroup(group.uuid);
  }, [group]);

  const { usersInGroup } = useReduxState(
    ({ userGroups: { usersInGroup } }) => ({
      usersInGroup
    })
  );
  const users = usersInGroup[group.uuid] || [];

  const removeFromGroup = useCallback(
    (userUuid: string) => {
      removeUserFromGroup(userUuid, group.uuid);
    },
    [group, removeUserFromGroup]
  );

  return {
    users,
    removeFromGroup
  };
};
