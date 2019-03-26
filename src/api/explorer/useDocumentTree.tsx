import { useEffect } from "react";

import useReduxState from "../../lib/useReduxState";
import { GlobalStoreState } from "../../startup/reducers";
import useApi from "./useApi";
import { DocRefTree } from "../../types";
import { defaultState } from "./redux";

export const useDocumentTree = (): DocRefTree => {
  const documentTree = useReduxState(
    ({ documentTree }: GlobalStoreState) => documentTree
  );
  const { fetchDocTree } = useApi();

  useEffect(() => {
    if (documentTree === defaultState) {
      fetchDocTree();
    }
  }, [documentTree, fetchDocTree]);

  return documentTree;
};

export default useDocumentTree;
