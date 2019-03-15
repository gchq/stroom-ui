import { useCallback, useContext } from "react";
import { StoreContext } from "redux-react-hook";

import { useActionCreators as useFolderExplorerActionCreators } from "./redux";
import useHttpClient from "../useHttpClient";
import { findByUuids } from "../../lib/treeUtils";
import { DocRefType, DocRefTree } from "../../types";
import { SearchProps } from "./types";
import useGetStroomBaseServiceUrl from "../useGetStroomBaseServiceUrl";

const stripDocRef = (docRef: DocRefType) => ({
  uuid: docRef.uuid,
  type: docRef.type,
  name: docRef.name
});

interface Api {
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
  const getStroomBaseServiceUrl = useGetStroomBaseServiceUrl();

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
    docRefInfoReceived,
    docRefCreated,
    docRefRenamed,
    docRefsCopied,
    docRefsMoved,
    docRefsDeleted,
    docRefTypesReceived
  } = useFolderExplorerActionCreators();

  return {
    fetchDocTree: useCallback(() => {
      httpGetJson(`${getStroomBaseServiceUrl()}/explorer/v1/all`).then(
        docTreeReceived
      );
    }, [getStroomBaseServiceUrl, httpGetJson, docTreeReceived]),

    fetchDocRefTypes: useCallback(() => {
      httpGetJson(`${getStroomBaseServiceUrl()}/explorer/v1/docRefTypes`).then(
        docRefTypesReceived
      );
    }, [getStroomBaseServiceUrl, httpGetJson]),
    fetchDocInfo: useCallback(
      (docRef: DocRefType) => {
        httpGetJson(
          `${getStroomBaseServiceUrl()}/explorer/v1/info/${docRef.type}/${
            docRef.uuid
          }`
        ).then(docRefInfoReceived);
      },
      [getStroomBaseServiceUrl, httpGetJson, docRefInfoReceived]
    ),
    searchApp: useCallback(
      ({ term = "", docRefType = "", pageOffset = 0, pageSize = 10 }) => {
        const params = `searchTerm=${term}&docRefType=${docRefType}&pageOffset=${pageOffset}&pageSize=${pageSize}`;
        const url = `${getStroomBaseServiceUrl()}/explorer/v1/search?${params}`;

        return httpGetJson(url);
      },
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    createDocument: useCallback(
      (
        docRefType: string,
        docRefName: string,
        destinationFolderRef: DocRefType,
        permissionInheritance: string
      ) => {
        httpPostJsonResponse(
          `${getStroomBaseServiceUrl()}/explorer/v1/create`,
          {
            body: JSON.stringify({
              docRefType,
              docRefName,
              destinationFolderRef: stripDocRef(destinationFolderRef),
              permissionInheritance
            })
          }
        ).then(docRefCreated);
      },
      [getStroomBaseServiceUrl, httpPostJsonResponse, docRefCreated]
    ),
    renameDocument: useCallback(
      (docRef: DocRefType, name: string) => {
        httpPutJsonResponse(`${getStroomBaseServiceUrl()}/explorer/v1/rename`, {
          body: JSON.stringify({
            docRef: stripDocRef(docRef),
            name
          })
        }).then((resultDocRef: DocRefType) =>
          docRefRenamed(docRef, name, resultDocRef)
        );
      },
      [getStroomBaseServiceUrl, httpPutJsonResponse, docRefRenamed]
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

        httpPostJsonResponse(`${getStroomBaseServiceUrl()}/explorer/v1/copy`, {
          body: JSON.stringify({
            docRefs: docRefs.map(stripDocRef),
            destinationFolderRef: stripDocRef(destination),
            permissionInheritance
          })
        }).then((updatedTree: DocRefTree) =>
          docRefsCopied(docRefs, destination, updatedTree)
        );
      },
      [getStroomBaseServiceUrl, httpPostJsonResponse, docRefsCopied]
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
        httpPutJsonResponse(`${getStroomBaseServiceUrl()}/explorer/v1/move`, {
          body: JSON.stringify({
            docRefs: docRefs.map(stripDocRef),
            destinationFolderRef: stripDocRef(destination),
            permissionInheritance
          })
        }).then((updatedTree: DocRefTree) =>
          docRefsMoved(docRefs, destination, updatedTree)
        );
      },
      [getStroomBaseServiceUrl, httpPutJsonResponse, docRefsMoved]
    ),
    deleteDocuments: useCallback(
      (uuids: Array<string>) => {
        const {
          folderExplorer: { documentTree }
        } = store.getState();
        const docRefs = findByUuids(documentTree, uuids);
        httpDeleteJsonResponse(
          `${getStroomBaseServiceUrl()}/explorer/v1/delete`,
          {
            body: JSON.stringify(docRefs.map(stripDocRef))
          }
        ).then((updatedTree: DocRefTree) =>
          docRefsDeleted(docRefs, updatedTree)
        );
      },
      [getStroomBaseServiceUrl, httpDeleteJsonResponse, docRefsDeleted]
    )
  };
};

export default useApi;
