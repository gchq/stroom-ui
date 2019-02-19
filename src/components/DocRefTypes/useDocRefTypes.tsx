import { useEffect } from "react";

import useReduxState from "../../lib/useReduxState/useReduxState";
import useExplorerApi from "../FolderExplorer/useExplorerApi";
import { DocRefTypeList } from "../../types";

export interface OutProps {
  docRefTypes: DocRefTypeList;
}

const useDocRefTypes = (): OutProps => {
  const { docRefTypes } = useReduxState(({ docRefTypes }) => ({
    docRefTypes
  }));

  const explorerApi = useExplorerApi();

  useEffect(() => explorerApi.fetchDocRefTypes(), []);

  return {
    docRefTypes
  };
};

export default useDocRefTypes;
