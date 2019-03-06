import { useEffect, useCallback } from "react";

import useApi from "./useApi";
import { useActionCreators } from "./redux";
import useReduxState from "../../lib/useReduxState";
import { DocRefType, User } from "../../types";

/**
 * Encapsulates the management of permissions for a given document, for all users with an interest in that document.
 */
interface UseDocumentPermissions {
  permissionsByUser: {
    [userUuid: string]: Array<string>;
  };
  userIsGroup: {
    [userUuid: string]: boolean;
  };
  addPermission: (user: User, permissionName: string) => void;
  removePermission: (user: User, permissionName: string) => void;
  clearPermissions: () => void;
}

export default (docRef: DocRefType): UseDocumentPermissions => {
  const {
    getPermissionForDoc,
    addDocPermission,
    removeDocPermission,
    clearDocPermissions
  } = useApi();
  const {
    permissionsForDocumentReceived,
    documentPermissionAdded,
    documentPermissionRemoved,
    documentPermissionsCleared
  } = useActionCreators();

  useEffect(() => {
    getPermissionForDoc(docRef).then(d =>
      permissionsForDocumentReceived(docRef, d)
    );
  }, [docRef, getPermissionForDoc, permissionsForDocumentReceived]);

  const addPermission = useCallback(
    (user: User, permissionName: string) => {
      addDocPermission(docRef, user.uuid, permissionName).then(() =>
        documentPermissionAdded(docRef, user, permissionName)
      );
    },
    [docRef, addDocPermission, documentPermissionAdded]
  );
  const removePermission = useCallback(
    (user: User, permissionName: string) => {
      removeDocPermission(docRef, user.uuid, permissionName).then(() =>
        documentPermissionRemoved(docRef, user, permissionName)
      );
    },
    [docRef, removeDocPermission, documentPermissionRemoved]
  );

  const clearPermissions = useCallback(() => {
    clearDocPermissions(docRef).then(() => documentPermissionsCleared(docRef));
  }, [docRef, clearDocPermissions, documentPermissionsCleared]);

  const { userIsGroup, permissionsByUser } = useReduxState(
    ({
      docPermissions: { permissionsByDocUuidThenUserUuid, userIsGroup }
    }) => ({
      permissionsByUser: permissionsByDocUuidThenUserUuid[docRef.uuid] || {},
      userIsGroup
    })
  );

  return {
    permissionsByUser,
    userIsGroup,
    addPermission,
    removePermission,
    clearPermissions
  };
};
