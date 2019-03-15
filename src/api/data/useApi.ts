import { useCallback } from "react";
import useHttpClient from "../useHttpClient";
import { AbstractFetchDataResult } from "../../types";
import { FetchDataParams } from "./types";
import useGetStroomBaseServiceUrl from "../useGetStroomBaseServiceUrl";

interface Api {
  getDataForSelectedRow: (
    fetchParams: FetchDataParams
  ) => Promise<AbstractFetchDataResult>;
}

export const useApi = (): Api => {
  const getStroomBaseServiceUrl = useGetStroomBaseServiceUrl();
  const { httpGetJson } = useHttpClient();

  const getDataForSelectedRow = useCallback(
    ({ pageOffset, pageSize, metaId }: FetchDataParams) => {
      var url = new URL(`${getStroomBaseServiceUrl()}/data/v1/`);
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
