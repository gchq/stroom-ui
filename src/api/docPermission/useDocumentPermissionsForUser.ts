import { useEffect, useCallback, useReducer } from "react";

import useApi from "./useApi";

interface UseDocumentPermissions {
  permissionNames: Array<string>;
  addPermission: (permissionName: string) => void;
  removePermission: (permissionName: string) => void;
}

type Received = {
  type: "received";
  permissionNames: Array<string>;
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
      return action.permissionNames;
    case "added":
      return state.concat([action.permissionName]);
    case "removed":
      return state.filter(p => p !== action.permissionName);
  }

  return state;
};

const useDocumentPermissionsForUser = (
  docRefUuid: string,
  userUuid: string
): UseDocumentPermissions => {
  const [permissionNames, dispatch] = useReducer(reducer, []);

  const {
    getPermissionsForDocumentForUser,
    addDocPermission,
    removeDocPermission
  } = useApi();

  useEffect(() => {
    getPermissionsForDocumentForUser(docRefUuid, userUuid).then(
      permissionNames =>
        dispatch({
          type: "received",
          permissionNames
        })
    );
  }, [docRefUuid, userUuid, getPermissionsForDocumentForUser]);

  const addPermission = useCallback(
    (permissionName: string) => {
      addDocPermission(docRefUuid, userUuid, permissionName).then(() =>
        dispatch({
          type: "added",
          permissionName
        })
      );
    },
    [docRefUuid, userUuid, addDocPermission]
  );
  const removePermission = useCallback(
    (permissionName: string) => {
      removeDocPermission(docRefUuid, userUuid, permissionName).then(() =>
        dispatch({
          type: "removed",
          permissionName
        })
      );
    },
    [docRefUuid, userUuid, removeDocPermission]
  );

  return {
    permissionNames,
    addPermission,
    removePermission
  };
};

export default useDocumentPermissionsForUser;
