import { useEffect, useState } from "react";

import useExplorerApi from "../FolderExplorer/useExplorerApi";
import { DocRefTypeList } from "../../types";

export interface OutProps {
  docRefTypes: DocRefTypeList;
}

const useDocRefTypes = (): OutProps => {
  const [docRefTypes, setDocRefTypes] = useState<DocRefTypeList>([]);

  const { fetchDocRefTypes } = useExplorerApi();

  useEffect(() => {
    fetchDocRefTypes().then(setDocRefTypes);
  }, [fetchDocRefTypes, setDocRefTypes]);

  return {
    docRefTypes
  };
};

export default useDocRefTypes;
