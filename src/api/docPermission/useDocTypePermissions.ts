import { useEffect } from "react";

import useApi from "./useApi";
import { useActionCreators } from "./redux";
import useReduxState from "../../lib/useReduxState";

/**
 * Encapsulates the behaviour required to fetch the list of valid permissions
 * for a single Doc Type and retrieve the value from the redux store.
 */

export default (docType: string): Array<string> => {
  const { getPermissionForDocType } = useApi();
  const { permissionsForDocTypeReceived } = useActionCreators();

  const permissions = useReduxState(
    ({ docPermissions: { permissionsByDocType } }) =>
      permissionsByDocType[docType] || []
  );

  useEffect(() => {
    getPermissionForDocType(docType).then(permissions =>
      permissionsForDocTypeReceived(docType, permissions)
    );
  }, [getPermissionForDocType, permissionsForDocTypeReceived]);

  return permissions;
};
