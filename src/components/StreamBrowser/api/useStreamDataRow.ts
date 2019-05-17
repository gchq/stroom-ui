import * as React from "react";

import useApi from "./useApi";
import { StreamMetaRow } from "../types";

const useStreamDataRow = (metaId: number): StreamMetaRow | undefined => {
  const [dataRow, setDataRow] = React.useState<StreamMetaRow | undefined>(
    undefined,
  );
  const { getDetailsForSelectedStream } = useApi();

  React.useEffect(() => {
    getDetailsForSelectedStream(metaId).then(setDataRow);
  }, [metaId, setDataRow, getDetailsForSelectedStream]);

  return dataRow;
};

export default useStreamDataRow;
