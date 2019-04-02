import { useEffect, useState } from "react";

import useApi from "./useApi";

const useDocRefTypes = (): string[] => {
  const [docRefTypes, setDocRefTypes] = useState<string[]>([]);

  const { fetchDocRefTypes } = useApi();

  useEffect(() => {
    fetchDocRefTypes().then(setDocRefTypes);
  }, [setDocRefTypes, fetchDocRefTypes]);

  return docRefTypes;
};

export default useDocRefTypes;
