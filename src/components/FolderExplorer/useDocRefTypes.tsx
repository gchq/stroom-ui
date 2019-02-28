import { useEffect } from "react";

import useExplorerApi from "./useExplorerApi";
import { DocRefTypeList } from "../../types";
import useReduxState from "../../lib/useReduxState";
import { useActionCreators } from "./redux";

export interface OutProps {
  docRefTypes: DocRefTypeList;
}

const useDocRefTypes = (): OutProps => {
  const docRefTypes = useReduxState(
    ({ folderExplorer: { docRefTypes } }) => docRefTypes
  );
  const { docRefTypesReceived } = useActionCreators();
  const { fetchDocRefTypes } = useExplorerApi();

  useEffect(() => {
    fetchDocRefTypes().then(docRefTypesReceived);
  }, [fetchDocRefTypes, docRefTypesReceived]);

  return {
    docRefTypes
  };
};

export default useDocRefTypes;
