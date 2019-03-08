import { Action } from "redux";
import {
  genUseActionCreators,
  prepareReducer
} from "../../lib/redux-actions-ts";
import {StoreState}from'./types';

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
  permissionName: string;
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
    permissionName: string
  ): UserAppPermissionAddedAction => ({
    type: USER_APP_PERMISSIONS_ADDED,
    userUuid,
    permissionName
  }),
  userAppPermissionRemoved: (
    userUuid: string,
    permissionName: string
  ): UserAppPermissionRemovedAction => ({
    type: USER_APP_PERMISSIONS_REMOVED,
    userUuid,
    permissionName
  })
});



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
    (state = defaultState, { userUuid, permissionName }) => ({
      ...state,
      userAppPermissions: {
        ...state.userAppPermissions,
        [userUuid]: [
          ...(state.userAppPermissions[userUuid] || []),
          permissionName
        ]
      }
    })
  )
  .handleAction<UserAppPermissionRemovedAction>(
    USER_APP_PERMISSIONS_REMOVED,
    (state = defaultState, { userUuid, permissionName }) => ({
      ...state,
      userAppPermissions: {
        ...state.userAppPermissions,
        [userUuid]: state.userAppPermissions[userUuid].filter(
          p => p !== permissionName
        )
      }
    })
  )
  .getReducer();
