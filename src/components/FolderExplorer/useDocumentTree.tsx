import { useEffect } from "react";

import useReduxState from "../../lib/useReduxState/useReduxState";
import { GlobalStoreState } from "../../startup/reducers";
import { useFetchDocTree } from "./explorerClient";
import { DocRefTree } from "../../types";

export const useDocumentTree = (): DocRefTree => {
  const { documentTree } = useReduxState(
    ({ folderExplorer: { documentTree } }: GlobalStoreState) => ({
      documentTree
    })
  );
  const fetchDocTree = useFetchDocTree();

  useEffect(() => {
    fetchDocTree();
  });

  return documentTree;
};
