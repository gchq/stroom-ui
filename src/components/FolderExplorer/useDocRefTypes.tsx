import { useEffect } from "react";

import useExplorerApi from "./useExplorerApi";
import { DocRefTypeList } from "../../types";
import useReduxState from "../../lib/useReduxState";

export interface OutProps {
  docRefTypes: DocRefTypeList;
}

const useDocRefTypes = (): OutProps => {
  const docRefTypes = useReduxState(
    ({ folderExplorer: { docRefTypes } }) => docRefTypes
  );
  const { fetchDocRefTypes } = useExplorerApi();

  useEffect(fetchDocRefTypes, [fetchDocRefTypes]);

  return {
    docRefTypes
  };
};

export default useDocRefTypes;
