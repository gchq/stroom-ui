import * as React from "react";
import useHttpClient from "src/lib/useHttpClient";
import { useConfig } from "src/startup/config";
import cleanExpression from "./cleanExpression";
import {
  DataSourceType,
  ExpressionOperatorType,
  ExpressionOperatorWithUuid,
} from "src/components/ExpressionBuilder/types";
import { StreamAttributeMapResult, PageRequest, DataRow } from "../../types";

interface Api {
  page: (props: PageRequest) => Promise<StreamAttributeMapResult>;
  search: (
    expression: ExpressionOperatorType,
    page: PageRequest,
  ) => Promise<StreamAttributeMapResult>;
  fetchDataSource: () => Promise<DataSourceType>;
  getDetailsForSelectedStream: (metaId: number) => Promise<DataRow>;
}

export const useApi = (): Api => {
  const { stroomBaseServiceUrl } = useConfig();
  const { httpGetJson, httpPostJsonResponse } = useHttpClient();

  const getPageUrl = React.useCallback(
    (pageInfo: PageRequest) => {
      var url = new URL(`${stroomBaseServiceUrl}/streamattributemap/v1/`);

      if (!!pageInfo) {
        const { pageOffset, pageSize } = pageInfo;
        if (pageSize !== undefined)
          url.searchParams.append("pageSize", pageSize.toString());
        if (pageOffset !== undefined)
          url.searchParams.append("pageOffset", pageOffset.toString());
      }
      return url.href;
    },
    [stroomBaseServiceUrl],
  );

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
      (pageInfo: PageRequest) => httpGetJson(getPageUrl(pageInfo)),
      [getPageUrl, httpGetJson],
    ),
    search: React.useCallback(
      (
        expressionWithUuids: ExpressionOperatorWithUuid,
        pageInfo: PageRequest,
      ) =>
        httpPostJsonResponse(getPageUrl(pageInfo), {
          body: JSON.stringify(cleanExpression(expressionWithUuids)),
        }),
      [getPageUrl, httpPostJsonResponse],
    ),
  };
};

export default useApi;
