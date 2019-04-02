import { useCallback } from "react";
import useHttpClient from "../useHttpClient";
import { DataSourceType, DataRow, StreamAttributeMapResult } from "src/types";
import { useConfig } from "src/startup/config";
import { SearchWithExpressionProps, PageProps } from "./types";
import cleanExpression from "./cleanExpression";

interface Api {
  page: (props: PageProps) => Promise<StreamAttributeMapResult>;
  search: (
    props: SearchWithExpressionProps,
  ) => Promise<StreamAttributeMapResult>;
  fetchDataSource: () => Promise<DataSourceType>;
  getDetailsForSelectedStream: (metaId: number) => Promise<DataRow>;
}

export const useApi = (): Api => {
  const { stroomBaseServiceUrl } = useConfig();
  const { httpGetJson, httpPostJsonResponse } = useHttpClient();

  return {
    fetchDataSource: useCallback(
      () =>
        httpGetJson(
          `${stroomBaseServiceUrl}/streamattributemap/v1/dataSource`,
          {},
          false,
        ),
      [stroomBaseServiceUrl, httpGetJson],
    ),
    getDetailsForSelectedStream: useCallback(
      (metaId: number) =>
        httpGetJson(
          `${stroomBaseServiceUrl}/streamattributemap/v1/${metaId}`,
          {},
          false,
        ),
      [stroomBaseServiceUrl, httpGetJson],
    ),
    page: useCallback(
      ({ pageInfo }: PageProps) => {
        var url = new URL(`${stroomBaseServiceUrl}/streamattributemap/v1/`);

        if (!!pageInfo) {
          const { pageOffset, pageSize } = pageInfo;
          if (!!pageSize)
            url.searchParams.append("pageSize", pageSize.toString());
          if (!!pageOffset)
            url.searchParams.append("pageOffset", pageOffset.toString());
        }

        return httpGetJson(url.href);
      },
      [stroomBaseServiceUrl, httpGetJson],
    ),
    search: useCallback(
      ({ pageInfo, expressionWithUuids }: SearchWithExpressionProps) => {
        var url = new URL(`${stroomBaseServiceUrl}/streamattributemap/v1/`);

        if (!!pageInfo) {
          const { pageOffset, pageSize } = pageInfo;
          if (!!pageSize)
            url.searchParams.append("pageSize", pageSize.toString());
          if (!!pageOffset)
            url.searchParams.append("pageOffset", pageOffset.toString());
        }

        const expression = cleanExpression(expressionWithUuids);

        return httpPostJsonResponse(url.href, {
          body: JSON.stringify(expression),
        });
      },
      [stroomBaseServiceUrl, httpPostJsonResponse],
    ),
  };
};

export default useApi;
