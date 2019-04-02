import * as React from "react";
import { DataSourceType, DataRow, StreamAttributeMapResult } from "src/types";
import useHttpClient from "src/lib/useHttpClient";
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
    fetchDataSource: React.useCallback(
      () =>
        httpGetJson(
          `${stroomBaseServiceUrl}/streamattributemap/v1/dataSource`,
          {},
          false,
        ),
      [stroomBaseServiceUrl, httpGetJson],
    ),
    getDetailsForSelectedStream: React.useCallback(
      (metaId: number) =>
        httpGetJson(
          `${stroomBaseServiceUrl}/streamattributemap/v1/${metaId}`,
          {},
          false,
        ),
      [stroomBaseServiceUrl, httpGetJson],
    ),
    page: React.useCallback(
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
    search: React.useCallback(
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
