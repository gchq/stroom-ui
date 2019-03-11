import { useEffect, useMemo } from "react";

import { useActionCreators } from "./redux";
import useApi from "./useApi";
import { User } from "../../types";
import useReduxState from "../../lib/useReduxState";

/**
 * Use this to convert a list of users UUID's into a list of user objects.
 *
 * @param userUuids The list of user UUID's to retrieve
 */
export default (userUuids: Array<string>): Array<User> => {
  const { fetchUser } = useApi();
  const { userReceived } = useActionCreators();

  const allUsers = useReduxState(({ userGroups: { allUsers } }) => allUsers);
  const users = useMemo(
    () => allUsers.filter(u => userUuids.includes(u.uuid)),
    [allUsers, userUuids]
  );
  let userUuidsFound = users.map(u => u.uuid);

  useEffect(() => {
    userUuids
      .filter(userUuid => !userUuidsFound.includes(userUuid))
      .forEach(userUuid => {
        fetchUser(userUuid).then(userReceived);
      });
  }, [userUuids, fetchUser, userReceived]);

  return users;
};
