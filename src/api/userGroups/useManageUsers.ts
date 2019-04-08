import * as React from "react";

import useApi from "./useApi";
import { User } from "src/types";
import useListReducer from "src/lib/useListReducer";

interface ManageUsers {
  users: User[];
  findUsers: (name?: string, isGroup?: boolean, uuid?: string) => void;
  addUserToGroup: (userUuid: string, groupUuid: string) => void;
  createUser: (name: string, isGroup: boolean) => Promise<User>;
  deleteUser: (userUuid: string) => void;
}

const useManageUsers = (): ManageUsers => {
  const {
    items: users,
    itemAdded,
    itemRemoved,
    itemsReceived,
  } = useListReducer<User>(u => u.uuid);

  const { createUser, deleteUser, addUserToGroup, findUsers } = useApi();

  return {
    users,
    findUsers: React.useCallback(
      (name, isGroup, uuid) => {
        findUsers(name, isGroup, uuid).then(itemsReceived);
      },
      [findUsers, itemsReceived],
    ),
    addUserToGroup: React.useCallback(
      (userUuid: string, groupUuid: string) => {
        addUserToGroup(userUuid, groupUuid); // no immediate feedback here...
      },
      [addUserToGroup],
    ),
    createUser: React.useCallback(
      (name: string, isGroup: boolean) => {
        let p = createUser(name, isGroup);
        p.then(itemAdded);
        return p;
      },
      [createUser, itemAdded],
    ),
    deleteUser: React.useCallback(
      (userUuid: string) => {
        deleteUser(userUuid).then(() => itemRemoved(userUuid));
      },
      [itemRemoved, deleteUser],
    ),
  };
};

export default useManageUsers;
