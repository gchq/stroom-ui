import { useCallback, useEffect } from "react";
import { useMappedState } from "redux-react-hook";

import { GlobalStoreState } from "../../startup/reducers";
import { useFetchDocTree } from "./explorerClient";
import { DocRefTree } from "../../types";

export const useDocumentTree = (): DocRefTree => {
  // Declare the memoized mapState function
  const mapState = useCallback(
    ({ folderExplorer: { documentTree } }: GlobalStoreState) => ({
      documentTree
    }),
    []
  );

  // Get data from and subscribe to the store
  const { documentTree } = useMappedState(mapState);
  const fetchDocTree = useFetchDocTree();

  useEffect(() => {
    fetchDocTree();
  });

  return documentTree;
};
