import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";
import { useActionCreators } from "./redux";
import useHttpClient from "../../lib/useHttpClient";
import {
  ExpressionOperatorType,
  DataSourceType,
  ExpressionOperatorWithUuid,
  ExpressionHasUuid
} from "../../types";
import { DataRow, StreamAttributeMapResult } from "./types";

export interface Api {
  search: (
    dataViewerId: string,
    pageOffset: number,
    pageSize: number,
    addResults?: boolean
  ) => void;
  searchWithExpression: (
    dataViewerId: string,
    expressionWithUuids: ExpressionOperatorWithUuid,
    pageOffset?: number,
    pageSize?: number,
    addResults?: boolean
  ) => void;
  fetchDataSource: (dataViewerId: string) => void;
  getDetailsForSelectedRow: (dataViewerId: string) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const { httpGetJson, httpPostJsonResponse } = useHttpClient();
  const {
    add,
    updateStreamAttributeMaps,
    updateDataSource,
    updateDetailsForSelectedRow
  } = useActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const search = useCallback(
    (
      dataViewerId: string,
      pageOffset: number,
      pageSize: number,
      addResults?: boolean
    ) => {
      const state = store.getState();
      var url = new URL(
        `${state.config.values.stroomBaseServiceUrl}/streamattributemap/v1`
      );
      if (!!pageSize) url.searchParams.append("pageSize", pageSize.toString());
      if (!!pageOffset)
        url.searchParams.append("pageOffset", pageOffset.toString());

      httpGetJson(url.href, {}, true).then((data: StreamAttributeMapResult) => {
        if (addResults) {
          add(
            dataViewerId,
            data.streamAttributeMaps,
            data.pageResponse.total,
            pageSize,
            pageOffset
          );
        } else {
          updateStreamAttributeMaps(
            dataViewerId,
            data.streamAttributeMaps,
            data.pageResponse.total,
            pageSize,
            pageOffset
          );
        }
      });
    },
    [httpGetJson, add, updateStreamAttributeMaps]
  );
  const searchWithExpression = useCallback(
    (
      dataViewerId: string,
      expressionWithUuids: ExpressionOperatorWithUuid,
      pageOffset: number = 0,
      pageSize: number = 10,
      addResults?: boolean
    ) => {
      const state = store.getState();
      const expression = cleanExpression(expressionWithUuids);

      let url = `${
        state.config.values.stroomBaseServiceUrl
      }/streamattributemap/v1/?`;
      url += `pageSize=${pageSize}`;
      url += `&pageOffset=${pageOffset}`;

      httpPostJsonResponse(url, {
        body: JSON.stringify(expression)
      }).then((data: StreamAttributeMapResult) => {
        if (addResults) {
          add(
            dataViewerId,
            data.streamAttributeMaps,
            data.pageResponse.total,
            pageSize,
            pageOffset
          );
        } else {
          updateStreamAttributeMaps(
            dataViewerId,
            data.streamAttributeMaps,
            data.pageResponse.total,
            pageSize,
            pageOffset
          );
        }
      });
    },
    [httpPostJsonResponse, add, updateStreamAttributeMaps]
  );

  const fetchDataSource = useCallback(
    (dataViewerId: string) => {
      const state = store.getState();
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/streamattributemap/v1/dataSource`;

      httpGetJson(url, {}, true).then((data: DataSourceType) =>
        updateDataSource(dataViewerId, data)
      );
    },
    [httpGetJson, updateDataSource]
  );
  const getDetailsForSelectedRow = useCallback(
    (dataViewerId: string) => {
      const state = store.getState();
      const dataView = state.dataViewers[dataViewerId];
      const metaId =
        dataView.streamAttributeMaps &&
        dataView.selectedRow &&
        dataView.streamAttributeMaps[dataView.selectedRow]
          ? dataView.streamAttributeMaps[dataView.selectedRow]!.data.id
          : undefined;
      const url = `${
        state.config.values.stroomBaseServiceUrl
      }/streamattributemap/v1/${metaId}`;

      httpGetJson(url, {}, true).then((data: DataRow) =>
        updateDetailsForSelectedRow(dataViewerId, data)
      );
    },
    [httpGetJson, updateDetailsForSelectedRow]
  );

  return {
    fetchDataSource,
    getDetailsForSelectedRow,
    search,
    searchWithExpression
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
