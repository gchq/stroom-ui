import { useCallback, useState } from "react";

import {
  UseStreamSearch,
  SearchProps,
  SearchWithExpressionProps
} from "./types";
import useApi from "./useApi";
import { StreamAttributeMapResult } from "../../types";

const defaultStreams: StreamAttributeMapResult = {
  streamAttributeMaps: [],
  pageResponse: {
    offset: 0,
    total: 0,
    length: 0,
    exact: true
  }
};

export default (): UseStreamSearch => {
  const [streams, setStreams] = useState<StreamAttributeMapResult>(
    defaultStreams
  );
  const { search, searchWithExpression } = useApi();

  return {
    streams,
    searchWithExpression: useCallback(
      (s: SearchWithExpressionProps) => {
        searchWithExpression(s).then(setStreams);
      },
      [searchWithExpression, setStreams]
    ),
    search: useCallback((s: SearchProps) => search(s).then(setStreams), [
      search,
      setStreams
    ])
  };
};
