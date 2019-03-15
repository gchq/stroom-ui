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
import { useEffect, useState } from "react";
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
  const [expression, setExpression] = useState<
    ExpressionOperatorWithUuid | undefined
  >(undefined);
  const { search, searchWithExpression, streams } = useStreamSearch();

  useEffect(() => {
    search({ pageInfo: defaultPageRequest });
  }, [search]);

  const { tableProps } = useSelectableReactTable<DataRow>(
    {
      items: streams.streamAttributeMaps,
      getKey: d => `${d.data.id}`
    },
    {
      columns: COLUMNS
    }
  );

  return (
    <React.Fragment>
      <div className="content-tabs__grid">
        <div className="data-viewer__header">
          <IconHeader icon="database" text="Data" />
          <ExpressionSearchBar
            className="data-viewer__search-bar"
            dataSource={dataSource}
            expression={expression}
            onExpressionChange={setExpression}
            onSearch={e => {
              if (!!expression) {
                searchWithExpression({
                  expressionWithUuids: expression,
                  pageInfo: defaultPageRequest
                });
              } else {
                console.error("No expression present to search with");
              }
            }}
          />
        </div>
      </div>
      <div className="DataTable__container">
        <div className="DataTable__reactTable__container">
          <ReactTable {...tableProps} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DataViewer;
