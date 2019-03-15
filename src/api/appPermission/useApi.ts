import { useCallback } from "react";

import useHttpClient from "../useHttpClient";
import useGetStroomBaseServiceUrl from "../useGetStroomBaseServiceUrl";

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
  const getStroomBaseServiceUrl = useGetStroomBaseServiceUrl();
  const {
    httpGetJson,
    httpPostEmptyResponse,
    httpDeleteEmptyResponse
  } = useHttpClient();

  return {
    getPermissionsForUser: useCallback(
      (userUuid: string): Promise<Array<string>> =>
        httpGetJson(
          `${getStroomBaseServiceUrl()}/appPermissions/v1/${userUuid}`
        ),
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    getAllPermissionNames: useCallback(
      (): Promise<Array<string>> =>
        httpGetJson(`${getStroomBaseServiceUrl()}/appPermissions/v1`),
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    addAppPermission: useCallback(
      (userUuid: string, permissionName: string): Promise<void> =>
        httpPostEmptyResponse(
          `${getStroomBaseServiceUrl()}/appPermissions/v1/${userUuid}/${permissionName}`
        ),
      [httpPostEmptyResponse]
    ),
    removeAppPermission: useCallback(
      (userUuid: string, permissionName: string): Promise<void> =>
        httpDeleteEmptyResponse(
          `${getStroomBaseServiceUrl()}/appPermissions/v1/${userUuid}/${permissionName}`
        ),
      [httpDeleteEmptyResponse]
    )
  };
};

export default useApi;
