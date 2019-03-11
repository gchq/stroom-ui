import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import useHttpClient from "../useHttpClient";
import { User } from "../../types";
import { IsGroup } from "./types";

interface Api {
  fetchUser: (uuid: string) => Promise<User>;
  findUsers: (
    name?: string,
    isGroup?: IsGroup,
    uuid?: string
  ) => Promise<Array<User>>;
  findUsersInGroup: (groupUuid: string) => Promise<Array<User>>;
  findGroupsForUser: (userUuid: string) => Promise<Array<User>>;
  createUser: (name: string, isGroup: boolean) => Promise<User>;
  deleteUser: (uuid: string) => Promise<void>;
  addUserToGroup: (userUuid: string, groupUuid: string) => Promise<void>;
  removeUserFromGroup: (userUuid: string, groupUuid: string) => Promise<void>;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const {
    httpGetJson,
    httpPostJsonResponse,
    httpDeleteEmptyResponse,
    httpPutEmptyResponse
  } = useHttpClient();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const fetchUser = useCallback(
    (userUuid: string): Promise<User> => {
      const state = store.getState();
      var url = new URL(
        `${state.config.values.stroomBaseServiceUrl}/users/v1/${userUuid}`
      );

      return httpGetJson(url.href, {}, false);
    },
    [httpGetJson]
  );

  const findUsers = useCallback(
    (name?: string, isGroup?: "Group" | "User", uuid?: string) => {
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

      return httpGetJson(url.href);
    },
    [httpGetJson]
  );

  const findUsersInGroup = useCallback(
    (groupUuid: string) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/usersInGroup/${groupUuid}`;

      return httpGetJson(url, {}, false);
    },
    [httpGetJson]
  );

  const findGroupsForUser = useCallback(
    (userUuid: string) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/groupsForUser/${userUuid}`;

      return httpGetJson(url, {}, false);
    },
    [httpGetJson]
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

      return httpPostJsonResponse(url, { body });
    },
    [httpPostJsonResponse]
  );

  const deleteUser = useCallback(
    (uuid: string) => {
      const state = store.getState();
      var url = `${state.config.values.stroomBaseServiceUrl}/users/v1/${uuid}`;

      return httpDeleteEmptyResponse(url);
    },
    [httpDeleteEmptyResponse]
  );

  const addUserToGroup = useCallback(
    (userUuid: string, groupUuid: string) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/${userUuid}/${groupUuid}`;

      return httpPutEmptyResponse(url);
    },
    [httpPutEmptyResponse]
  );

  const removeUserFromGroup = useCallback(
    (userUuid: string, groupUuid: string) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/${userUuid}/${groupUuid}`;

      return httpDeleteEmptyResponse(url);
    },
    [httpDeleteEmptyResponse]
  );

  return {
    fetchUser,
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
