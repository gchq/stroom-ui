import { useMemo, useContext } from "react";

import AuthorisationContext from "./AuthorisationContext";

const useAuthorisationContext = (permissionNames: string[]) => {
  const { fetchAppPermission, appPermissions } = useContext(
    AuthorisationContext,
  );

  return useMemo(
    () =>
      permissionNames.reduce((acc, permissionName) => {
        if (!(permissionName in appPermissions)) {
          fetchAppPermission(permissionName);
        }

        return {
          [permissionName]: appPermissions[permissionName],
          ...acc,
        };
      }, {}),
    [permissionNames, appPermissions, fetchAppPermission],
  );
};

export default useAuthorisationContext;
