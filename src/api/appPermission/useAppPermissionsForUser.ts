import { useEffect, useCallback, useReducer } from "react";

import useApi from "./useApi";

/**
 * An API for managing the application permissions for a single user.
 */
interface UserAppPermissionApi {
  userAppPermissions: Array<string>;
  addPermission: (permissionName: string) => void;
  removePermission: (permissionName: string) => void;
}

type Received = {
  type: "received";
  permissions: Array<string>;
};
type Added = {
  type: "added";
  permissionName: string;
};
type Removed = {
  type: "removed";
  permissionName: string;
};

const reducer = (
  state: Array<string>,
  action: Received | Added | Removed
): Array<string> => {
  switch (action.type) {
    case "received":
      return action.permissions;
    case "added":
      return state.concat([action.permissionName]);
    case "removed":
      return state.filter(p => p !== action.permissionName);
  }

  return state;
};

/**
 * Encapsulates the management of application permissions for a single user.
 * Presenting a simpler API that is hooked into the REST API and Redux.
 *
 * @param userUuid The UUID of the user or group
 */
const useAppPermissionsForUser = (userUuid: string): UserAppPermissionApi => {
  const [userAppPermissions, dispatch] = useReducer(reducer, []);

  const {
    getPermissionsForUser,
    addAppPermission,
    removeAppPermission
  } = useApi();

  useEffect(() => {
    getPermissionsForUser(userUuid).then(permissions =>
      dispatch({ type: "received", permissions })
    );
  }, [userUuid, getPermissionsForUser]);

  const addPermission = useCallback(
    (permissionName: string) =>
      addAppPermission(userUuid, permissionName).then(() =>
        dispatch({
          type: "added",
          permissionName
        })
      ),
    [userUuid, addAppPermission]
  );

  const removePermission = useCallback(
    (permissionName: string) =>
      removeAppPermission(userUuid, permissionName).then(() =>
        dispatch({
          type: "removed",
          permissionName
        })
      ),
    [userUuid, removeAppPermission]
  );

  return {
    userAppPermissions,
    addPermission,
    removePermission
  };
};

export default useAppPermissionsForUser;
