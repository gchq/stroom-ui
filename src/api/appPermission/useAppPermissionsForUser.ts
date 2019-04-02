import * as React from "react";

import useApi from "./useApi";
import useListReducer from "src/lib/useListReducer/useListReducer";

/**
 * An API for managing the application permissions for a single user.
 */
interface UserAppPermissionApi {
  userAppPermissions: string[];
  addPermission: (permissionName: string) => void;
  removePermission: (permissionName: string) => void;
}

/**
 * Encapsulates the management of application permissions for a single user.
 * Presenting a simpler API that is hooked into the REST API and Redux.
 *
 * @param userUuid The UUID of the user or group
 */
const useAppPermissionsForUser = (userUuid: string): UserAppPermissionApi => {
  const {
    items: userAppPermissions,
    itemsReceived,
    itemAdded,
    itemRemoved,
  } = useListReducer<string>(g => g);

  const {
    getPermissionsForUser,
    addAppPermission,
    removeAppPermission,
  } = useApi();

  React.useEffect(() => {
    getPermissionsForUser(userUuid).then(itemsReceived);
  }, [userUuid, getPermissionsForUser]);

  const addPermission = React.useCallback(
    (permissionName: string) =>
      addAppPermission(userUuid, permissionName).then(() =>
        itemAdded(permissionName),
      ),
    [userUuid, addAppPermission],
  );

  const removePermission = React.useCallback(
    (permissionName: string) =>
      removeAppPermission(userUuid, permissionName).then(() =>
        itemRemoved(permissionName),
      ),
    [userUuid, removeAppPermission],
  );

  return {
    userAppPermissions,
    addPermission,
    removePermission,
  };
};

export default useAppPermissionsForUser;
