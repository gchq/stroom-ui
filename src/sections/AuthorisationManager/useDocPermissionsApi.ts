import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import useHttpClient from "../../lib/useHttpClient";
import { DocRefType } from "src/types";

interface Api {
  getPermissionForDocType: (docRefType: string) => Promise<Array<string>>;
  getPermissionsForDocumentForUser: (
    docRef: DocRefType,
    userUuid: string
  ) => Promise<Array<string>>;
  addDocPermission: (
    docRef: DocRefType,
    userUuid: string,
    permissionName: string
  ) => Promise<void>;
  removeDocPermission: (
    docRef: DocRefType,
    userUuid: string,
    permissionName: string
  ) => Promise<void>;
  clearDocPermissions: (docRef: DocRefType) => Promise<void>;
}

const useApi = (): Api => {
  const store = useContext(StoreContext);

  const {
    httpGetJson,
    httpPostEmptyResponse,
    httpDeleteEmptyResponse
  } = useHttpClient();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const getPermissionForDocType = useCallback(
    (docRefType: string): Promise<Array<string>> => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/docPermissions/v1/forDocType/${docRefType}`;

      return httpGetJson(url);
    },
    [httpGetJson]
  );

  const getPermissionsForDocumentForUser = useCallback(
    ({ type, uuid }: DocRefType, userUuid: string): Promise<Array<string>> => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/forDocForUser/${type}/${uuid}/${userUuid}`;

      return httpGetJson(url);
    },
    [httpGetJson]
  );

  const addDocPermission = useCallback(
    (
      { type, uuid }: DocRefType,
      userUuid: string,
      permissionName: string
    ): Promise<void> => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/docPermissions/v1/forDocForUser/${type}/${uuid}/${userUuid}/${permissionName}`;

      return httpPostEmptyResponse(url);
    },
    [httpPostEmptyResponse]
  );

  const removeDocPermission = useCallback(
    (
      { type, uuid }: DocRefType,
      userUuid: string,
      permissionName: string
    ): Promise<void> => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/docPermissions/v1/forDocForUser/${type}/${uuid}/${userUuid}/${permissionName}`;

      return httpDeleteEmptyResponse(url);
    },
    [httpDeleteEmptyResponse]
  );

  const clearDocPermissions = useCallback(
    ({ type, uuid }: DocRefType) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/docPermissions/v1/forDoc/${type}/{$uuid}`;

      return httpDeleteEmptyResponse(url);
    },
    [httpDeleteEmptyResponse]
  );

  return {
    getPermissionForDocType,
    getPermissionsForDocumentForUser,
    addDocPermission,
    removeDocPermission,
    clearDocPermissions
  };
};

export default useApi;
