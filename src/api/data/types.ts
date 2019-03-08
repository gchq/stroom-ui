import { AbstractFetchDataResult, DataSourceType, DataRow } from "../../types";
import { StateById } from "../../lib/redux-actions-ts";

export interface StoreStatePerId {
  streamAttributeMaps?: Array<DataRow>;
  total?: number;
  pageSize?: number;
  pageOffset?: number;
  selectedRow?: number;
  dataForSelectedRow?: AbstractFetchDataResult;
  detailsForSelectedRow?: DataRow;
  dataSource?: DataSourceType;
}

export interface StoreState extends StateById<StoreStatePerId> {}