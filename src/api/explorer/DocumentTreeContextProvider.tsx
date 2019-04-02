import * as React from "react";
import { useEffect, useCallback, useState, FunctionComponent } from "react";

import useApi from "./useApi";
import { DocRefTree, DocRefType } from "src/types";
import { updateItemInTree, findItem, findByUuids } from "src/lib/treeUtils";
import DocumentTreeContext, {
  DocumentTreeContextValue
} from "./DocumentTreeContext";
import { DEFAULT_TREE, DEFAULT_DOC_REF_WITH_LINEAGE } from "./values";

const DocumentTreeContextProvider: FunctionComponent = ({ children }) => {
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

  const contextValue: DocumentTreeContextValue = {
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
        const docRefs = findByUuids(documentTree, uuids);
        copyDocuments(docRefs, destination, permissionInheritance).then(
          setDocumentTree
        );
      },
      [documentTree, copyDocuments, setDocumentTree]
    ),
    moveDocuments: useCallback(
      (
        uuids: Array<string>,
        destination: DocRefType,
        permissionInheritance: string
      ) => {
        const docRefs = findByUuids(documentTree, uuids);
        moveDocuments(docRefs, destination, permissionInheritance).then(
          setDocumentTree
        );
      },
      [documentTree, moveDocuments, setDocumentTree]
    ),
    deleteDocuments: useCallback(
      (uuids: Array<string>) => {
        const docRefs = findByUuids(documentTree, uuids);
        deleteDocuments(docRefs).then(setDocumentTree);
      },
      [documentTree, deleteDocuments, setDocumentTree]
    ),
    findDocRefWithLineage: useCallback(
      (docRefUuid: string) =>
        findItem(documentTree, docRefUuid) || DEFAULT_DOC_REF_WITH_LINEAGE,
      [documentTree]
    )
  };

  return (
    <DocumentTreeContext.Provider value={contextValue}>
      {children}
    </DocumentTreeContext.Provider>
  );
};

export default DocumentTreeContextProvider;
