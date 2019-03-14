import { useCallback } from "react";
import useStroomBaseUrl from "../useStroomBaseUrl";
import useHttpClient from "../useHttpClient";
import { AbstractFetchDataResult } from "../../types";
import { FetchDataParams } from "./types";

interface Api {
  getDataForSelectedRow: (
    fetchParams: FetchDataParams
  ) => Promise<AbstractFetchDataResult>;
}

export const useApi = (): Api => {
  const stroomBaseServiceUrl = useStroomBaseUrl();
  const { httpGetJson } = useHttpClient();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const getDataForSelectedRow = useCallback(
    ({ pageOffset, pageSize, metaId }: FetchDataParams) => {
      const state = store.getState();

      var url = new URL(`${stroomBaseServiceUrl}/data/v1/`);
      if (!!metaId) url.searchParams.append("metaId", metaId.toString());
      url.searchParams.append("streamsOffset", "0");
      url.searchParams.append("streamsLength", "1");
      url.searchParams.append("pageOffset", `${pageOffset || 0}`);
      url.searchParams.append("pageSize", `${pageSize || 100}`);

      return httpGetJson(url.href);
    },
    [httpGetJson]
  );

  return {
    getDataForSelectedRow
  };
};

export default useApi;
