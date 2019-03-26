import { DocRefTree, DocRefWithLineage } from "../../types";

export const DEFAULT_TREE: DocRefTree = {
  uuid: "none",
  type: "System",
  name: "None"
};

export const DEFAULT_DOC_REF_WITH_LINEAGE: DocRefWithLineage = {
  lineage: [],
  node: DEFAULT_TREE
};
