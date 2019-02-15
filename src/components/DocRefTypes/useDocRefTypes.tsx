import { useEffect } from "react";

import useReduxState from "../../lib/useReduxState/useReduxState";
import { useFetchDocRefTypes } from "../FolderExplorer/explorerClient";
import { DocRefTypeList } from "../../types";

export interface OutProps {
  docRefTypes: DocRefTypeList;
}

const useDocRefTypes = (): OutProps => {
  const { docRefTypes } = useReduxState(({ docRefTypes }) => ({
    docRefTypes
  }));

  const fetchDocRefTypes = useFetchDocRefTypes();

  useEffect(() => fetchDocRefTypes(), []);

  return {
    docRefTypes
  };
};

export default useDocRefTypes;
