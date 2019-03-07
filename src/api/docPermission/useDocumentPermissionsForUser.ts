import { useEffect, useCallback } from "react";

import useApi from "./useApi";
import { useActionCreators } from "./redux";
import useReduxState from "../../lib/useReduxState";

interface UseDocumentPermissions {
  permissions: Array<string>;
  addPermission: (permissionName: string) => void;
  removePermission: (permissionName: string) => void;
}

export default (
  docRefUuid: string,
  userUuid: string
): UseDocumentPermissions => {
  const {
    getPermissionsForDocumentForUser,
    addDocPermission,
    removeDocPermission
  } = useApi();
  const {
    permissionsForDocumentForUserReceived,
    documentPermissionAdded,
    documentPermissionRemoved
  } = useActionCreators();

  useEffect(() => {
    getPermissionsForDocumentForUser(docRefUuid, userUuid).then(d =>
      permissionsForDocumentForUserReceived(docRefUuid, userUuid, d)
    );
  }, [
    docRefUuid,
    userUuid,
    getPermissionsForDocumentForUser,
    permissionsForDocumentForUserReceived
  ]);

  const addPermission = useCallback(
    (permissionName: string) => {
      addDocPermission(docRefUuid, userUuid, permissionName).then(() =>
        documentPermissionAdded(docRefUuid, userUuid, permissionName)
      );
    },
    [docRefUuid, userUuid, addDocPermission, documentPermissionAdded]
  );
  const removePermission = useCallback(
    (permissionName: string) => {
      removeDocPermission(docRefUuid, userUuid, permissionName).then(() =>
        documentPermissionRemoved(docRefUuid, userUuid, permissionName)
      );
    },
    [docRefUuid, userUuid, removeDocPermission, documentPermissionRemoved]
  );

  const permissions = useReduxState(
    ({ docPermissions: { permissionsByDocUuidThenUserUuid } }) =>
      !!permissionsByDocUuidThenUserUuid[docRefUuid]
        ? permissionsByDocUuidThenUserUuid[docRefUuid][userUuid]
        : []
  );

  return {
    permissions,
    addPermission,
    removePermission
  };
};
