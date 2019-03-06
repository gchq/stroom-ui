import { useEffect } from "react";

import useApi from "./useApi";
import { useActionCreators } from "./redux";
import useReduxState from "../../lib/useReduxState";

/**
 * Encapsulates the retrieval of all application permissions.
 * Just use this hook to receive all the known application permissions.
 * It will manage the link between the REST API and the Redux store.
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
