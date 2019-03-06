import { useEffect } from "react";

import useReduxState from "../../lib/useReduxState";
import { GlobalStoreState } from "../../startup/reducers";
import useApi from "./useApi";
import { DocRefTree } from "../../types";

export default (): DocRefTree => {
  const { documentTree, waitingForTree } = useReduxState(
    ({
      folderExplorer: { waitingForTree, documentTree }
    }: GlobalStoreState) => ({ documentTree, waitingForTree })
  );
  const { fetchDocTree } = useApi();

  useEffect(() => {
    if (waitingForTree) {
      fetchDocTree();
    }
  }, [waitingForTree, fetchDocTree]);

  return documentTree;
};
