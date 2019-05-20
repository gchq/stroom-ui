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

import {
  useStreamSearch,
  useStreamDataSource,
} from "components/StreamBrowser/api";
import IconHeader from "../IconHeader";
import ExpressionSearchBar from "../ExpressionSearchBar";
import HorizontalMainDetails from "../HorizontalMainDetails";
import StreamDetailTabs from "./StreamDetailTabs";
import { ExpressionOperatorType } from "../ExpressionBuilder/types";
import { PageRequest } from "./types";
import StreamTable, { useTable } from "./StreamTable";

const defaultPageRequest: PageRequest = {
  pageOffset: 0,
  pageSize: 10,
};

const StreamBrowser = () => {
  const dataSource = useStreamDataSource();
  const { streams, search } = useStreamSearch();

  // The expression search bar will call this on mount
  const onSearch = React.useCallback(
    (expression: ExpressionOperatorType) => {
      search(expression, defaultPageRequest);
    },
    [search],
  );

  const tableProps = useTable(streams);
  const { clearSelection, selectedItem } = tableProps;

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
          mainContent={<StreamTable {...tableProps} />}
          detailContent={
            !!selectedItem ? (
              <StreamDetailTabs data={selectedItem} />
            ) : (
              <div>Please Select a Single Row</div>
            )
          }
        />
      </div>
    </div>
  );
};

export default StreamBrowser;
