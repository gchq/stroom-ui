import { useContext } from "react";
import { StoreContext } from "redux-react-hook";

import { actionCreators } from "./redux";
import {
  wrappedGet,
  wrappedPost,
  wrappedPut,
  wrappedDelete
} from "../../lib/fetchTracker.redux";
import { User } from "../../types";

const {
  usersReceived,
  usersInGroupReceived,
  groupsForUserReceived,
  userCreated,
  userDeleted,
  userAddedToGroup,
  userRemovedFromGroup
} = actionCreators;

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

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  return {
    findUsers: (
      listId: string,
      name?: string,
      isGroup?: Boolean,
      uuid?: string
    ) => {
      const state = store.getState();

      var url = new URL(`${state.config.values.stroomBaseServiceUrl}/users/v1`);
      if (name !== undefined && name.length > 0)
        url.searchParams.append("name", name);
      if (isGroup !== undefined)
        url.searchParams.append("isGroup", isGroup.toString());
      if (uuid !== undefined && uuid.length > 0)
        url.searchParams.append("uuid", uuid);

      wrappedGet(
        store.dispatch,
        state,
        url.href,
        r =>
          r
            .json()
            .then((users: Array<User>) =>
              store.dispatch(usersReceived(listId, users))
            ),
        {},
        true
      );
    },

    findUsersInGroup: (groupUuid: string) => {
      const state = store.getState();

      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/usersInGroup/${groupUuid}`;

      wrappedGet(
        store.dispatch,
        state,
        url,
        r =>
          r
            .json()
            .then((users: Array<User>) =>
              store.dispatch(usersInGroupReceived(groupUuid, users))
            ),
        {},
        true
      );
    },

    findGroupsForUser: (userUuid: string) => {
      const state = store.getState();

      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/groupsForUser/${userUuid}`;

      wrappedGet(
        store.dispatch,
        state,
        url,
        r =>
          r
            .json()
            .then((users: Array<User>) =>
              store.dispatch(groupsForUserReceived(userUuid, users))
            ),
        {},
        true
      );
    },

    createUser: (name: string, isGroup: boolean) => {
      const state = store.getState();

      var url = `${state.config.values.stroomBaseServiceUrl}/users/v1`;

      // Create DTO
      const body = JSON.stringify({
        name,
        isGroup
      });

      wrappedPost(
        store.dispatch,
        state,
        url,
        response =>
          response
            .json()
            .then((user: User) => store.dispatch(userCreated(user))),
        {
          body
        }
      );
    },

    deleteUser: (uuid: string) => {
      const state = store.getState();

      var url = `${state.config.values.stroomBaseServiceUrl}/users/v1/${uuid}`;

      wrappedDelete(store.dispatch, state, url, response =>
        response.text().then(() => store.dispatch(userDeleted(uuid)))
      );
    },

    addUserToGroup: (userUuid: string, groupUuid: string) => {
      const state = store.getState();

      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/${userUuid}/${groupUuid}`;

      wrappedPut(store.dispatch, state, url, response =>
        response
          .text()
          .then(() => store.dispatch(userAddedToGroup(userUuid, groupUuid)))
      );
    },

    removeUserFromGroup: (userUuid: string, groupUuid: string) => {
      const state = store.getState();

      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/users/v1/${userUuid}/${groupUuid}`;

      wrappedDelete(store.dispatch, state, url, response =>
        response
          .text()
          .then(() => store.dispatch(userRemovedFromGroup(userUuid, groupUuid)))
      );
    }
  };
};

export default useApi;
