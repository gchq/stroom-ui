import { createContext } from "react";
import { DocRefTree, DocRefType, DocRefWithLineage } from "../../types";
import { SearchProps } from "./types";
import { DEFAULT_TREE, DEFAULT_DOC_REF_WITH_LINEAGE } from "./values";

export interface DocumentTreeContextValue {
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

const NO_OP_FUNCTION = () =>
  console.error("Unexpected call to default context");

const DocumentTreeContext = createContext<DocumentTreeContextValue>({
  copyDocuments: NO_OP_FUNCTION,
  createDocument: NO_OP_FUNCTION,
  deleteDocuments: NO_OP_FUNCTION,
  documentTree: DEFAULT_TREE,
  findDocRefWithLineage: () => DEFAULT_DOC_REF_WITH_LINEAGE,
  moveDocuments: NO_OP_FUNCTION,
  renameDocument: NO_OP_FUNCTION,
  searchApp: () => Promise.reject()
});

export default DocumentTreeContext;
