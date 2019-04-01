import { useCallback } from "react";

import useHttpClient from "src/lib/useHttpClient";
import { useConfig } from "src/startup/config";

interface Api {
  getPermissionsForUser: (userUuid: string) => Promise<Array<string>>;
  getAllPermissionNames: () => Promise<Array<string>>;
  addAppPermission: (userUuid: string, permissionName: string) => Promise<void>;
  removeAppPermission: (
    userUuid: string,
    permissionName: string
  ) => Promise<void>;
}

export const useApi = (): Api => {
  const { stroomBaseServiceUrl } = useConfig();
  const {
    httpGetJson,
    httpPostEmptyResponse,
    httpDeleteEmptyResponse
  } = useHttpClient();

  return {
    getPermissionsForUser: useCallback(
      (userUuid: string): Promise<Array<string>> =>
        httpGetJson(`${stroomBaseServiceUrl}/appPermissions/v1/${userUuid}`),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    getAllPermissionNames: useCallback(
      (): Promise<Array<string>> =>
        httpGetJson(`${stroomBaseServiceUrl}/appPermissions/v1`),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    addAppPermission: useCallback(
      (userUuid: string, permissionName: string): Promise<void> =>
        httpPostEmptyResponse(
          `${stroomBaseServiceUrl}/appPermissions/v1/${userUuid}/${permissionName}`
        ),
      [httpPostEmptyResponse]
    ),
    removeAppPermission: useCallback(
      (userUuid: string, permissionName: string): Promise<void> =>
        httpDeleteEmptyResponse(
          `${stroomBaseServiceUrl}/appPermissions/v1/${userUuid}/${permissionName}`
        ),
      [httpDeleteEmptyResponse]
    )
  };
};

export default useApi;
