import { useEffect, useCallback, useMemo } from "react";

import useApi from "./useApi";
import { useActionCreators } from "./redux";
import useReduxState from "../../lib/useReduxState";

/**
 * Encapsulates the management of permissions for a given document, for all users with an interest in that document.
 */
interface UseDocumentPermissions {
  permissionsByUser: {
    [userUuid: string]: Array<string>;
  };
  clearPermissions: () => void;
}

export default (docRefUuid: string | undefined): UseDocumentPermissions => {
  const { getPermissionForDoc, clearDocPermissions } = useApi();
  const {
    permissionsForDocumentReceived,
    documentPermissionsCleared
  } = useActionCreators();

  useEffect(() => {
    if (!!docRefUuid) {
      getPermissionForDoc(docRefUuid).then(d =>
        permissionsForDocumentReceived(docRefUuid, d)
      );
    }
  }, [docRefUuid, getPermissionForDoc, permissionsForDocumentReceived]);

  const clearPermissions = useCallback(() => {
    if (!!docRefUuid) {
      clearDocPermissions(docRefUuid).then(() =>
        documentPermissionsCleared(docRefUuid)
      );
    }
  }, [docRefUuid, clearDocPermissions, documentPermissionsCleared]);

  const permissions = useReduxState(
    ({ docPermissions: { permissions } }) => permissions
  );

  const permissionsByUser = useMemo(() => {
    return permissions
      .filter(d => d.docRefUuid === docRefUuid)
      .reduce((acc, curr) => {
        return {
          ...acc,
          [curr.userUuid]: [curr.permissionNames]
        };
      }, {});
  }, [permissions]);

  return {
    permissionsByUser,
    clearPermissions
  };
};
