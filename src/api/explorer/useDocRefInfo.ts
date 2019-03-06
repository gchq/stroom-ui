import { useEffect } from "react";

import { DocRefType, DocRefInfoType } from "../../types";
import useReduxState from "../../lib/useReduxState";
import useApi from "./useApi";

export default (docRef?: DocRefType): DocRefInfoType | undefined => {
  const { fetchDocInfo } = useApi();
  useEffect(() => {
    if (!!docRef) {
      fetchDocInfo(docRef);
    }
  }, [docRef, fetchDocInfo]);

  let docRefInfoByUuid = useReduxState(
    ({ folderExplorer: { docRefInfoByUuid } }) => docRefInfoByUuid
  );

  return !!docRef ? docRefInfoByUuid[docRef.uuid] : undefined;
};
