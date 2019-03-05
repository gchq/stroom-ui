import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import { useActionCreators as useFolderExplorerActionCreators } from "./redux";
import useHttpClient from "../../lib/useHttpClient";
import { findByUuids } from "../../lib/treeUtils";
import { DocRefType, DocRefTree } from "../../types";

const stripDocRef = (docRef: DocRefType) => ({
  uuid: docRef.uuid,
  type: docRef.type,
  name: docRef.name
});

export interface SearchProps {
  term?: string;
  docRefType?: string;
  pageOffset?: number;
  pageSize?: number;
}

export interface Api {
  fetchDocTree: () => void;
  fetchDocRefTypes: () => void;
  fetchDocInfo: (docRef: DocRefType) => void;
  searchApp: (args: SearchProps) => Promise<Array<DocRefType>>;
  createDocument: (
    docRefType: string,
    docRefName: string,
    destinationFolderRef: DocRefType,
    permissionInheritance: string
  ) => void;
  renameDocument: (docRef: DocRefType, name: string) => void;
  copyDocuments: (
    uuids: Array<string>,
    destination: DocRefType,
    permissionInheritance: string
  ) => void;
  moveDocuments: (
    uuids: Array<string>,
    destination: DocRefType,
    permissionInheritance: string
  ) => void;
  deleteDocuments: (uuids: Array<string>) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const {
    httpGetJson,
    httpPostJsonResponse,
    httpPutJsonResponse,
    httpDeleteJsonResponse
  } = useHttpClient();

  const {
    docTreeReceived,
    docRefInfoReceived,
    docRefCreated,
    docRefRenamed,
    docRefsCopied,
    docRefsMoved,
    docRefsDeleted,
    docRefTypesReceived
  } = useFolderExplorerActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const fetchDocTree = useCallback(() => {
    const state = store.getState();
    const url = `${state.config.values.stroomBaseServiceUrl}/explorer/v1/all`;
    httpGetJson(url).then(docTreeReceived);
  }, [httpGetJson, docTreeReceived]);

  const fetchDocRefTypes = useCallback(() => {
    const state = store.getState();
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/explorer/v1/docRefTypes`;

    httpGetJson(url).then(docRefTypesReceived);
  }, [httpGetJson]);
  const fetchDocInfo = useCallback(
    (docRef: DocRefType) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/info/${docRef.type}/${docRef.uuid}`;
      httpGetJson(url).then(docRefInfoReceived);
    },
    [httpGetJson, docRefInfoReceived]
  );

  const searchApp = useCallback(
    ({ term = "", docRefType = "", pageOffset = 0, pageSize = 10 }) => {
      const state = store.getState();
      const params = `searchTerm=${term}&docRefType=${docRefType}&pageOffset=${pageOffset}&pageSize=${pageSize}`;
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/search?${params}`;

      return httpGetJson(url, {}, true);
    },
    [httpGetJson]
  );

  const createDocument = useCallback(
    (
      docRefType: string,
      docRefName: string,
      destinationFolderRef: DocRefType,
      permissionInheritance: string
    ) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/create`;
      httpPostJsonResponse(url, {
        body: JSON.stringify({
          docRefType,
          docRefName,
          destinationFolderRef: stripDocRef(destinationFolderRef),
          permissionInheritance
        })
      }).then(docRefCreated);
    },
    [httpPostJsonResponse, docRefCreated]
  );

  const renameDocument = useCallback(
    (docRef: DocRefType, name: string) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/rename`;

      httpPutJsonResponse(url, {
        body: JSON.stringify({
          docRef: stripDocRef(docRef),
          name
        })
      }).then((resultDocRef: DocRefType) =>
        docRefRenamed(docRef, name, resultDocRef)
      );
    },
    [httpPutJsonResponse, docRefRenamed]
  );
  const copyDocuments = useCallback(
    (
      uuids: Array<string>,
      destination: DocRefType,
      permissionInheritance: string
    ) => {
      const state = store.getState();
      const {
        folderExplorer: { documentTree }
      } = state;
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/copy`;
      const docRefs = findByUuids(documentTree, uuids);

      httpPostJsonResponse(url, {
        body: JSON.stringify({
          docRefs: docRefs.map(stripDocRef),
          destinationFolderRef: stripDocRef(destination),
          permissionInheritance
        })
      }).then((updatedTree: DocRefTree) =>
        docRefsCopied(docRefs, destination, updatedTree)
      );
    },
    [httpPostJsonResponse, docRefsCopied]
  );

  const moveDocuments = useCallback(
    (
      uuids: Array<string>,
      destination: DocRefType,
      permissionInheritance: string
    ) => {
      const state = store.getState();
      const {
        folderExplorer: { documentTree }
      } = state;
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/move`;
      const docRefs = findByUuids(documentTree, uuids);
      httpPutJsonResponse(url, {
        body: JSON.stringify({
          docRefs: docRefs.map(stripDocRef),
          destinationFolderRef: stripDocRef(destination),
          permissionInheritance
        })
      }).then((updatedTree: DocRefTree) =>
        docRefsMoved(docRefs, destination, updatedTree)
      );
    },
    [httpPutJsonResponse, docRefsMoved]
  );
  const deleteDocuments = useCallback(
    (uuids: Array<string>) => {
      const state = store.getState();
      const {
        folderExplorer: { documentTree }
      } = state;
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/delete`;
      const docRefs = findByUuids(documentTree, uuids);
      httpDeleteJsonResponse(url, {
        body: JSON.stringify(docRefs.map(stripDocRef))
      }).then((updatedTree: DocRefTree) =>
        docRefsDeleted(docRefs, updatedTree)
      );
    },
    [httpDeleteJsonResponse, docRefsDeleted]
  );

  return {
    fetchDocTree,
    fetchDocRefTypes,
    fetchDocInfo,
    searchApp,
    createDocument,
    copyDocuments,
    moveDocuments,
    deleteDocuments,
    renameDocument
  };
};

export default useApi;
