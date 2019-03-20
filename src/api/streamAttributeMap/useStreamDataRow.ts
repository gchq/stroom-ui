import { useEffect, useState } from "react";

import useApi from "./useApi";
import { DataRow } from "../../types";

const useStreamDataRow = (metaId: number): DataRow | undefined => {
  const [dataRow, setDataRow] = useState<DataRow | undefined>(undefined);
  const { getDetailsForSelectedStream } = useApi();

  useEffect(() => {
    getDetailsForSelectedStream(metaId).then(setDataRow);
  }, [metaId, setDataRow, getDetailsForSelectedStream]);

  return dataRow;
};

export default useStreamDataRow;