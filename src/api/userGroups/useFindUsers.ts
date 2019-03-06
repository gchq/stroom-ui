import { useEffect, useMemo, useCallback } from "react";
import * as uuidv4 from "uuid/v4";

import { useActionCreators } from "./redux";
import useReduxState from "../../lib/useReduxState";
import useApi, { IsGroup } from "./useApi";
import { GlobalStoreState } from "../../startup/reducers";
import { User } from "../../types";

type FindUsers = (name?: string, isGroup?: IsGroup, uuid?: string) => void;

export interface UseFindUsers {
  findUsers: FindUsers;
  users: Array<User>;
}

/**
 * Encapsulate the retrieval of users with a per-component listing ID.
 */
export const useFindUsers = (): UseFindUsers => {
  const listingId = useMemo(() => uuidv4(), []);

  const { findUsers: findUsersWithId } = useApi();

  const { usersReceived } = useActionCreators();

  const users = useReduxState(
    ({ userGroups: { users } }: GlobalStoreState) => users[listingId] || []
  );

  const findUsers: FindUsers = useCallback(
    (name, isGroup, uuid) => {
      findUsersWithId(name, isGroup, uuid).then(u =>
        usersReceived(listingId, u)
      );
    },
    [listingId, findUsersWithId]
  );

  useEffect(() => {
    findUsers();
  }, [findUsers]);

  return {
    users,
    findUsers
  };
};

export default useFindUsers;
