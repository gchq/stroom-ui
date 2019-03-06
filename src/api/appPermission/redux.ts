import { Action } from "redux";
import {
  genUseActionCreators,
  prepareReducer
} from "../../lib/redux-actions-ts";

const ALL_APP_PERMISSIONS_RECEIVED = "ALL_APP_PERMISSIONS_RECEIVED";
const USER_APP_PERMISSIONS_RECEIVED = "USER_APP_PERMISSIONS_RECEIVED";
const USER_APP_PERMISSIONS_ADDED = "USER_APP_PERMISSIONS_ADDED";
const USER_APP_PERMISSIONS_REMOVED = "USER_APP_PERMISSIONS_REMOVED";

interface AllAppPermissionsReceivedAction
  extends Action<"ALL_APP_PERMISSIONS_RECEIVED"> {
  allAppPermissions: Array<string>;
}

interface UserAppPermissionReceivedAction
  extends Action<"USER_APP_PERMISSIONS_RECEIVED"> {
  userUuid: string;
  appPermissions: Array<string>;
}

interface UserAppPermissionAction {
  userUuid: string;
  permission: string;
}

interface UserAppPermissionAddedAction
  extends Action<"USER_APP_PERMISSIONS_ADDED">,
    UserAppPermissionAction {}
interface UserAppPermissionRemovedAction
  extends Action<"USER_APP_PERMISSIONS_REMOVED">,
    UserAppPermissionAction {}

export const useActionCreators = genUseActionCreators({
  allAppPermissionsReceived: (
    allAppPermissions: Array<string>
  ): AllAppPermissionsReceivedAction => ({
    type: ALL_APP_PERMISSIONS_RECEIVED,
    allAppPermissions
  }),
  userAppPermissionsReceived: (
    userUuid: string,
    appPermissions: Array<string>
  ): UserAppPermissionReceivedAction => ({
    type: USER_APP_PERMISSIONS_RECEIVED,
    userUuid,
    appPermissions
  }),
  userAppPermissionAdded: (
    userUuid: string,
    permission: string
  ): UserAppPermissionAddedAction => ({
    type: USER_APP_PERMISSIONS_ADDED,
    userUuid,
    permission
  }),
  userAppPermissionRemoved: (
    userUuid: string,
    permission: string
  ): UserAppPermissionRemovedAction => ({
    type: USER_APP_PERMISSIONS_REMOVED,
    userUuid,
    permission
  })
});

export interface StoreState {
  allAppPermissions: Array<string>;
  userAppPermissions: {
    [userUuid: string]: Array<string>;
  };
}

const defaultState: StoreState = {
  allAppPermissions: [],
  userAppPermissions: {}
};

export const reducer = prepareReducer(defaultState)
  .handleAction<AllAppPermissionsReceivedAction>(
    ALL_APP_PERMISSIONS_RECEIVED,
    (state = defaultState, { allAppPermissions }) => ({
      ...state,
      allAppPermissions
    })
  )
  .handleAction<UserAppPermissionReceivedAction>(
    USER_APP_PERMISSIONS_RECEIVED,
    (state = defaultState, { userUuid, appPermissions }) => ({
      ...state,
      userAppPermissions: {
        ...state.userAppPermissions,
        [userUuid]: appPermissions
      }
    })
  )
  .handleAction<UserAppPermissionAddedAction>(
    USER_APP_PERMISSIONS_ADDED,
    (state = defaultState, { userUuid, permission }) => ({
      ...state,
      userAppPermissions: {
        ...state.userAppPermissions,
        [userUuid]: [...(state.userAppPermissions[userUuid] || []), permission]
      }
    })
  )
  .handleAction<UserAppPermissionRemovedAction>(
    USER_APP_PERMISSIONS_REMOVED,
    (state = defaultState, { userUuid, permission }) => ({
      ...state,
      userAppPermissions: {
        ...state.userAppPermissions,
        [userUuid]: state.userAppPermissions[userUuid].filter(
          p => p !== permission
        )
      }
    })
  )
  .getReducer();
