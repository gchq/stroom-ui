import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import { useActionCreators } from "./redux";
import useHttpClient from "../../lib/useHttpClient/useHttpClient";
import { User } from "../../types";

interface Api {
  findUsers: (
    listId: string,
    name?: string,
    isGroup?: "User" | "Group",
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
  const {
    httpGetJson,
    httpPostJsonResponse,
    httpDeleteEmptyResponse,
    httpPutEmptyResponse
  } = useHttpClient();
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
    (
      listId: string,
      name?: string,
      isGroup?: "Group" | "User",
      uuid?: string
    ) => {
      const state = store.getState();
      var url = new URL(`${state.config.values.stroomBaseServiceUrl}/users/v1`);
      if (name !== undefined && name.length > 0)
        url.searchParams.append("name", name);
      if (isGroup !== undefined) {
        switch (isGroup) {
          case "Group":
            url.searchParams.append("isGroup", "true");
            break;
          case "User":
            url.searchParams.append("isGroup", "false");
            break;
        }
      }

      if (uuid !== undefined && uuid.length > 0)
        url.searchParams.append("uuid", uuid);

      httpGetJson(url.href, {}, true).then(u => usersReceived(listId, u));
    },
    [httpGetJson, usersReceived]
  );

  const findUsersInGroup = useCallback(
    (groupUuid: string) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/usersInGroup/${groupUuid}`;

      httpGetJson(url, {}, true).then((users: Array<User>) =>
        usersInGroupReceived(groupUuid, users)
      );
    },
    [httpGetJson, usersInGroupReceived]
  );

  const findGroupsForUser = useCallback(
    (userUuid: string) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/groupsForUser/${userUuid}`;

      httpGetJson(url, {}, true).then((users: Array<User>) =>
        groupsForUserReceived(userUuid, users)
      );
    },
    [httpGetJson, groupsForUserReceived]
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

      httpPostJsonResponse(url, { body }).then(userCreated);
    },
    [httpPostJsonResponse, userCreated]
  );

  const deleteUser = useCallback(
    (uuid: string) => {
      const state = store.getState();
      var url = `${state.config.values.stroomBaseServiceUrl}/users/v1/${uuid}`;

      httpDeleteEmptyResponse(url).then(() => userDeleted(uuid));
    },
    [httpDeleteEmptyResponse, userDeleted]
  );

  const addUserToGroup = useCallback(
    (userUuid: string, groupUuid: string) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/${userUuid}/${groupUuid}`;

      httpPutEmptyResponse(url).then(() =>
        userAddedToGroup(userUuid, groupUuid)
      );
    },
    [httpPutEmptyResponse, userAddedToGroup]
  );

  const removeUserFromGroup = useCallback(
    (userUuid: string, groupUuid: string) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/${userUuid}/${groupUuid}`;

      httpDeleteEmptyResponse(url).then(() =>
        userRemovedFromGroup(userUuid, groupUuid)
      );
    },
    [httpDeleteEmptyResponse, userRemovedFromGroup]
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
