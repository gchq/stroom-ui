import { useCallback, useEffect } from "react";
import { useMappedState } from "redux-react-hook";

import { useFetchDocRefTypes } from "../FolderExplorer/explorerClient";
import { GlobalStoreState } from "../../startup/reducers";
import { DocRefTypeList } from "../../types";

export interface OutProps {
  docRefTypes: DocRefTypeList;
}

const useDocRefTypes = (): OutProps => {
  // Declare the memoized mapState function
  const mapState = useCallback(
    ({ docRefTypes }: GlobalStoreState) => ({
      docRefTypes
    }),
    []
  );

  // Get data from and subscribe to the store
  const { docRefTypes } = useMappedState(mapState);

  const fetchDocRefTypes = useFetchDocRefTypes();

  useEffect(() => fetchDocRefTypes(), []);

  return {
    docRefTypes
  };
};

export default useDocRefTypes;
