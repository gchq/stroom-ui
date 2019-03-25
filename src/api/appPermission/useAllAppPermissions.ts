import { useEffect, useState } from "react";

import useApi from "./useApi";

/**
 * Encapsulates the retrieval of all application permissions.
 * Just use this hook to receive all the known application permissions.
 * It will manage the link between the REST API and the Redux store.
 *
 * @param userUuid The UUID of the user or group
 */
const useAllAppPermissions = (): Array<string> => {
  const [allAppPermissions, setAllAppPermissions] = useState<Array<string>>([]);
  const { getAllPermissionNames } = useApi();

  useEffect(() => {
    getAllPermissionNames().then(setAllAppPermissions);
  }, [getAllPermissionNames, setAllAppPermissions]);

  return allAppPermissions;
};

export default useAllAppPermissions;
