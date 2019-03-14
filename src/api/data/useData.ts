import { useState, useCallback } from "react";

import useApi from "./useApi";
import { UseData, PagedData, FetchDataParams } from "./types";

const defaultPagedData: PagedData = {
  streamAttributeMaps: [],
  total: 0
};

const defaultFetchParams: FetchDataParams = {
  metaId: undefined,
  pageOffset: 0,
  pageSize: 20
};

export default (): UseData => {
  const { getDataForSelectedRow } = useApi();

  const [pagedData, setPagedData] = useState<PagedData>(defaultPagedData);
  const [fetchParams, setFetchParams] = useState<FetchDataParams>(
    defaultFetchParams
  );

  const updatePagedData = useCallback(
    (updates: Partial<PagedData>) => {
      setPagedData({ ...pagedData, ...updates });
    },
    [pagedData, setPagedData]
  );

  const updateFetchParams = useCallback(
    (updates: Partial<FetchDataParams>) => {
      setFetchParams({ ...fetchParams, ...updates });
    },
    [fetchParams, setFetchParams]
  );

  const getDataForSelectedRowWrapped = useCallback(() => {
    getDataForSelectedRow(fetchParams).then(d => {
      console.log("D", d);
      // setPagedData({
      //   streamAttributeMaps: d.
      // })
    });
  }, [fetchParams, getDataForSelectedRow]);

  return {
    pagedData,
    updatePagedData,
    fetchParams,
    updateFetchParams,
    getDataForSelectedRow: getDataForSelectedRowWrapped
  };
};
