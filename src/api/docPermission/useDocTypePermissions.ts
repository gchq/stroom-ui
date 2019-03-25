import { useEffect, useState } from "react";

import useApi from "./useApi";

/**
 * Encapsulates the behaviour required to fetch the list of valid permissions
 * for a single Doc Type and retrieve the value from the redux store.
 */

const useDocTypePermissions = (docType: string): Array<string> => {
  const { getPermissionForDocType } = useApi();
  const [permissionNames, setPermissionNames] = useState<Array<string>>([]);

  useEffect(() => {
    getPermissionForDocType(docType).then(setPermissionNames);
  }, [docType, getPermissionForDocType]);

  return permissionNames;
};

export default useDocTypePermissions;
