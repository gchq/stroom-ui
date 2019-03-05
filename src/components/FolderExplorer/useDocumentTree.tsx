import { useEffect } from "react";

import useReduxState from "../../lib/useReduxState/useReduxState";
import { GlobalStoreState } from "../../startup/reducers";
import useExplorerApi from "./useExplorerApi";
import { DocRefTree } from "../../types";

export const useDocumentTree = (): DocRefTree => {
  const { documentTree, waitingForTree } = useReduxState(
    ({
      folderExplorer: { waitingForTree, documentTree }
    }: GlobalStoreState) => ({ documentTree, waitingForTree })
  );
  const { fetchDocTree } = useExplorerApi();

  useEffect(() => {
    if (waitingForTree) {
      fetchDocTree();
    }
  }, [waitingForTree, fetchDocTree]);

  return documentTree;
};
