import * as React from "react";

import { UseStreamSearch } from "./types";
import useApi from "./useApi";
import { ExpressionOperatorType } from "components/ExpressionBuilder/types";
import { StreamAttributeMapResult, PageRequest } from "../types";

const defaultStreams: StreamAttributeMapResult = {
  streamAttributeMaps: [],
  pageResponse: {
    offset: 0,
    total: 0,
    length: 0,
    exact: true,
  },
};

const useStreamSearch = (): UseStreamSearch => {
  const [streams, setStreams] = React.useState<StreamAttributeMapResult>(
    defaultStreams,
  );
  const { page, search } = useApi();

  return {
    streams,
    search: React.useCallback(
      (e: ExpressionOperatorType, p: PageRequest) =>
        search(e, p).then(setStreams),
      [search, setStreams],
    ),
    page: React.useCallback((s: PageRequest) => page(s).then(setStreams), [
      page,
      setStreams,
    ]),
  };
};

export default useStreamSearch;
