import { useCallback } from "react";
import useHttpClient from "src/lib/useHttpClient";
import {
  ExpressionOperatorType,
  DataSourceType,
  ExpressionOperatorWithUuid,
  ExpressionHasUuid,
  DataRow,
  StreamAttributeMapResult
} from "src/types";
import { useConfig } from "src/startup/config";
import { SearchWithExpressionProps, PageProps } from "./types";

interface Api {
  page: (props: PageProps) => Promise<StreamAttributeMapResult>;
  search: (
    props: SearchWithExpressionProps
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
          false
        ),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    getDetailsForSelectedStream: useCallback(
      (metaId: number) =>
        httpGetJson(
          `${stroomBaseServiceUrl}/streamattributemap/v1/${metaId}`,
          {},
          false
        ),
      [stroomBaseServiceUrl, httpGetJson]
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
      [stroomBaseServiceUrl, httpGetJson]
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
          body: JSON.stringify(expression)
        });
      },
      [stroomBaseServiceUrl, httpPostJsonResponse]
    )
  };
};

/**
 * TODO: shouldn't actually have to use this -- ideally the ExpressionBuilder would
 * generate JSON compatible with the resource's endpoints. I.e. jackson binding
 * fails if we have these uuids.
 */
const cleanExpression = (
  expression: ExpressionOperatorWithUuid
): ExpressionOperatorType => {
  // UUIDs are not part of Expression
  delete expression.uuid;
  expression.children!.forEach((child: ExpressionHasUuid) => {
    delete child.uuid;
  });

  // Occasionally the ExpressionBuilder will put a value on the root, which is wrong.
  // It does this when there's an underscore in the term, e.g. feedName=thing_thing.
  //delete expression.value; // TODO oh rly?
  return expression;
};

export default useApi;
