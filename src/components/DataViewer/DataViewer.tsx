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

import * as React from "react";
import { useCallback } from "react";
import ReactTable, { Column } from "react-table";

import {
  useStreamSearch,
  useStreamDataSource
} from "../../api/streamAttributeMap";
import { useSelectableReactTable } from "../../lib/useSelectableItemListing";
import { DataRow, PageRequest, ExpressionOperatorWithUuid } from "../../types";
import IconHeader from "../IconHeader";
import ExpressionSearchBar from "../ExpressionSearchBar";

const COLUMNS: Array<Column> = [
  {
    id: "id",
    Header: "ID",
    accessor: (u: DataRow) => u.data.id
  },
  {
    id: "feedName",
    Header: "Feed",
    accessor: (u: DataRow) => u.data.feedName
  }
];

const defaultPageRequest: PageRequest = {
  pageOffset: 0,
  pageSize: 10
};

const DataViewer = () => {
  const dataSource = useStreamDataSource();
  const { streams, search } = useStreamSearch();

  const { tableProps } = useSelectableReactTable<DataRow>(
    {
      items: !!streams ? streams.streamAttributeMaps : [],
      getKey: d => `${d.data.id}`
    },
    {
      columns: COLUMNS
    }
  );

  // The expression search bar will call this on mount
  const onSearch = useCallback(
    (expression: ExpressionOperatorWithUuid) => {
      search({
        expressionWithUuids: expression,
        pageInfo: defaultPageRequest
      });
    },
    [search]
  );

  return (
    <div>
      <IconHeader icon="database" text="Data" />
      <ExpressionSearchBar
        className="data-viewer__search-bar"
        dataSource={dataSource}
        onSearch={onSearch}
      />
      <ReactTable {...tableProps} />
    </div>
  );
};

export default DataViewer;
