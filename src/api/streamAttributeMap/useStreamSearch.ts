import { useCallback, useState } from "react";

import { UseStreamSearch, PageProps, SearchWithExpressionProps } from "./types";
import useApi from "./useApi";
import { StreamAttributeMapResult } from "src/types";

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
  const [streams, setStreams] = useState<StreamAttributeMapResult>(
    defaultStreams,
  );
  const { page, search } = useApi();

  return {
    streams,
    search: useCallback(
      (s: SearchWithExpressionProps) => search(s).then(setStreams),
      [search, setStreams],
    ),
    page: useCallback((s: PageProps) => page(s).then(setStreams), [
      page,
      setStreams,
    ]),
  };
};

export default useStreamSearch;
