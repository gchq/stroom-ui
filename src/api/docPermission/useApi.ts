import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import useHttpClient from "../useHttpClient";
import { DocRefType, DocumentPermissions } from "src/types";

interface Api {
  // Server Side Constant
  getPermissionForDocType: (docRefType: string) => Promise<Array<string>>;

  // By Doc and User
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

  // By Doc
  getPermissionForDoc: (docRef: DocRefType) => Promise<DocumentPermissions>;
  clearDocPermissions: (docRef: DocRefType) => Promise<void>;
}

export const useApi = (): Api => {
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

  const getPermissionForDoc = useCallback(
    ({ type, uuid }: DocRefType) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/docPermissions/v1/forDoc/${type}/${uuid}`;

      return httpGetJson(url);
    },
    [httpGetJson]
  );

  const clearDocPermissions = useCallback(
    ({ type, uuid }: DocRefType) => {
      const state = store.getState();
      var url = `${
        state.config.values.stroomBaseServiceUrl
      }/docPermissions/v1/forDoc/${type}/${uuid}`;

      return httpDeleteEmptyResponse(url);
    },
    [httpDeleteEmptyResponse]
  );

  return {
    getPermissionForDocType,
    getPermissionForDoc,
    getPermissionsForDocumentForUser,
    addDocPermission,
    removeDocPermission,
    clearDocPermissions
  };
};

export default useApi;
