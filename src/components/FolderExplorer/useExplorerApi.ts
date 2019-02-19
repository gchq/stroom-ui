import { useContext } from "react";
import { StoreContext } from "redux-react-hook";

import { actionCreators as folderExplorerActionCreators } from "./redux";
import { actionCreators as docRefTypesActionCreators } from "../DocRefTypes/redux";
import { actionCreators as appSearchActionCreators } from "../AppSearchBar/redux";
import {
  wrappedGet,
  wrappedPut,
  wrappedPost,
  wrappedDelete
} from "../../lib/fetchTracker.redux";
import { findByUuids, findItem } from "../../lib/treeUtils";
import { DocRefType, DocRefTree, DocRefInfoType } from "../../types";

const {
  docTreeReceived,
  docRefRenamed,
  docRefsCopied,
  docRefsMoved,
  docRefsDeleted,
  docRefCreated,
  docRefInfoReceived
} = folderExplorerActionCreators;

const { searchResultsReturned } = appSearchActionCreators;

const { docRefTypesReceived } = docRefTypesActionCreators;

const stripDocRef = (docRef: DocRefType) => ({
  uuid: docRef.uuid,
  type: docRef.type,
  name: docRef.name
});

export interface Api {
  fetchDocTree: () => void;
  fetchDocRefTypes: () => void;
  fetchDocInfo: (docRef: DocRefType) => void;
  searchApp: (
    pickerId: string,
    args: {
      term?: string;
      docRefType?: string;
      pageOffset?: number;
      pageSize?: number;
    }
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

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  return {
    fetchDocTree: () => {
      const state = store.getState();
      const url = `${state.config.values.stroomBaseServiceUrl}/explorer/v1/all`;
      wrappedGet(store.dispatch, state, url, response =>
        response
          .json()
          .then((documentTree: DocRefTree) =>
            store.dispatch(docTreeReceived(documentTree))
          )
      );
    },
    fetchDocRefTypes: () => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/docRefTypes`;

      wrappedGet(store.dispatch, state, url, response =>
        response
          .json()
          .then((docRefTypes: Array<string>) =>
            store.dispatch(docRefTypesReceived(docRefTypes))
          )
      );
    },
    fetchDocInfo: (docRef: DocRefType) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/info/${docRef.type}/${docRef.uuid}`;
      wrappedGet(store.dispatch, state, url, response =>
        response
          .json()
          .then((docRefInfo: DocRefInfoType) =>
            store.dispatch(docRefInfoReceived(docRefInfo))
          )
      );
    },
    searchApp: (
      pickerId: string,
      { term = "", docRefType = "", pageOffset = 0, pageSize = 10 }
    ) => {
      const state = store.getState();
      const params = `searchTerm=${term}&docRefType=${docRefType}&pageOffset=${pageOffset}&pageSize=${pageSize}`;
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/search?${params}`;
      wrappedGet(
        store.dispatch,
        state,
        url,
        r =>
          r
            .json()
            .then((searchResults: Array<DocRefType>) =>
              store.dispatch(searchResultsReturned(pickerId, searchResults))
            ),
        {},
        true
      );
    },
    createDocument: (
      docRefType: string,
      docRefName: string,
      destinationFolderRef: DocRefType,
      permissionInheritance: string
    ) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/create`;
      wrappedPost(
        store.dispatch,
        state,
        url,
        response =>
          response
            .json()
            .then((updatedTree: DocRefTree) =>
              store.dispatch(docRefCreated(updatedTree))
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
    renameDocument: (docRef: DocRefType, name: string) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/rename`;

      wrappedPut(
        store.dispatch,
        state,
        url,
        response =>
          response
            .json()
            .then((resultDocRef: DocRefType) =>
              store.dispatch(docRefRenamed(docRef, name, resultDocRef))
            ),
        {
          body: JSON.stringify({
            docRef: stripDocRef(docRef),
            name
          })
        }
      );
    },
    copyDocuments: (
      uuids: Array<string>,
      destinationUuid: string,
      permissionInheritance: string
    ) => {
      const state = store.getState();
      const {
        config: {
          values: { stroomBaseServiceUrl }
        },
        folderExplorer: { documentTree }
      } = state;
      const url = `${stroomBaseServiceUrl}/explorer/v1/copy`;
      const docRefs = findByUuids(documentTree, uuids);
      const destination = findItem(documentTree, destinationUuid)!;

      wrappedPost(
        store.dispatch,
        state,
        url,
        response =>
          response
            .json()
            .then((updatedTree: DocRefTree) =>
              store.dispatch(
                docRefsCopied(docRefs, destination.node, updatedTree)
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
    moveDocuments: (
      uuids: Array<string>,
      destinationUuid: string,
      permissionInheritance: string
    ) => {
      const state = store.getState();
      const {
        config: {
          values: { stroomBaseServiceUrl }
        },
        folderExplorer: { documentTree }
      } = state;

      const url = `${stroomBaseServiceUrl}/explorer/v1/move`;
      const docRefs = findByUuids(documentTree, uuids);
      const destination = findItem(documentTree, destinationUuid)!;
      wrappedPut(
        store.dispatch,
        state,
        url,
        response =>
          response
            .json()
            .then((updatedTree: DocRefTree) =>
              store.dispatch(
                docRefsMoved(docRefs, destination.node, updatedTree)
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
    deleteDocuments: (uuids: Array<string>) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/explorer/v1/delete`;
      const docRefs = findByUuids(state.folderExplorer.documentTree, uuids);
      wrappedDelete(
        store.dispatch,
        state,
        url,
        response =>
          response
            .json()
            .then((updatedTree: DocRefTree) =>
              store.dispatch(docRefsDeleted(docRefs, updatedTree))
            ),
        {
          body: JSON.stringify(docRefs.map(stripDocRef))
        }
      );
    }
  };
};

export default useApi;
