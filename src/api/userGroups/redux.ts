/*
 * Copyright 2018 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Action } from "redux";

import {
  prepareReducer,
  genUseActionCreators
} from "../../lib/redux-actions-ts";
import { User } from "../../types";
import { mapObject } from "../../lib/treeUtils";
import { onlyUnique } from "../../lib/reduxUtils";

const USERS_RECEIVED = "USERS_RECEIVED";
const USERS_IN_GROUP_RECEIVED = "USERS_IN_GROUP_RECEIVED";
const GROUPS_FOR_USER_RECEIEVED = "GROUPS_FOR_USER_RECEIEVED";
const USER_CREATED = "USER_CREATED";
const USER_DELETED = "USER_DELETED";
const USER_ADDED_TO_GROUP = "USER_ADDED_TO_GROUP";
const USER_REMOVED_FROM_GROUP = "USER_REMOVED_FROM_GROUP";

export interface UsersReceivedAction extends Action<"USERS_RECEIVED"> {
  listId: string;
  users: Array<User>;
}

export interface UsersInGroupReceivedAction
  extends Action<"USERS_IN_GROUP_RECEIVED"> {
  groupUuid: string;
  users: Array<User>;
}

export interface GroupsForUserReceivedAction
  extends Action<"GROUPS_FOR_USER_RECEIEVED"> {
  userUuid: string;
  groups: Array<User>;
}

export interface UserCreatedAction extends Action<"USER_CREATED"> {
  user: User;
}

export interface UserDeletedAction extends Action<"USER_DELETED"> {
  userUuid: string;
}

export interface UserAddedToGroupAction extends Action<"USER_ADDED_TO_GROUP"> {
  userUuid: string;
  groupUuid: string;
}

export interface UserRemovedFromGroupAction
  extends Action<"USER_REMOVED_FROM_GROUP"> {
  userUuid: string;
  groupUuid: string;
}

export const useActionCreators = genUseActionCreators({
  usersReceived: (listId: string, users: Array<User>): UsersReceivedAction => ({
    type: USERS_RECEIVED,
    listId,
    users
  }),
  usersInGroupReceived: (
    groupUuid: string,
    users: Array<User>
  ): UsersInGroupReceivedAction => ({
    type: USERS_IN_GROUP_RECEIVED,
    groupUuid,
    users
  }),
  groupsForUserReceived: (
    userUuid: string,
    groups: Array<User>
  ): GroupsForUserReceivedAction => ({
    type: GROUPS_FOR_USER_RECEIEVED,
    userUuid,
    groups
  }),
  userCreated: (user: User): UserCreatedAction => ({
    type: USER_CREATED,
    user
  }),
  userDeleted: (userUuid: string): UserDeletedAction => ({
    type: USER_DELETED,
    userUuid
  }),
  userAddedToGroup: (
    userUuid: string,
    groupUuid: string
  ): UserAddedToGroupAction => ({
    type: USER_ADDED_TO_GROUP,
    userUuid,
    groupUuid
  }),
  userRemovedFromGroup: (
    userUuid: string,
    groupUuid: string
  ): UserRemovedFromGroupAction => ({
    type: USER_REMOVED_FROM_GROUP,
    userUuid,
    groupUuid
  })
});

export interface StoreState {
  allUsers: Array<User>;
  users: {
    [listId: string]: Array<User>;
  };
  usersInGroup: {
    [s: string]: Array<User>;
  };
  groupsForUser: {
    [s: string]: Array<User>;
  };
}

export const defaultState: StoreState = {
  allUsers: [],
  users: {},
  usersInGroup: {},
  groupsForUser: {}
};

export const reducer = prepareReducer(defaultState)
  .handleAction<UsersReceivedAction>(
    USERS_RECEIVED,
    (state: StoreState, { listId, users }) => ({
      ...state,
      allUsers: state.allUsers.concat(users).filter(onlyUnique),
      users: {
        ...state.users,
        [listId]: users
      }
    })
  )
  .handleAction<UsersInGroupReceivedAction>(
    USERS_IN_GROUP_RECEIVED,
    (state: StoreState, { groupUuid, users }) => ({
      ...state,
      allUsers: state.allUsers.concat(users).filter(onlyUnique),
      usersInGroup: {
        ...state.usersInGroup,
        [groupUuid]: users
      }
    })
  )
  .handleAction<GroupsForUserReceivedAction>(
    GROUPS_FOR_USER_RECEIEVED,
    (state: StoreState, { userUuid, groups }) => ({
      ...state,
      allUsers: state.allUsers.concat(groups).filter(onlyUnique),
      groupsForUser: {
        ...state.groupsForUser,
        [userUuid]: groups
      }
    })
  )
  .handleAction<UserCreatedAction>(
    USER_CREATED,
    (state: StoreState, { user }) => ({
      ...state,
      allUsers: state.allUsers.concat([user]),
      users: mapObject(state.users, (_, u: Array<User>) => u.concat(user))
    })
  )
  .handleAction<UserDeletedAction>(
    USER_DELETED,
    (state: StoreState, { userUuid }) => ({
      ...state,
      allUsers: state.allUsers.filter(u => u.uuid !== userUuid),
      users: mapObject(state.users, (_, users: Array<User>) =>
        users.filter(u => u.uuid !== userUuid)
      ),
      usersInGroup: mapObject(state.usersInGroup, (_, users: Array<User>) =>
        users.filter(u => u.uuid !== userUuid)
      ),
      groupsForUser: {
        ...state.groupsForUser,
        [userUuid]: []
      }
    })
  )
  .handleAction<UserAddedToGroupAction>(
    USER_ADDED_TO_GROUP,
    (state: StoreState, { userUuid, groupUuid }) => ({
      ...state,
      usersInGroup: mapObject(
        state.usersInGroup,
        (gUuid, users: Array<User>) => {
          if (gUuid === groupUuid) {
            let newUser = state.allUsers.find(u => u.uuid === userUuid);
            if (!!newUser) {
              return users.concat([newUser]);
            }
          }
          return users;
        }
      ),
      groupsForUser: mapObject(
        state.groupsForUser,
        (uUuid, groups: Array<User>) => {
          if (uUuid === userUuid) {
            let newGroup = state.allUsers.find(g => g.uuid === groupUuid);
            if (!!newGroup) {
              return groups.concat([newGroup]);
            }
          }

          return groups;
        }
      )
    })
  )
  .handleAction<UserRemovedFromGroupAction>(
    USER_REMOVED_FROM_GROUP,
    (state: StoreState, { userUuid, groupUuid }) => ({
      ...state,
      usersInGroup: mapObject(
        state.usersInGroup,
        (gUuid: string, gUsers: Array<User>) => {
          if (gUuid === groupUuid) {
            return gUsers.filter(u => u.uuid !== userUuid);
          } else {
            return gUsers;
          }
        }
      ),
      groupsForUser: mapObject(
        state.groupsForUser,
        (uUuid: string, uGroups: Array<User>) => {
          if (uUuid === userUuid) {
            return uGroups.filter(g => g.uuid !== groupUuid);
          } else {
            return uGroups;
          }
        }
      )
    })
  )
  .getReducer();
