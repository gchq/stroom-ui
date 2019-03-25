import { useEffect, useMemo } from "react";

import useApi from "./useApi";
import { User } from "../../types";
import useListReducer from "../../lib/useListReducer";

/**
 * Use this to convert a list of users UUID's into a list of user objects.
 *
 * @param userUuids The list of user UUID's to retrieve
 */
const useUsers = (userUuids: Array<string>): Array<User> => {
  const { fetchUser } = useApi();
  const { items: allUsers, itemAdded } = useListReducer<User>(u => u.uuid);

  const users = useMemo(
    () => allUsers.filter(u => userUuids.includes(u.uuid)),
    [allUsers, userUuids]
  );

  // Don't feed 'users' into the [], otherwise it will re-run this as users come in
  useEffect(() => {
    let userUuidsFound = allUsers.map(u => u.uuid);
    userUuids
      .filter(userUuid => !userUuidsFound.includes(userUuid))
      .forEach(userUuid => {
        fetchUser(userUuid).then(itemAdded);
      });
  }, [userUuids, fetchUser, itemAdded]);

  return users;
};

export default useUsers;
