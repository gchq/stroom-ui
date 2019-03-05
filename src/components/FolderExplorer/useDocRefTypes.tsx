import { useEffect } from "react";

import useApi from "../../api/explorer";
import { DocRefTypeList } from "../../types";
import useReduxState from "../../lib/useReduxState";

export interface OutProps {
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
