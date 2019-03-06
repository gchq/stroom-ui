import { useEffect, useCallback } from "react";

import useApi from "./useApi";
import { useActionCreators } from "./redux";
import useReduxState from "../../lib/useReduxState";

/**
 * An API for managing the application permissions for a single user.
 */
interface UserAppPermissionApi {
  userAppPermissions: Array<string>;
  addPermission: (permissionName: string) => void;
  removePermission: (permissionName: string) => void;
}

/**
 * Encapsulates the management of application permissions for a single user.
 * Presenting a simpler API that is hooked into everything.
 *
 * @param userUuid The UUID of the user or group
 */
export default (userUuid: string): UserAppPermissionApi => {
  const {
    userAppPermissionsReceived,
    userAppPermissionAdded,
    userAppPermissionRemoved
  } = useActionCreators();
  const {
    getPermissionsForUser,
    addAppPermission,
    removeAppPermission
  } = useApi();

  useEffect(() => {
    getPermissionsForUser(userUuid).then(p =>
      userAppPermissionsReceived(userUuid, p)
    );
  }, [userUuid, getPermissionsForUser, userAppPermissionsReceived]);

  const userAppPermissions = useReduxState(
    ({ appPermissions: { userAppPermissions } }) =>
      userAppPermissions[userUuid] || []
  );

  const addPermission = useCallback(
    (permissionName: string) => {
      addAppPermission(userUuid, permissionName).then(() =>
        userAppPermissionAdded(userUuid, permissionName)
      );
    },
    [userUuid, userAppPermissionAdded, addAppPermission]
  );

  const removePermission = useCallback(
    (permissionName: string) => {
      removeAppPermission(userUuid, permissionName).then(() =>
        userAppPermissionRemoved(userUuid, permissionName)
      );
    },
    [userUuid, userAppPermissionRemoved, removeAppPermission]
  );

  return {
    userAppPermissions,
    addPermission,
    removePermission
  };
};
