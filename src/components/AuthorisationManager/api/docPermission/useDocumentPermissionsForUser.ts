import * as React from "react";

import useApi from "./useApi";
import useListReducer from "lib/useListReducer/useListReducer";

interface UseDocumentPermissions {
  permissionNames: string[];
  addPermission: (permissionName: string) => void;
  removePermission: (permissionName: string) => void;
}

const useDocumentPermissionsForUser = (
  docRefUuid: string,
  userUuid: string,
): UseDocumentPermissions => {
  const {
    items: permissionNames,
    itemAdded,
    itemRemoved,
    itemsReceived,
  } = useListReducer<string>(g => g);

  const {
    getPermissionsForDocumentForUser,
    addDocPermission,
    removeDocPermission,
  } = useApi();

  React.useEffect(() => {
    getPermissionsForDocumentForUser(docRefUuid, userUuid).then(itemsReceived);
  }, [docRefUuid, userUuid, getPermissionsForDocumentForUser]);

  const addPermission = React.useCallback(
    (permissionName: string) => {
      addDocPermission(docRefUuid, userUuid, permissionName).then(() =>
        itemAdded(permissionName),
      );
    },
    [docRefUuid, userUuid, addDocPermission],
  );
  const removePermission = React.useCallback(
    (permissionName: string) => {
      removeDocPermission(docRefUuid, userUuid, permissionName).then(() =>
        itemRemoved(permissionName),
      );
    },
    [docRefUuid, userUuid, removeDocPermission],
  );

  return {
    permissionNames,
    addPermission,
    removePermission,
  };
};

export default useDocumentPermissionsForUser;
