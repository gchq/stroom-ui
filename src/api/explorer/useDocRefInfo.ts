import { useEffect, useState } from "react";

import { DocRefType, DocRefInfoType } from "src/types";
import useApi from "./useApi";

const useDocRefInfo = (docRef?: DocRefType): DocRefInfoType | undefined => {
  const [docRefInfo, setDocRefInfo] = useState<DocRefInfoType | undefined>(undefined);
  const { fetchDocInfo } = useApi();
  useEffect(() => {
    if (!!docRef) {
      fetchDocInfo(docRef).then(setDocRefInfo);
    }
  }, [docRef, fetchDocInfo, setDocRefInfo]);

  return docRefInfo;
};

export default useDocRefInfo;