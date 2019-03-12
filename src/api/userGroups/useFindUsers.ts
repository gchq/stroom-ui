import { useState, useCallback } from "react";

import { useActionCreators } from "./redux";
import useApi from "./useApi";
import { User } from "../../types";
import { IsGroup } from "./types";

type FindUsers = (name?: string, isGroup?: IsGroup, uuid?: string) => void;

interface UseFindUsers {
  findUsers: FindUsers;
  users: Array<User>;
}

/**
 * Encapsulate the retrieval of users, it sends all users to the
 * redux store, and also keeps the users for this component in local state.
 */
export const useFindUsers = (): UseFindUsers => {
  const [users, setUsers] = useState<Array<User>>([]);

  const { findUsers: findUsersRaw } = useApi();

  const { usersReceived } = useActionCreators();

  const findUsers: FindUsers = useCallback(
    (name, isGroup, uuid) => {
      findUsersRaw(name, isGroup, uuid).then(_users => {
        setUsers(_users);
        usersReceived(_users);
      });
    },
    [findUsersRaw]
  );

  return {
    users,
    findUsers
  };
};

export default useFindUsers;
