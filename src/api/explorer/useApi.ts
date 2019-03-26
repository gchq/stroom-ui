import { useCallback, useContext } from "react";
import { StoreContext } from "redux-react-hook";

import { useActionCreators as useFolderExplorerActionCreators } from "./redux";
import useHttpClient from "../useHttpClient";
import { findByUuids } from "../../lib/treeUtils";
import { DocRefType, DocRefTree, DocRefInfoType } from "../../types";
import { SearchProps } from "./types";
import { useConfig } from "../../startup/config";

const stripDocRef = (docRef: DocRefType) => ({
  uuid: docRef.uuid,
  type: docRef.type,
  name: docRef.name
});

interface Api {
  fetchDocTree: () => void;
  fetchDocRefTypes: () => Promise<Array<string>>;
  fetchDocInfo: (docRef: DocRefType) => Promise<DocRefInfoType>;
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
  const { stroomBaseServiceUrl } = useConfig();

  if (!store) {
    throw new Error("Could not connect to redux store");
  }

  const {
    httpGetJson,
    httpPostJsonResponse,
    httpPutJsonResponse,
    httpDeleteJsonResponse
  } = useHttpClient();

  const {
    docTreeReceived,
    docRefCreated,
    docRefRenamed,
    docRefsCopied,
    docRefsMoved,
    docRefsDeleted
  } = useFolderExplorerActionCreators();

  return {
    fetchDocTree: useCallback(() => {
      httpGetJson(`${stroomBaseServiceUrl}/explorer/v1/all`).then(
        docTreeReceived
      );
    }, [stroomBaseServiceUrl, httpGetJson, docTreeReceived]),

    fetchDocRefTypes: useCallback(
      () => httpGetJson(`${stroomBaseServiceUrl}/explorer/v1/docRefTypes`),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    fetchDocInfo: useCallback(
      (docRef: DocRefType) =>
        httpGetJson(
          `${stroomBaseServiceUrl}/explorer/v1/info/${docRef.type}/${
            docRef.uuid
          }`
        ),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    searchApp: useCallback(
      ({ term = "", docRefType = "", pageOffset = 0, pageSize = 10 }) => {
        const params = `searchTerm=${term}&docRefType=${docRefType}&pageOffset=${pageOffset}&pageSize=${pageSize}`;
        const url = `${stroomBaseServiceUrl}/explorer/v1/search?${params}`;

        return httpGetJson(url);
      },
      [stroomBaseServiceUrl, httpGetJson]
    ),
    createDocument: useCallback(
      (
        docRefType: string,
        docRefName: string,
        destinationFolderRef: DocRefType,
        permissionInheritance: string
      ) => {
        httpPostJsonResponse(`${stroomBaseServiceUrl}/explorer/v1/create`, {
          body: JSON.stringify({
            docRefType,
            docRefName,
            destinationFolderRef: stripDocRef(destinationFolderRef),
            permissionInheritance
          })
        }).then(docRefCreated);
      },
      [stroomBaseServiceUrl, httpPostJsonResponse, docRefCreated]
    ),
    renameDocument: useCallback(
      (docRef: DocRefType, name: string) => {
        httpPutJsonResponse(`${stroomBaseServiceUrl}/explorer/v1/rename`, {
          body: JSON.stringify({
            docRef: stripDocRef(docRef),
            name
          })
        }).then((resultDocRef: DocRefType) =>
          docRefRenamed(docRef, name, resultDocRef)
        );
      },
      [stroomBaseServiceUrl, httpPutJsonResponse, docRefRenamed]
    ),
    copyDocuments: useCallback(
      (
        uuids: Array<string>,
        destination: DocRefType,
        permissionInheritance: string
      ) => {
        const {
          folderExplorer: { documentTree }
        } = store.getState();
        const docRefs = findByUuids(documentTree, uuids);

        httpPostJsonResponse(`${stroomBaseServiceUrl}/explorer/v1/copy`, {
          body: JSON.stringify({
            docRefs: docRefs.map(stripDocRef),
            destinationFolderRef: stripDocRef(destination),
            permissionInheritance
          })
        }).then((updatedTree: DocRefTree) =>
          docRefsCopied(docRefs, destination, updatedTree)
        );
      },
      [stroomBaseServiceUrl, httpPostJsonResponse, docRefsCopied]
    ),
    moveDocuments: useCallback(
      (
        uuids: Array<string>,
        destination: DocRefType,
        permissionInheritance: string
      ) => {
        const {
          folderExplorer: { documentTree }
        } = store.getState();
        const docRefs = findByUuids(documentTree, uuids);
        httpPutJsonResponse(`${stroomBaseServiceUrl}/explorer/v1/move`, {
          body: JSON.stringify({
            docRefs: docRefs.map(stripDocRef),
            destinationFolderRef: stripDocRef(destination),
            permissionInheritance
          })
        }).then((updatedTree: DocRefTree) =>
          docRefsMoved(docRefs, destination, updatedTree)
        );
      },
      [stroomBaseServiceUrl, httpPutJsonResponse, docRefsMoved]
    ),
    deleteDocuments: useCallback(
      (uuids: Array<string>) => {
        const {
          folderExplorer: { documentTree }
        } = store.getState();
        const docRefs = findByUuids(documentTree, uuids);
        httpDeleteJsonResponse(`${stroomBaseServiceUrl}/explorer/v1/delete`, {
          body: JSON.stringify(docRefs.map(stripDocRef))
        }).then((updatedTree: DocRefTree) =>
          docRefsDeleted(docRefs, updatedTree)
        );
      },
      [stroomBaseServiceUrl, httpDeleteJsonResponse, docRefsDeleted]
    )
  };
};

export default useApi;
