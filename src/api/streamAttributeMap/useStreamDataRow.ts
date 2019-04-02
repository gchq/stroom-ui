import * as React from "react";

import useApi from "./useApi";
import { DataRow } from "src/types";

const useStreamDataRow = (metaId: number): DataRow | undefined => {
  const [dataRow, setDataRow] = React.useState<DataRow | undefined>(undefined);
  const { getDetailsForSelectedStream } = useApi();

  React.useEffect(() => {
    getDetailsForSelectedStream(metaId).then(setDataRow);
  }, [metaId, setDataRow, getDetailsForSelectedStream]);

  return dataRow;
};

export default useStreamDataRow;
