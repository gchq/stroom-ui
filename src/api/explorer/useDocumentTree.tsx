import { useEffect, useCallback, useState } from "react";

import useApi from "./useApi";
import { DocRefTree, DocRefType, DocRefWithLineage } from "../../types";
import { updateItemInTree, findItem } from "../../lib/treeUtils";
import { SearchProps } from "./types";

interface UseDocumentTree {
  documentTree: DocRefTree;
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
  findDocRefWithLineage: (docRefUuid: string) => DocRefWithLineage;
}

export const DEFAULT_TREE: DocRefTree = {
  uuid: "none",
  type: "System",
  name: "None"
};

const DEFAULT_DOC_REF_WITH_LINEAGE: DocRefWithLineage = {
  lineage: [],
  node: DEFAULT_TREE
};

export const useDocumentTree = (): UseDocumentTree => {
  const [documentTree, setDocumentTree] = useState<DocRefTree>(DEFAULT_TREE);

  const {
    fetchDocTree,
    createDocument,
    copyDocuments,
    deleteDocuments,
    renameDocument,
    moveDocuments,
    searchApp
  } = useApi();

  useEffect(() => {
    if (documentTree === DEFAULT_TREE) {
      fetchDocTree().then(setDocumentTree);
    }
  }, [documentTree, fetchDocTree]);

  return {
    documentTree,
    searchApp,
    createDocument: useCallback(
      (
        docRefType: string,
        docRefName: string,
        destinationFolderRef: DocRefType,
        permissionInheritance: string
      ) => {
        createDocument(
          docRefType,
          docRefName,
          destinationFolderRef,
          permissionInheritance
        ).then(setDocumentTree);
      },
      [createDocument, setDocumentTree]
    ),
    renameDocument: useCallback(
      (docRef: DocRefType, name: string) => {
        renameDocument(docRef, name).then(resultDocRef => {
          const newTree = updateItemInTree(
            documentTree,
            docRef.uuid,
            resultDocRef
          );
          setDocumentTree(newTree);
        });
      },
      [renameDocument, setDocumentTree, documentTree]
    ),
    copyDocuments: useCallback(
      (
        uuids: Array<string>,
        destination: DocRefType,
        permissionInheritance: string
      ) => {
        copyDocuments(uuids, destination, permissionInheritance).then(
          setDocumentTree
        );
      },
      [copyDocuments, setDocumentTree]
    ),

    moveDocuments: useCallback(
      (
        uuids: Array<string>,
        destination: DocRefType,
        permissionInheritance: string
      ) => {
        moveDocuments(uuids, destination, permissionInheritance).then(
          setDocumentTree
        );
      },
      [moveDocuments, setDocumentTree]
    ),
    deleteDocuments: useCallback(
      (uuids: Array<string>) => {
        deleteDocuments(uuids).then(setDocumentTree);
      },
      [deleteDocuments, setDocumentTree]
    ),
    findDocRefWithLineage: useCallback(
      (docRefUuid: string) =>
        findItem(documentTree, docRefUuid) || DEFAULT_DOC_REF_WITH_LINEAGE,
      [documentTree]
    )
  };
};

export default useDocumentTree;
