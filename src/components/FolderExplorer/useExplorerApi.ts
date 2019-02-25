import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

import { useActionCreators as useFolderExplorerActionCreators } from "./redux";
import { useActionCreators as useDocRefTypesActionCreators } from "../DocRefTypes/redux";
import { useActionCreators as useAppSearchActionCreators } from "../AppSearchBar/redux";
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
  fetchDocRefTypes: () => void;
  fetchDocInfo: (docRef: DocRefType) => void;
  searchApp: (componentId: string, args: SearchProps) => void;
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
  const httpClient = useHttpClient();

  const folderExplorerActionCreators = useFolderExplorerActionCreators();
  const docRefTypesActionCreators = useDocRefTypesActionCreators();
  const appSearchActionCreators = useAppSearchActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const fetchDocTree = useCallback(() => {
    const state = store.getState();
    const url = `${state.config.values.stroomBaseServiceUrl}/explorer/v1/all`;
    httpClient.httpGet(url, response =>
      response
        .json()
        .then((documentTree: DocRefTree) =>
          folderExplorerActionCreators.docTreeReceived(documentTree)
        )
    );
  }, []);

  const fetchDocRefTypes = useCallback(() => {
    const state = store.getState();
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/explorer/v1/docRefTypes`;

    httpClient.httpGet(url, response =>
      response
        .json()
        .then((docRefTypes: Array<string>) =>
          docRefTypesActionCreators.docRefTypesReceived(docRefTypes)
        )
    );
  }, []);
  const fetchDocInfo = useCallback((docRef: DocRefType) => {
    const state = store.getState();
    const url = `${state.config.values.stroomBaseServiceUrl}/explorer/v1/info/${
      docRef.type
    }/${docRef.uuid}`;
    httpClient.httpGet(url, response =>
      response
        .json()
        .then((docRefInfo: DocRefInfoType) =>
          folderExplorerActionCreators.docRefInfoReceived(docRefInfo)
        )
    );
  }, []);

  const searchApp = useCallback(
    (
      componentId: string,
      { term = "", docRefType = "", pageOffset = 0, pageSize = 10 }
    ) => {
      const state = store.getState();
      const params = `searchTerm=${term}&docRefType=${docRefType}&pageOffset=${pageOffset}&pageSize=${pageSize}`;
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/search?${params}`;
      httpClient.httpGet(
        url,
        r =>
          r
            .json()
            .then((searchResults: Array<DocRefType>) =>
              appSearchActionCreators.searchResultsReturned(
                componentId,
                searchResults
              )
            ),
        {},
        true
      );
    },
    []
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
      httpClient.httpPost(
        url,
        response =>
          response
            .json()
            .then((updatedTree: DocRefTree) =>
              folderExplorerActionCreators.docRefCreated(updatedTree)
            ),
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
    []
  );

  const renameDocument = useCallback((docRef: DocRefType, name: string) => {
    const state = store.getState();
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/explorer/v1/rename`;

    httpClient.httpPut(
      url,
      response =>
        response
          .json()
          .then((resultDocRef: DocRefType) =>
            folderExplorerActionCreators.docRefRenamed(
              docRef,
              name,
              resultDocRef
            )
          ),
      {
        body: JSON.stringify({
          docRef: stripDocRef(docRef),
          name
        })
      }
    );
  }, []);
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

      httpClient.httpPost(
        url,
        response =>
          response
            .json()
            .then((updatedTree: DocRefTree) =>
              folderExplorerActionCreators.docRefsCopied(
                docRefs,
                destination.node,
                updatedTree
              )
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
    []
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
      httpClient.httpPut(
        url,
        response =>
          response
            .json()
            .then((updatedTree: DocRefTree) =>
              folderExplorerActionCreators.docRefsMoved(
                docRefs,
                destination.node,
                updatedTree
              )
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
    []
  );
  const deleteDocuments = useCallback((uuids: Array<string>) => {
    const state = store.getState();
    const {
      folderExplorer: { documentTree }
    } = state;
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/explorer/v1/delete`;
    const docRefs = findByUuids(documentTree, uuids);
    httpClient.httpDelete(
      url,
      response =>
        response
          .json()
          .then((updatedTree: DocRefTree) =>
            folderExplorerActionCreators.docRefsDeleted(docRefs, updatedTree)
          ),
      {
        body: JSON.stringify(docRefs.map(stripDocRef))
      }
    );
  }, []);

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
