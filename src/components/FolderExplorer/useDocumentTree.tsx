import { useEffect } from "react";

import useReduxState from "../../lib/useReduxState/useReduxState";
import { GlobalStoreState } from "../../startup/reducers";
import useExplorerApi from "./useExplorerApi";
import { DocRefTree } from "../../types";

export const useDocumentTree = (): DocRefTree => {
  const documentTree = useReduxState(
    ({ folderExplorer: { documentTree } }: GlobalStoreState) => documentTree
  );
  const explorerApi = useExplorerApi();

  useEffect(() => {
    explorerApi.fetchDocTree();
  }, []);

  return documentTree;
};
