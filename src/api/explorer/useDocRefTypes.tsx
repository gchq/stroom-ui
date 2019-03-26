import { useEffect, useState } from "react";

import useApi from "./useApi";

const useDocRefTypes = (): Array<string> => {
  const [docRefTypes, setDocRefTypes] = useState<Array<string>>([]);

  const { fetchDocRefTypes } = useApi();

  useEffect(() => {
    fetchDocRefTypes().then(setDocRefTypes);
  }, [setDocRefTypes, fetchDocRefTypes]);

  return docRefTypes;
};

export default useDocRefTypes;
