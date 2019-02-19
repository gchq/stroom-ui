import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";
import { actionCreators } from "./redux";
import useHttpClient from "../../lib/useHttpClient/useHttpClient";
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
  const httpClient = useHttpClient();

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

      httpClient.httpGet(
        url.href,
        response => {
          response.json().then((data: StreamAttributeMapResult) => {
            if (addResults) {
              store.dispatch(
                actionCreators.add(
                  dataViewerId,
                  data.streamAttributeMaps,
                  data.pageResponse.total,
                  pageSize,
                  pageOffset
                )
              );
            } else {
              store.dispatch(
                actionCreators.updateStreamAttributeMaps(
                  dataViewerId,
                  data.streamAttributeMaps,
                  data.pageResponse.total,
                  pageSize,
                  pageOffset
                )
              );
            }
          });
        },
        {},
        true
      );
    },
    []
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

      httpClient.httpPost(
        url,
        response => {
          response.json().then((data: StreamAttributeMapResult) => {
            if (addResults) {
              store.dispatch(
                actionCreators.add(
                  dataViewerId,
                  data.streamAttributeMaps,
                  data.pageResponse.total,
                  pageSize,
                  pageOffset
                )
              );
            } else {
              store.dispatch(
                actionCreators.updateStreamAttributeMaps(
                  dataViewerId,
                  data.streamAttributeMaps,
                  data.pageResponse.total,
                  pageSize,
                  pageOffset
                )
              );
            }
          });
        },
        {
          body: JSON.stringify(expression)
        }
      );
    },
    []
  );

  const fetchDataSource = useCallback((dataViewerId: string) => {
    const state = store.getState();
    const url = `${
      state.config.values.stroomBaseServiceUrl
    }/streamattributemap/v1/dataSource`;

    httpClient.httpGet(
      url,
      response => {
        response.json().then((data: DataSourceType) => {
          store.dispatch(actionCreators.updateDataSource(dataViewerId, data));
        });
      },
      {},
      true
    );
  }, []);
  const getDetailsForSelectedRow = useCallback((dataViewerId: string) => {
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

    httpClient.httpGet(
      url,
      response => {
        response.json().then((data: DataRow) => {
          store.dispatch(
            actionCreators.updateDetailsForSelectedRow(dataViewerId, data)
          );
        });
      },
      {},
      true
    );
  }, []);

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
