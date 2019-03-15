import { useCallback } from "react";
import useHttpClient from "../useHttpClient";
import {
  ExpressionOperatorType,
  DataSourceType,
  ExpressionOperatorWithUuid,
  ExpressionHasUuid,
  DataRow,
  StreamAttributeMapResult
} from "../../types";
import { useConfig } from "../../startup/config";
import { SearchProps, SearchWithExpressionProps } from "./types";

interface Api {
  search: (props: SearchProps) => Promise<StreamAttributeMapResult>;
  searchWithExpression: (
    props: SearchWithExpressionProps
  ) => Promise<StreamAttributeMapResult>;
  fetchDataSource: () => Promise<DataSourceType>;
  getDetailsForSelectedRow: (metaId: number) => Promise<DataRow>;
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
    getDetailsForSelectedRow: useCallback(
      (metaId: number) =>
        httpGetJson(
          `${stroomBaseServiceUrl}/streamattributemap/v1/${metaId}`,
          {},
          false
        ),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    search: useCallback(
      ({ pageInfo: { pageOffset, pageSize } }: SearchProps) => {
        var url = new URL(`${stroomBaseServiceUrl}/streamattributemap/v1`);
        if (!!pageSize)
          url.searchParams.append("pageSize", pageSize.toString());
        if (!!pageOffset)
          url.searchParams.append("pageOffset", pageOffset.toString());

        return httpGetJson(url.href);
      },
      [stroomBaseServiceUrl, httpGetJson]
    ),
    searchWithExpression: useCallback(
      ({
        pageInfo: { pageOffset, pageSize },
        expressionWithUuids
      }: SearchWithExpressionProps) => {
        const expression = cleanExpression(expressionWithUuids);

        let url = `${stroomBaseServiceUrl}/streamattributemap/v1/?`;
        url += `pageSize=${pageSize}`;
        url += `&pageOffset=${pageOffset}`;

        return httpPostJsonResponse(url, {
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
