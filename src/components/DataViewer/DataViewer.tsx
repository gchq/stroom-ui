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
import ReactTable, { Column } from "react-table";

import {
  useStreamSearch,
  useStreamDataSource,
} from "components/DataViewer/api/streamAttributeMap";
import {
  useSelectableReactTable,
  SelectionBehaviour,
} from "lib/useSelectableItemListing";
import IconHeader from "../IconHeader";
import ExpressionSearchBar from "../ExpressionSearchBar";
import HorizontalMainDetails from "../HorizontalMainDetails";
import DetailsTabs from "./DetailsTabs";
import { ExpressionOperatorType } from "../ExpressionBuilder/types";
import { DataRow, PageRequest } from "./types";

const COLUMNS: Column[] = [
  {
    id: "id",
    Header: "ID",
    accessor: (u: DataRow) => u && u.meta && u.meta.id,
  },
  {
    id: "feedName",
    Header: "Feed",
    accessor: (u: DataRow) => u && u.meta && u.meta.feedName,
  },
];

const defaultPageRequest: PageRequest = {
  pageOffset: 0,
  pageSize: 10,
};

const DataViewer = () => {
  const dataSource = useStreamDataSource();
  const { streams, search } = useStreamSearch();

  const { tableProps, selectedItem, clearSelection } = useSelectableReactTable<
    DataRow
  >(
    {
      items: !!streams ? streams.streamAttributeMaps : [],
      getKey: React.useCallback(
        d => `${(d && d.meta && d.meta.id) || "none"}`,
        [],
      ),
      selectionBehaviour: SelectionBehaviour.SINGLE,
    },
    {
      columns: COLUMNS,
    },
  );

  // The expression search bar will call this on mount
  const onSearch = React.useCallback(
    (expression: ExpressionOperatorType) => {
      search(expression, defaultPageRequest);
    },
    [search],
  );

  return (
    <div className="page">
      <div className="page__header">
        <IconHeader icon="database" text="Data" />
      </div>
      <div className="page__search">
        <ExpressionSearchBar
          // className="data-viewer__search-bar"
          dataSource={dataSource}
          onSearch={onSearch}
        />
      </div>
      <div className="page__body">
        <HorizontalMainDetails
          storageKey="dataViewer"
          title=""
          onClose={clearSelection}
          isOpen={true}
          mainContent={
            <div className="fill-space" tabIndex={0}>
              <ReactTable
                className="tracker-table border-color -striped -highlight"
                {...tableProps}
              />
            </div>
          }
          detailContent={
            !!selectedItem ? (
              <DetailsTabs data={selectedItem} />
            ) : (
              <div>Please Select a Single Row</div>
            )
          }
        />
      </div>
    </div>
  );
};

export default DataViewer;
