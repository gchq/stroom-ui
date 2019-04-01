import { useCallback } from "react";

import useHttpClient from "src/lib/useHttpClient";
import { DocumentPermissions } from "src/types";
import { useConfig } from "src/startup/config";

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
  const { stroomBaseServiceUrl } = useConfig();

  const {
    httpGetJson,
    httpPostEmptyResponse,
    httpDeleteEmptyResponse
  } = useHttpClient();

  return {
    getPermissionForDocType: useCallback(
      (docRefType: string): Promise<Array<string>> =>
        httpGetJson(
          `${stroomBaseServiceUrl}/docPermissions/v1/forDocType/${docRefType}`,
          {},
          false
        ),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    getPermissionsForDocumentForUser: useCallback(
      (docRefUuid: string, userUuid: string): Promise<Array<string>> =>
        httpGetJson(
          `${stroomBaseServiceUrl}/docPermissions/v1/forDocForUser/${docRefUuid}/${userUuid}`
        ),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    addDocPermission: useCallback(
      (
        docRefUuid: string,
        userUuid: string,
        permissionName: string
      ): Promise<void> =>
        httpPostEmptyResponse(
          `${stroomBaseServiceUrl}/docPermissions/v1/forDocForUser/${docRefUuid}/${userUuid}/${permissionName}`
        ),
      [stroomBaseServiceUrl, httpPostEmptyResponse]
    ),
    removeDocPermission: useCallback(
      (
        docRefUuid: string,
        userUuid: string,
        permissionName: string
      ): Promise<void> =>
        httpDeleteEmptyResponse(
          `${stroomBaseServiceUrl}/docPermissions/v1/forDocForUser/${docRefUuid}/${userUuid}/${permissionName}`
        ),
      [stroomBaseServiceUrl, httpDeleteEmptyResponse]
    ),
    getPermissionForDoc: useCallback(
      (docRefUuid: string) =>
        httpGetJson(
          `${stroomBaseServiceUrl}/docPermissions/v1/forDoc/${docRefUuid}`
        ),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    clearDocPermissionsForUser: useCallback(
      (docRefUuid: string, userUuid: string) =>
        httpDeleteEmptyResponse(
          `${stroomBaseServiceUrl}/docPermissions/v1/forDocForUser/${docRefUuid}/${userUuid}`
        ),
      [stroomBaseServiceUrl, httpDeleteEmptyResponse]
    ),
    clearDocPermissions: useCallback(
      (docRefUuid: string) =>
        httpDeleteEmptyResponse(
          `${stroomBaseServiceUrl}/docPermissions/v1/forDoc/${docRefUuid}`
        ),
      [stroomBaseServiceUrl, httpDeleteEmptyResponse]
    )
  };
};

export default useApi;
