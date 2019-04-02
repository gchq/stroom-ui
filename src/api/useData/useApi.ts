import * as React from "react";
import useHttpClient from "src/lib/useHttpClient";
import { AbstractFetchDataResult } from "src/types";
import { FetchDataParams } from "./types";
import { useConfig } from "src/startup/config";

interface Api {
  getDataForSelectedRow: (
    fetchParams: FetchDataParams,
  ) => Promise<AbstractFetchDataResult>;
}

export const useApi = (): Api => {
  const { stroomBaseServiceUrl } = useConfig();
  const { httpGetJson } = useHttpClient();

  const getDataForSelectedRow = React.useCallback(
    ({ pageOffset, pageSize, metaId }: FetchDataParams) => {
      var url = new URL(`${stroomBaseServiceUrl}/data/v1/`);
      if (!!metaId) url.searchParams.append("metaId", metaId.toString());
      url.searchParams.append("streamsOffset", "0");
      url.searchParams.append("streamsLength", "1");
      url.searchParams.append("pageOffset", `${pageOffset || 0}`);
      url.searchParams.append("pageSize", `${pageSize || 100}`);

      return httpGetJson(url.href);
    },
    [httpGetJson],
  );

  return {
    getDataForSelectedRow,
  };
};

export default useApi;
