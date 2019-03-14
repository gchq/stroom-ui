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

export interface FetchDataParams {
  metaId?: number;
  pageSize: number;
  pageOffset: number;
}

export interface PagedData {
  streamAttributeMaps: Array<DataRow>;
  total: number;
}

export interface UseData {
  pagedData: PagedData;
  updatePagedData: (updates: Partial<PagedData>) => void;
  fetchParams: FetchDataParams;
  updateFetchParams: (updates: Partial<FetchDataParams>) => void;
  getDataForSelectedRow: () => void;
}

export interface StoreState extends StateById<StoreStatePerId> {}
