import { useCallback } from "react";

import useApi from "./useApi";
import { useActionCreators } from "./redux";
import { User } from "../../types";

interface ManageUsers {
  addUserToGroup: (userUuid: string, groupUuid: string) => void;
  createUser: (name: string, isGroup: boolean) => Promise<User>;
  deleteUser: (userUuid: string) => void;
}

export default (): ManageUsers => {
  const { userCreated, userDeleted, userAddedToGroup } = useActionCreators();
  const { createUser, deleteUser, addUserToGroup } = useApi();

  return {
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
