import { useEffect, useState } from "react";

import useApi from "./useApi";

/**
 * Encapsulates the behaviour required to fetch the list of valid permissions.
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
