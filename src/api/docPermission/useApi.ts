import { useCallback } from "react";

import useHttpClient from "../useHttpClient";
import { DocumentPermissions } from "src/types";
import useGetStroomBaseServiceUrl from "../useGetStroomBaseServiceUrl";

interface Api {
  // Server Side Constant
  getPermissionForDocType: (docRefType: string) => Promise<Array<string>>;

  // By Doc and User
  getPermissionsForDocumentForUser: (
    docRefUuid: string,
    userUuid: string
  ) => Promise<Array<string>>;
  addDocPermission: (
    docRefUuid: string,
    userUuid: string,
    permissionName: string
  ) => Promise<void>;
  removeDocPermission: (
    docRefUuid: string,
    userUuid: string,
    permissionName: string
  ) => Promise<void>;

  // By Doc
  getPermissionForDoc: (docRefUuid: string) => Promise<DocumentPermissions>;
  clearDocPermissionsForUser: (
    docRefUuid: string,
    userUuid: string
  ) => Promise<void>;
  clearDocPermissions: (docRefUuid: string) => Promise<void>;
}

export const useApi = (): Api => {
  const getStroomBaseServiceUrl = useGetStroomBaseServiceUrl();

  const {
    httpGetJson,
    httpPostEmptyResponse,
    httpDeleteEmptyResponse
  } = useHttpClient();

  return {
    getPermissionForDocType: useCallback(
      (docRefType: string): Promise<Array<string>> =>
        httpGetJson(
          `${getStroomBaseServiceUrl()}/docPermissions/v1/forDocType/${docRefType}`,
          {},
          false
        ),
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    getPermissionsForDocumentForUser: useCallback(
      (docRefUuid: string, userUuid: string): Promise<Array<string>> =>
        httpGetJson(
          `${getStroomBaseServiceUrl()}/docPermissions/v1/forDocForUser/${docRefUuid}/${userUuid}`
        ),
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    addDocPermission: useCallback(
      (
        docRefUuid: string,
        userUuid: string,
        permissionName: string
      ): Promise<void> =>
        httpPostEmptyResponse(
          `${getStroomBaseServiceUrl()}/docPermissions/v1/forDocForUser/${docRefUuid}/${userUuid}/${permissionName}`
        ),
      [getStroomBaseServiceUrl, httpPostEmptyResponse]
    ),
    removeDocPermission: useCallback(
      (
        docRefUuid: string,
        userUuid: string,
        permissionName: string
      ): Promise<void> =>
        httpDeleteEmptyResponse(
          `${getStroomBaseServiceUrl()}/docPermissions/v1/forDocForUser/${docRefUuid}/${userUuid}/${permissionName}`
        ),
      [getStroomBaseServiceUrl, httpDeleteEmptyResponse]
    ),
    getPermissionForDoc: useCallback(
      (docRefUuid: string) =>
        httpGetJson(
          `${getStroomBaseServiceUrl()}/docPermissions/v1/forDoc/${docRefUuid}`
        ),
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    clearDocPermissionsForUser: useCallback(
      (docRefUuid: string, userUuid: string) =>
        httpDeleteEmptyResponse(
          `${getStroomBaseServiceUrl()}/docPermissions/v1/forDocForUser/${docRefUuid}/${userUuid}`
        ),
      [getStroomBaseServiceUrl, httpDeleteEmptyResponse]
    ),
    clearDocPermissions: useCallback(
      (docRefUuid: string) =>
        httpDeleteEmptyResponse(
          `${getStroomBaseServiceUrl()}/docPermissions/v1/forDoc/${docRefUuid}`
        ),
      [getStroomBaseServiceUrl, httpDeleteEmptyResponse]
    )
  };
};

export default useApi;
