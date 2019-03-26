import { useCallback, useContext } from "react";
import { StoreContext } from "redux-react-hook";

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
  fetchDocTree: () => Promise<DocRefTree>;
  fetchDocRefTypes: () => Promise<Array<string>>;
  fetchDocInfo: (docRef: DocRefType) => Promise<DocRefInfoType>;
  searchApp: (args: SearchProps) => Promise<Array<DocRefType>>;
  createDocument: (
    docRefType: string,
    docRefName: string,
    destinationFolderRef: DocRefType,
    permissionInheritance: string
  ) => Promise<DocRefTree>;
  renameDocument: (docRef: DocRefType, name: string) => Promise<DocRefType>;
  copyDocuments: (
    uuids: Array<string>,
    destination: DocRefType,
    permissionInheritance: string
  ) => Promise<DocRefTree>;
  moveDocuments: (
    uuids: Array<string>,
    destination: DocRefType,
    permissionInheritance: string
  ) => Promise<DocRefTree>;
  deleteDocuments: (uuids: Array<string>) => Promise<DocRefTree>;
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

  return {
    fetchDocTree: useCallback(
      () => httpGetJson(`${stroomBaseServiceUrl}/explorer/v1/all`),
      [stroomBaseServiceUrl, httpGetJson]
    ),

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
      ) =>
        httpPostJsonResponse(`${stroomBaseServiceUrl}/explorer/v1/create`, {
          body: JSON.stringify({
            docRefType,
            docRefName,
            destinationFolderRef: stripDocRef(destinationFolderRef),
            permissionInheritance
          })
        }),
      [stroomBaseServiceUrl, httpPostJsonResponse]
    ),
    renameDocument: useCallback(
      (docRef: DocRefType, name: string) =>
        httpPutJsonResponse(`${stroomBaseServiceUrl}/explorer/v1/rename`, {
          body: JSON.stringify({
            docRef: stripDocRef(docRef),
            name
          })
        }),
      [stroomBaseServiceUrl, httpPutJsonResponse]
    ),
    copyDocuments: useCallback(
      (
        uuids: Array<string>,
        destination: DocRefType,
        permissionInheritance: string
      ) => {
        const { documentTree } = store.getState();
        const docRefs = findByUuids(documentTree, uuids);

        return httpPostJsonResponse(
          `${stroomBaseServiceUrl}/explorer/v1/copy`,
          {
            body: JSON.stringify({
              docRefs: docRefs.map(stripDocRef),
              destinationFolderRef: stripDocRef(destination),
              permissionInheritance
            })
          }
        );
      },
      [stroomBaseServiceUrl, httpPostJsonResponse]
    ),
    moveDocuments: useCallback(
      (
        uuids: Array<string>,
        destination: DocRefType,
        permissionInheritance: string
      ) => {
        const { documentTree } = store.getState();
        const docRefs = findByUuids(documentTree, uuids);
        return httpPutJsonResponse(`${stroomBaseServiceUrl}/explorer/v1/move`, {
          body: JSON.stringify({
            docRefs: docRefs.map(stripDocRef),
            destinationFolderRef: stripDocRef(destination),
            permissionInheritance
          })
        });
      },
      [stroomBaseServiceUrl, httpPutJsonResponse]
    ),
    deleteDocuments: useCallback(
      (uuids: Array<string>) => {
        const { documentTree } = store.getState();
        const docRefs = findByUuids(documentTree, uuids);
        return httpDeleteJsonResponse(
          `${stroomBaseServiceUrl}/explorer/v1/delete`,
          {
            body: JSON.stringify(docRefs.map(stripDocRef))
          }
        );
      },
      [stroomBaseServiceUrl, httpDeleteJsonResponse]
    )
  };
};

export default useApi;
