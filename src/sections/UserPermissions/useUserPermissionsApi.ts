import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import { useActionCreators } from "./redux";
import useHttpClient from "../../lib/useHttpClient/useHttpClient";
import { User } from "../../types";

interface Api {
  findUsers: (
    listId: string,
    name?: string,
    isGroup?: Boolean,
    uuid?: string
  ) => void;
  findUsersInGroup: (groupUuid: string) => void;
  findGroupsForUser: (userUuid: string) => void;
  createUser: (name: string, isGroup: boolean) => void;
  deleteUser: (uuid: string) => void;
  addUserToGroup: (userUuid: string, groupUuid: string) => void;
  removeUserFromGroup: (userUuid: string, groupUuid: string) => void;
}

const useApi = (): Api => {
  const store = useContext(StoreContext);
  const { httpGet, httpPost, httpDelete, httpPut } = useHttpClient();
  const {
    usersReceived,
    usersInGroupReceived,
    groupsForUserReceived,
    userCreated,
    userDeleted,
    userAddedToGroup,
    userRemovedFromGroup
  } = useActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const findUsers = useCallback(
    (listId: string, name?: string, isGroup?: Boolean, uuid?: string) => {
      const state = store.getState();
      var url = new URL(`${state.config.values.stroomBaseServiceUrl}/users/v1`);
      if (name !== undefined && name.length > 0)
        url.searchParams.append("name", name);
      if (isGroup !== undefined)
        url.searchParams.append("isGroup", isGroup.toString());
      if (uuid !== undefined && uuid.length > 0)
        url.searchParams.append("uuid", uuid);

      httpGet(
        url.href,
        r =>
          r.json().then((users: Array<User>) => usersReceived(listId, users)),
        {},
        true
      );
    },
    [httpGet, usersReceived]
  );

  const findUsersInGroup = useCallback(
    (groupUuid: string) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/usersInGroup/${groupUuid}`;

      httpGet(
        url,
        r =>
          r
            .json()
            .then((users: Array<User>) =>
              usersInGroupReceived(groupUuid, users)
            ),
        {},
        true
      );
    },
    [httpGet, usersInGroupReceived]
  );

  const findGroupsForUser = useCallback(
    (userUuid: string) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/groupsForUser/${userUuid}`;

      httpGet(
        url,
        r =>
          r
            .json()
            .then((users: Array<User>) =>
              groupsForUserReceived(userUuid, users)
            ),
        {},
        true
      );
    },
    [httpGet, groupsForUserReceived]
  );

  const createUser = useCallback(
    (name: string, isGroup: boolean) => {
      const state = store.getState();
      var url = `${state.config.values.stroomBaseServiceUrl}/users/v1`;

      // Create DTO
      const body = JSON.stringify({
        name,
        isGroup
      });

      httpPost(
        url,
        response => response.json().then((user: User) => userCreated(user)),
        {
          body
        }
      );
    },
    [httpPost, userCreated]
  );

  const deleteUser = useCallback(
    (uuid: string) => {
      const state = store.getState();
      var url = `${state.config.values.stroomBaseServiceUrl}/users/v1/${uuid}`;

      httpDelete(url, response =>
        response.text().then(() => userDeleted(uuid))
      );
    },
    [httpDelete, userDeleted]
  );

  const addUserToGroup = useCallback(
    (userUuid: string, groupUuid: string) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/${userUuid}/${groupUuid}`;

      httpPut(url, response =>
        response.text().then(() => userAddedToGroup(userUuid, groupUuid))
      );
    },
    [httpPut, userAddedToGroup]
  );

  const removeUserFromGroup = useCallback(
    (userUuid: string, groupUuid: string) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/${userUuid}/${groupUuid}`;

      httpDelete(url, response =>
        response.text().then(() => userRemovedFromGroup(userUuid, groupUuid))
      );
    },
    [httpDelete, userRemovedFromGroup]
  );

  return {
    addUserToGroup,
    createUser,
    deleteUser,
    findGroupsForUser,
    findUsers,
    findUsersInGroup,
    removeUserFromGroup
  };
};

export default useApi;
