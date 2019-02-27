import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import { useActionCreators as useFolderExplorerActionCreators } from "./redux";
import useHttpClient from "../../lib/useHttpClient/useHttpClient";
import { findByUuids, findItem } from "../../lib/treeUtils";
import { DocRefType, DocRefTree, DocRefInfoType } from "../../types";

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
  fetchDocRefTypes: (callback: (s: Array<string>) => void) => void;
  fetchDocInfo: (docRef: DocRefType) => void;
  searchApp: (
    callback: (s: Array<DocRefType>) => void,
    args: SearchProps
  ) => void;
  createDocument: (
    docRefType: string,
    docRefName: string,
    destinationFolderRef: DocRefType,
    permissionInheritance: string
  ) => void;
  renameDocument: (docRef: DocRefType, name: string) => void;
  copyDocuments: (
    uuids: Array<string>,
    destinationUuid: string,
    permissionInheritance: string
  ) => void;
  moveDocuments: (
    uuids: Array<string>,
    destinationUuid: string,
    permissionInheritance: string
  ) => void;
  deleteDocuments: (uuids: Array<string>) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const { httpGet, httpPost, httpPut, httpDelete } = useHttpClient();

  const {
    docTreeReceived,
    docRefInfoReceived,
    docRefCreated,
    docRefRenamed,
    docRefsCopied,
    docRefsMoved,
    docRefsDeleted
  } = useFolderExplorerActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const fetchDocTree = useCallback(() => {
    const state = store.getState();
    const url = `${state.config.values.stroomBaseServiceUrl}/explorer/v1/all`;
    httpGet(url, response =>
      response
        .json()
        .then((documentTree: DocRefTree) => docTreeReceived(documentTree))
    );
  }, [httpGet, docTreeReceived]);

  const fetchDocRefTypes = useCallback(
    (docRefTypesReceived: (d: Array<string>) => void) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/docRefTypes`;

      httpGet(url, response =>
        response
          .json()
          .then((docRefTypes: Array<string>) =>
            docRefTypesReceived(docRefTypes)
          )
      );
    },
    [httpGet]
  );
  const fetchDocInfo = useCallback(
    (docRef: DocRefType) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/info/${docRef.type}/${docRef.uuid}`;
      httpGet(url, response =>
        response
          .json()
          .then((docRefInfo: DocRefInfoType) => docRefInfoReceived(docRefInfo))
      );
    },
    [httpGet, docRefInfoReceived]
  );

  const searchApp = useCallback(
    (
      callback: (s: Array<DocRefType>) => void,
      { term = "", docRefType = "", pageOffset = 0, pageSize = 10 }
    ) => {
      const state = store.getState();
      const params = `searchTerm=${term}&docRefType=${docRefType}&pageOffset=${pageOffset}&pageSize=${pageSize}`;
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/search?${params}`;
      httpGet(
        url,
        r =>
          r
            .json()
            .then((searchResults: Array<DocRefType>) =>
              callback(searchResults)
            ),
        {},
        true
      );
    },
    [httpGet]
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
      httpPost(
        url,
        response =>
          response
            .json()
            .then((updatedTree: DocRefTree) => docRefCreated(updatedTree)),
        {
          body: JSON.stringify({
            docRefType,
            docRefName,
            destinationFolderRef: stripDocRef(destinationFolderRef),
            permissionInheritance
          })
        }
      );
    },
    [httpPost, docRefCreated]
  );

  const renameDocument = useCallback(
    (docRef: DocRefType, name: string) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/rename`;

      httpPut(
        url,
        response =>
          response
            .json()
            .then((resultDocRef: DocRefType) =>
              docRefRenamed(docRef, name, resultDocRef)
            ),
        {
          body: JSON.stringify({
            docRef: stripDocRef(docRef),
            name
          })
        }
      );
    },
    [httpPut, docRefRenamed]
  );
  const copyDocuments = useCallback(
    (
      uuids: Array<string>,
      destinationUuid: string,
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
      const destination = findItem(documentTree, destinationUuid)!;

      httpPost(
        url,
        response =>
          response
            .json()
            .then((updatedTree: DocRefTree) =>
              docRefsCopied(docRefs, destination.node, updatedTree)
            ),
        {
          body: JSON.stringify({
            docRefs: docRefs.map(stripDocRef),
            destinationFolderRef: stripDocRef(destination.node),
            permissionInheritance
          })
        }
      );
    },
    [httpPost, docRefsCopied]
  );

  const moveDocuments = useCallback(
    (
      uuids: Array<string>,
      destinationUuid: string,
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
      const destination = findItem(documentTree, destinationUuid)!;
      httpPut(
        url,
        response =>
          response
            .json()
            .then((updatedTree: DocRefTree) =>
              docRefsMoved(docRefs, destination.node, updatedTree)
            ),
        {
          body: JSON.stringify({
            docRefs: docRefs.map(stripDocRef),
            destinationFolderRef: stripDocRef(destination.node),
            permissionInheritance
          })
        }
      );
    },
    [httpPut, docRefsMoved]
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
      httpDelete(
        url,
        response =>
          response
            .json()
            .then((updatedTree: DocRefTree) =>
              docRefsDeleted(docRefs, updatedTree)
            ),
        {
          body: JSON.stringify(docRefs.map(stripDocRef))
        }
      );
    },
    [httpDelete, docRefsDeleted]
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
