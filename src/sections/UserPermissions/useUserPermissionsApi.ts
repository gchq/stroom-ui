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
  const httpClient = useHttpClient();
  const actionCreators = useActionCreators();

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

      httpClient.httpGet(
        url.href,
        r =>
          r
            .json()
            .then((users: Array<User>) =>
              actionCreators.usersReceived(listId, users)
            ),
        {},
        true
      );
    },
    []
  );

  const findUsersInGroup = useCallback((groupUuid: string) => {
    const state = store.getState();
    var url = `${
      state.config.values.stroomBaseServiceUrl
    }/users/v1/usersInGroup/${groupUuid}`;

    httpClient.httpGet(
      url,
      r =>
        r
          .json()
          .then((users: Array<User>) =>
            actionCreators.usersInGroupReceived(groupUuid, users)
          ),
      {},
      true
    );
  }, []);

  const findGroupsForUser = useCallback((userUuid: string) => {
    const state = store.getState();
    var url = `${
      state.config.values.stroomBaseServiceUrl
    }/users/v1/groupsForUser/${userUuid}`;

    httpClient.httpGet(
      url,
      r =>
        r
          .json()
          .then((users: Array<User>) =>
            actionCreators.groupsForUserReceived(userUuid, users)
          ),
      {},
      true
    );
  }, []);

  const createUser = useCallback((name: string, isGroup: boolean) => {
    const state = store.getState();
    var url = `${state.config.values.stroomBaseServiceUrl}/users/v1`;

    // Create DTO
    const body = JSON.stringify({
      name,
      isGroup
    });

    httpClient.httpPost(
      url,
      response =>
        response.json().then((user: User) => actionCreators.userCreated(user)),
      {
        body
      }
    );
  }, []);

  const deleteUser = useCallback((uuid: string) => {
    const state = store.getState();
    var url = `${state.config.values.stroomBaseServiceUrl}/users/v1/${uuid}`;

    httpClient.httpDelete(url, response =>
      response.text().then(() => actionCreators.userDeleted(uuid))
    );
  }, []);

  const addUserToGroup = useCallback((userUuid: string, groupUuid: string) => {
    const state = store.getState();
    var url = `${
      state.config.values.stroomBaseServiceUrl
    }/users/v1/${userUuid}/${groupUuid}`;

    httpClient.httpPut(url, response =>
      response
        .text()
        .then(() => actionCreators.userAddedToGroup(userUuid, groupUuid))
    );
  }, []);

  const removeUserFromGroup = useCallback(
    (userUuid: string, groupUuid: string) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/${userUuid}/${groupUuid}`;

      httpClient.httpDelete(url, response =>
        response
          .text()
          .then(() => actionCreators.userRemovedFromGroup(userUuid, groupUuid))
      );
    },
    []
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
