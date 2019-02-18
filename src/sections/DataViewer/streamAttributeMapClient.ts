import { actionCreators } from "./redux";
import { wrappedGet, wrappedPost } from "../../lib/fetchTracker.redux";
import {
  ExpressionOperatorType,
  DataSourceType,
  ExpressionOperatorWithUuid,
  ExpressionHasUuid
} from "../../types";
import { Dispatch } from "redux";
import { DataRow, StreamAttributeMapResult } from "./types";
import { GlobalStoreState } from "../../startup/reducers";
import useThunk from "../../lib/useThunk";

export const search = (
  dataViewerId: string,
  pageOffset: number,
  pageSize: number,
  addResults?: boolean
) => (dispatch: Dispatch, getState: () => GlobalStoreState) => {
  const state = getState();

  var url = new URL(
    `${state.config.values.stroomBaseServiceUrl}/streamattributemap/v1`
  );
  if (!!pageSize) url.searchParams.append("pageSize", pageSize.toString());
  if (!!pageOffset)
    url.searchParams.append("pageOffset", pageOffset.toString());

  wrappedGet(
    dispatch,
    state,
    url.href,
    response => {
      response.json().then((data: StreamAttributeMapResult) => {
        if (addResults) {
          dispatch(
            actionCreators.add(
              dataViewerId,
              data.streamAttributeMaps,
              data.pageResponse.total,
              pageSize,
              pageOffset
            )
          );
        } else {
          dispatch(
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
};
export const useSearch = () => useThunk(search);

export const searchWithExpression = (
  dataViewerId: string,
  pageOffset: number = 0,
  pageSize: number = 10,
  expressionWithUuids: ExpressionOperatorWithUuid,
  addResults?: boolean
) => (dispatch: Dispatch, getState: () => GlobalStoreState) => {
  const state = getState();

  const expression = cleanExpression(expressionWithUuids);

  let url = `${
    state.config.values.stroomBaseServiceUrl
  }/streamattributemap/v1/?`;
  url += `pageSize=${pageSize}`;
  url += `&pageOffset=${pageOffset}`;

  wrappedPost(
    dispatch,
    state,
    url,
    response => {
      response.json().then((data: StreamAttributeMapResult) => {
        if (addResults) {
          dispatch(
            actionCreators.add(
              dataViewerId,
              data.streamAttributeMaps,
              data.pageResponse.total,
              pageSize,
              pageOffset
            )
          );
        } else {
          dispatch(
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
};
export const useSearchWithExpression = () => useThunk(searchWithExpression);

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

export const fetchDataSource = (dataViewerId: string) => (
  dispatch: Dispatch,
  getState: () => GlobalStoreState
) => {
  const state = getState();
  const url = `${
    state.config.values.stroomBaseServiceUrl
  }/streamattributemap/v1/dataSource`;

  wrappedGet(
    dispatch,
    state,
    url,
    response => {
      response.json().then((data: DataSourceType) => {
        dispatch(actionCreators.updateDataSource(dataViewerId, data));
      });
    },
    {},
    true
  );
};
export const useFetchDataSource = () => useThunk(fetchDataSource);

export const getDetailsForSelectedRow = (dataViewerId: string) => (
  dispatch: Dispatch,
  getState: () => GlobalStoreState
) => {
  const state = getState();
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

  wrappedGet(
    dispatch,
    state,
    url,
    response => {
      response.json().then((data: DataRow) => {
        dispatch(
          actionCreators.updateDetailsForSelectedRow(dataViewerId, data)
        );
      });
    },
    {},
    true
  );
};
export const useGetDetailsForSelectedRow = () =>
  useThunk(getDetailsForSelectedRow);
