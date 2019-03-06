import { useEffect } from "react";

import useApi from "./useApi";
import { useActionCreators } from "./redux";
import useReduxState from "../../lib/useReduxState";

/**
 * Encapsulates the retrieval of all application permissions.
 *
 * @param userUuid The UUID of the user or group
 */
export default (): Array<string> => {
  const { allAppPermissionsReceived } = useActionCreators();
  const { getAllPermissionNames } = useApi();

  useEffect(() => {
    getAllPermissionNames().then(allAppPermissionsReceived);
  }, [getAllPermissionNames, allAppPermissionsReceived]);

  const allAppPermissions = useReduxState(
    ({ appPermissions: { allAppPermissions } }) => allAppPermissions
  );
  return allAppPermissions;
};
