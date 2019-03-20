import { useEffect } from "react";

import useApi from "./useApi";
import { DocRefTypeList } from "../../types";
import useReduxState from "../../lib/useReduxState";

interface OutProps {
  docRefTypes: DocRefTypeList;
}

const useDocRefTypes = (): OutProps => {
  const docRefTypes = useReduxState(
    ({ folderExplorer: { docRefTypes } }) => docRefTypes
  );
  const { fetchDocRefTypes } = useApi();

  useEffect(fetchDocRefTypes, [fetchDocRefTypes]);

  return {
    docRefTypes
  };
};

export default useDocRefTypes;