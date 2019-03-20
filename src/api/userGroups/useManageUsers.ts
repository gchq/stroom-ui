import { useCallback } from "react";

import useApi from "./useApi";
import { useActionCreators } from "./redux";
import { User } from "../../types";
import { IsGroup } from "./types";

interface ManageUsers {
  findUsers: (name?: string, isGroup?: IsGroup, uuid?: string) => void;
  addUserToGroup: (userUuid: string, groupUuid: string) => void;
  createUser: (name: string, isGroup: boolean) => Promise<User>;
  deleteUser: (userUuid: string) => void;
}

const useManageUsers = (): ManageUsers => {
  const { userCreated, userDeleted, userAddedToGroup } = useActionCreators();
  const { createUser, deleteUser, addUserToGroup, findUsers } = useApi();

  return {
    findUsers,
    addUserToGroup: useCallback(
      (userUuid: string, groupUuid: string) => {
        addUserToGroup(userUuid, groupUuid).then(() =>
          userAddedToGroup(userUuid, groupUuid)
        );
      },
      [addUserToGroup, userAddedToGroup]
    ),
    createUser: useCallback(
      (name: string, isGroup: boolean) => {
        let p = createUser(name, isGroup);
        p.then(userCreated);
        return p;
      },
      [createUser, userCreated]
    ),
    deleteUser: useCallback(
      (userUuid: string) => {
        deleteUser(userUuid).then(() => userDeleted(userUuid));
      },
      [userDeleted, deleteUser]
    )
  };
};

export default useManageUsers;
