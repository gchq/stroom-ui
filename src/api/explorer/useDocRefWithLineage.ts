import { useMemo } from "react";

import { DocRefWithLineage } from "src/types";
import { findItem } from "../../lib/treeUtils";
import useDocumentTree from "./useDocumentTree";

/**
 * If a component needs the full lineage information for a docRefUuid,
 * it can call this custom hook to find it.
 */

const defaultDocRefWithLineage: DocRefWithLineage = {
  lineage: [],
  node: {
    uuid: "NONE",
    name: "NONE",
    type: "NONE"
  }
};

export default (docRefUuid: string): DocRefWithLineage => {
  const documentTree = useDocumentTree();

  return (
    useMemo(() => findItem(documentTree, docRefUuid), [
      documentTree,
      docRefUuid
    ]) || defaultDocRefWithLineage
  );
};
