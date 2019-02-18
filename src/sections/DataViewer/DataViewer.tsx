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
import PanelGroup from "react-panelgroup";
import HorizontalPanel from "../../components/HorizontalPanel";
import * as Mousetrap from "mousetrap";
import { useDispatch } from "redux-react-hook";
import "react-table/react-table.css";

import Loader from "../../components/Loader";
import IconHeader from "../../components/IconHeader";
import ExpressionSearchBar from "../../components/ExpressionSearchBar";
import {
  useSearch,
  useGetDetailsForSelectedRow,
  useFetchDataSource,
  useSearchWithExpression
} from "./streamAttributeMapClient";
import { getDataForSelectedRow } from "./dataResourceClient";
import DetailsTabs from "./DetailsTabs";
import DataList from "./DataList/DataList";
import { actionCreators, defaultStatePerId } from "./redux";
import { Direction, ExpressionOperatorWithUuid } from "../../types";
import useLocalStorage, { storeNumber } from "../../lib/useLocalStorage";
import useReduxState from "../../lib/useReduxState";

export interface Props {
  dataViewerId: string;
}
const { selectRow, deselectRow } = actionCreators;

const DataViewer = ({
  dataViewerId
}: // onRowSelected,
// tableColumns,
// tableData

Props) => {
  const dispatch = useDispatch();
  const { dataViewers } = useReduxState(({ dataViewers }) => ({ dataViewers }));
  const {
    dataSource,
    streamAttributeMaps,
    pageSize,
    pageOffset,
    selectedRow = 0,
    dataForSelectedRow,
    detailsForSelectedRow
  } = dataViewers[dataViewerId] || defaultStatePerId;

  const search = useSearch();
  const getDetailsForSelectedRow = useGetDetailsForSelectedRow();
  const fetchDataSource = useFetchDataSource();
  const searchWithExpression = useSearchWithExpression();

  const onRowSelected = (selectedRow: number) => {
    dispatch(selectRow(dataViewerId, selectedRow));
    getDataForSelectedRow(dataViewerId);
    getDetailsForSelectedRow(dataViewerId);
  };
  // Not using this yet?
  // const onHandleLoadMoreRows = () => {
  //   searchWithExpression(dataViewerId, pageOffset, pageSize, dataViewerId);
  //   // TODO: need to search with expression too
  //   // search(dataViewerId, pageOffset + 1, pageSize, true);
  // };
  const onMoveSelection = (direction: Direction) => {
    if (!streamAttributeMaps) {
      console.error("Could not move selection, stream attribute maps is null");
      return;
    }

    const isAtEndOfList = selectedRow === streamAttributeMaps.length - 1;
    if (isAtEndOfList) {
      searchWithExpression(
        dataViewerId,
        pageOffset,
        pageSize,
        dataViewerId,
        true
      );
      // search(dataViewerId, pageOffset + 1, pageSize, dataViewerId, true);
    } else {
      if (direction === "down") {
        onRowSelected(selectedRow + 1);
      } else if (direction === "up") {
        onRowSelected(selectedRow - 1);
      }
    }
  };

  useEffect(() => {
    fetchDataSource(dataViewerId);

    // // We need to set up an expression so we've got something to search with,
    // // even though it'll be empty.
    // const { expressionChanged, expressionId, dataSource } = this.props;
    // const parsedExpression = processSearchString(dataSource, '');
    // expressionChanged(expressionId, parsedExpression.expression);

    // // If we're got a selectedRow that means the user has already been to this page.
    // // Re-doing the search will wipe out their previous location, and we want to remember it.
    if (!selectedRow) {
      // searchWithExpression(dataViewerId, pageOffset, pageSize, dataViewerId);
      search(dataViewerId, 0, 400);
    }

    Mousetrap.bind("up", () => onMoveSelection(Direction.UP));
    Mousetrap.bind("down", () => onMoveSelection(Direction.DOWN));

    return () => {
      Mousetrap.unbind("up");
      Mousetrap.unbind("down");
    };
  });

  const table = <DataList dataViewerId={dataViewerId} />;
  const { value: listHeight, setValue: setListHeight } = useLocalStorage(
    "listHeight",
    500,
    storeNumber
  );
  const { value: detailsHeight, setValue: setDetailsHeight } = useLocalStorage(
    "detailsHeight",
    500,
    storeNumber
  );
  const [expression, onExpressionChange] = useState<
    ExpressionOperatorWithUuid | undefined
  >(undefined);

  if (!dataSource) {
    return <Loader message="Loading data source" />;
  }

  const details = (
    <HorizontalPanel
      className="element-details__panel"
      title=""
      onClose={() => deselectRow(dataViewerId)}
      content={
        <DetailsTabs
          data={dataForSelectedRow}
          details={detailsForSelectedRow}
          dataViewerId={dataViewerId}
        />
      }
    />
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
            onExpressionChange={onExpressionChange}
            onSearch={e => {
              searchWithExpression(dataViewerId, pageOffset, pageSize, e);
            }}
          />
        </div>
      </div>
      <div className="DataTable__container">
        <div className="DataTable__reactTable__container">
          {selectedRow === undefined ? (
            table
          ) : (
            <PanelGroup
              direction="column"
              panelWidths={[
                {
                  resize: "dynamic",
                  minSize: 100,
                  size: listHeight
                },
                {
                  resize: "dynamic",
                  minSize: 100,
                  size: detailsHeight
                }
              ]}
              onUpdate={(panelWidths: any[]) => {
                setListHeight(panelWidths[0].size);
                setDetailsHeight(panelWidths[1].size);
              }}
            >
              {table}
              {details}
            </PanelGroup>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DataViewer;
