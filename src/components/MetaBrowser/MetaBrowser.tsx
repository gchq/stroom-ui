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

import PanelGroup, { PanelWidth } from "react-panelgroup";
import {
  useStreamSearch,
  useStreamDataSource,
} from "components/MetaBrowser/api";
import IconHeader from "../IconHeader";
import ExpressionSearchBar from "../ExpressionSearchBar";
import MetaDetailTabs from "./MetaDetailTabs";
import { ExpressionOperatorType } from "../ExpressionBuilder/types";
import { PageRequest } from "./types";
import MetaTable, { useTable } from "./MetaTable";
import useLocalStorage, { useStoreObjectFactory } from "lib/useLocalStorage";

const defaultPageRequest: PageRequest = {
  pageOffset: 0,
  pageSize: 10,
};

const defaultPanelWidths: PanelWidth[] = [
  {
    resize: "dynamic",
    minSize: 100,
    size: 150,
  },
  {
    resize: "dynamic",
    minSize: 100,
    size: 150,
  },
];

const MetaBrowser = () => {
  const dataSource = useStreamDataSource();
  const { streams, search } = useStreamSearch();

  // The expression search bar will call this on mount
  const onSearch = React.useCallback(
    (expression: ExpressionOperatorType) => {
      search(expression, defaultPageRequest);
    },
    [search],
  );

  const {
    value: panelWidths,
    reduceValue: reducePanelWidths,
  } = useLocalStorage<PanelWidth[]>(
    "metaBrowserPanels",
    defaultPanelWidths,
    useStoreObjectFactory(),
  );

  const onPanelUpdate = React.useCallback(
    (panelWidths: any[]) => {
      reducePanelWidths(() => panelWidths as PanelWidth[]);
    },
    [reducePanelWidths],
  );

  const tableProps = useTable(streams);
  const { selectedItem } = tableProps;

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
        <PanelGroup
          direction="column"
          panelWidths={panelWidths}
          onUpdate={onPanelUpdate}
        >
          <MetaTable {...tableProps} />
          {!!selectedItem ? (
            <MetaDetailTabs data={selectedItem} />
          ) : (
            <div>Please Select a Single Row</div>
          )}
        </PanelGroup>
      </div>
    </div>
  );
};

export default MetaBrowser;
