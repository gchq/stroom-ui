import { useEffect, useCallback } from "react";

import useApi from "./useApi";
import { useActionCreators } from "./redux";
import useReduxState from "../../lib/useReduxState";
import { DocRefType, User } from "../../types";

interface UseDocumentPermissions {
  permissions: Array<string>;
  addPermission: (permissionName: string) => void;
  removePermission: (permissionName: string) => void;
}

export default (docRef: DocRefType, user: User): UseDocumentPermissions => {
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
    getPermissionsForDocumentForUser(docRef, user.uuid).then(d =>
      permissionsForDocumentForUserReceived(docRef, user, d)
    );
  }, [
    docRef,
    user,
    getPermissionsForDocumentForUser,
    permissionsForDocumentForUserReceived
  ]);

  const addPermission = useCallback(
    (permissionName: string) => {
      addDocPermission(docRef, user.uuid, permissionName).then(() =>
        documentPermissionAdded(docRef, user, permissionName)
      );
    },
    [docRef, user, addDocPermission, documentPermissionAdded]
  );
  const removePermission = useCallback(
    (permissionName: string) => {
      removeDocPermission(docRef, user.uuid, permissionName).then(() =>
        documentPermissionRemoved(docRef, user, permissionName)
      );
    },
    [docRef, user, removeDocPermission, documentPermissionRemoved]
  );

  const permissions = useReduxState(
    ({ docPermissions: { permissionsByDocUuidThenUserUuid } }) =>
      !!permissionsByDocUuidThenUserUuid[docRef.uuid]
        ? permissionsByDocUuidThenUserUuid[docRef.uuid][user.uuid]
        : []
  );

  return {
    permissions,
    addPermission,
    removePermission
  };
};
