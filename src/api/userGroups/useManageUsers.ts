import { useCallback } from "react";

import useApi from "./useApi";
import { User } from "src/types";
import { IsGroup } from "./types";
import useListReducer from "src/lib/useListReducer";

interface ManageUsers {
  users: Array<User>;
  findUsers: (name?: string, isGroup?: IsGroup, uuid?: string) => void;
  addUserToGroup: (userUuid: string, groupUuid: string) => void;
  createUser: (name: string, isGroup: boolean) => Promise<User>;
  deleteUser: (userUuid: string) => void;
}

const useManageUsers = (): ManageUsers => {
  const {
    items: users,
    itemAdded,
    itemRemoved,
    itemsReceived
  } = useListReducer<User>(u => u.uuid);

  const { createUser, deleteUser, addUserToGroup, findUsers } = useApi();

  return {
    users,
    findUsers: useCallback(
      (name, isGroup, uuid) => {
        findUsers(name, isGroup, uuid).then(itemsReceived);
      },
      [findUsers, itemsReceived]
    ),
    addUserToGroup: useCallback(
      (userUuid: string, groupUuid: string) => {
        addUserToGroup(userUuid, groupUuid); // no immediate feedback here...
      },
      [addUserToGroup]
    ),
    createUser: useCallback(
      (name: string, isGroup: boolean) => {
        let p = createUser(name, isGroup);
        p.then(itemAdded);
        return p;
      },
      [createUser, itemAdded]
    ),
    deleteUser: useCallback(
      (userUuid: string) => {
        deleteUser(userUuid).then(() => itemRemoved(userUuid));
      },
      [itemRemoved, deleteUser]
    )
  };
};

export default useManageUsers;
