/*
 * Copyright 2018 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Action } from "redux";

import {
  prepareReducerById,
  ActionId,
  genUseActionCreators
} from "../../lib/redux-actions-ts";
import { AbstractFetchDataResult, DataSourceType, DataRow } from "../../types";
import { StoreStatePerId } from "./types";

const ADD = "ADD";
const UPDATE_STREAM_ATTRIBUTE_MAPS = "UPDATE_STREAM_ATTRIBUTE_MAPS";
const SELECT_ROW = "SELECT_ROW";
const DESELECT_ROW = "DESELECT_ROW";
const UPDATE_DATA_FOR_SELECTED_ROW = "UPDATE_DATA_FOR_SELECTED_ROW";
const UPDATE_DETAILS_FOR_SELECTED_ROW = "UPDATE_DETAILS_FOR_SELECTED_ROW";
const UPDATE_DATA_SOURCE = "UPDATE_DATA_SOURCE";

interface StreamAttributesMapAction extends ActionId {
  streamAttributeMaps: Array<DataRow>;
  total: number;
  pageSize: number;
  pageOffset: number;
}

interface AddAction extends Action<"ADD">, StreamAttributesMapAction {}

interface UpdateStreamAttributeMapsAction
  extends Action<"UPDATE_STREAM_ATTRIBUTE_MAPS">,
    StreamAttributesMapAction {}

interface RowAction extends ActionId {
  selectedRow?: number;
}

interface SelectRowAction extends Action<"SELECT_ROW">, RowAction {}
interface DeselectRowAction extends Action<"DESELECT_ROW">, RowAction {}

interface UpdateDataForSelectedRowAction
  extends Action<"UPDATE_DATA_FOR_SELECTED_ROW">,
    ActionId {
  dataForSelectedRow: AbstractFetchDataResult;
}
interface UpdateDetailsForSelectedRowAction
  extends Action<"UPDATE_DETAILS_FOR_SELECTED_ROW">,
    ActionId {
  detailsForSelectedRow: DataRow;
}
interface UpdateDataSourceAction
  extends Action<"UPDATE_DATA_SOURCE">,
    ActionId {
  dataSource: DataSourceType;
}

export const useActionCreators = genUseActionCreators({
  add: (
    id: string,
    streamAttributeMaps: Array<DataRow>,
    total: number,
    pageSize: number,
    pageOffset: number
  ): AddAction => ({
    type: ADD,
    id,
    streamAttributeMaps,
    total,
    pageSize,
    pageOffset
  }),
  updateStreamAttributeMaps: (
    id: string,
    streamAttributeMaps: Array<DataRow>,
    total: number,
    pageSize: number,
    pageOffset: number
  ): UpdateStreamAttributeMapsAction => ({
    type: UPDATE_STREAM_ATTRIBUTE_MAPS,
    id,
    streamAttributeMaps,
    total,
    pageSize,
    pageOffset
  }),
  selectRow: (id: string, selectedRow: number): SelectRowAction => ({
    type: SELECT_ROW,
    id,
    selectedRow
  }),
  deselectRow: (id: string): DeselectRowAction => ({
    type: DESELECT_ROW,
    id,
    selectedRow: undefined
  }),
  updateDataForSelectedRow: (
    id: string,
    dataForSelectedRow: AbstractFetchDataResult
  ): UpdateDataForSelectedRowAction => ({
    type: UPDATE_DATA_FOR_SELECTED_ROW,
    id,
    dataForSelectedRow
  }),
  updateDetailsForSelectedRow: (
    id: string,
    detailsForSelectedRow: DataRow
  ): UpdateDetailsForSelectedRowAction => ({
    type: UPDATE_DETAILS_FOR_SELECTED_ROW,
    id,
    detailsForSelectedRow
  }),
  updateDataSource: (
    id: string,
    dataSource: DataSourceType
  ): UpdateDataSourceAction => ({
    type: UPDATE_DATA_SOURCE,
    id,
    dataSource
  })
});

export const defaultStatePerId: StoreStatePerId = {
  pageOffset: 0,
  pageSize: 20
};

export const reducer = prepareReducerById(defaultStatePerId)
  .handleActions<StreamAttributesMapAction>(
    [ADD, UPDATE_STREAM_ATTRIBUTE_MAPS],
    (
      state = defaultStatePerId,
      { streamAttributeMaps, total, pageSize, pageOffset }
    ) => ({ ...state, streamAttributeMaps, total, pageSize, pageOffset })
  )
  .handleActions<RowAction>(
    [SELECT_ROW, DESELECT_ROW],
    (state = defaultStatePerId, { selectedRow }) => ({
      ...state,
      selectedRow
    })
  )
  .handleAction<UpdateDataForSelectedRowAction>(
    UPDATE_DATA_FOR_SELECTED_ROW,
    (state = defaultStatePerId, { dataForSelectedRow }) => ({
      ...state,
      dataForSelectedRow
    })
  )
  .handleAction<UpdateDetailsForSelectedRowAction>(
    UPDATE_DETAILS_FOR_SELECTED_ROW,
    (state = defaultStatePerId, { detailsForSelectedRow }) => ({
      ...state,
      detailsForSelectedRow
    })
  )
  .handleAction<UpdateDataSourceAction>(
    UPDATE_DATA_SOURCE,
    (state = defaultStatePerId, { dataSource }) => ({
      ...state,
      dataSource
    })
  )
  .getReducer();
