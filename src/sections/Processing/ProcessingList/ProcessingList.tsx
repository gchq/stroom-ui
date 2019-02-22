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
import { useEffect } from "react";
import { path } from "ramda";
import * as Mousetrap from "mousetrap";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import ReactTable, { RowInfo, SortingRule } from "react-table";
import "react-table/react-table.css";

import Button from "../../../components/Button";
import {
  useActionCreators,
  Directions,
  SortByOptions,
  sortByFromString
} from "../redux";
import useApi from "../useStreamTasksApi";
import { StreamTaskType } from "../../../types";
import useReduxState from "../../../lib/useReduxState";

interface Props {
  onSelection: (filterId: number, trackers: Array<StreamTaskType>) => void;
}

const ProcessingList = ({ onSelection }: Props) => {
  const api = useApi();
  const actionCreators = useActionCreators();

  const {
    trackers,
    selectedTrackerId,
    pageSize,
    totalTrackers
  } = useReduxState(
    ({
      processing: {
        trackers,
        sortBy,
        sortDirection,
        selectedTrackerId,
        pageSize,
        totalTrackers
      }
    }) => ({
      trackers,
      sortBy,
      sortDirection,
      selectedTrackerId,
      pageSize,
      totalTrackers
    })
  );

  const onMoveSelection = (direction: Directions) => {
    const currentIndex = trackers.findIndex(
      (tracker: StreamTaskType) => tracker.filterId === selectedTrackerId
    );
    const isAtEndOfList = currentIndex === trackers.length - 1;
    const isAtEndOfEverything = currentIndex === totalTrackers - 1;
    if (isAtEndOfList && !isAtEndOfEverything) {
      api.fetchMore();
    } else {
      actionCreators.moveSelection(direction);
    }
  };
  const onHandleSort = (sort: SortingRule) => {
    if (sort !== undefined) {
      const direction = sort.desc
        ? Directions.descending
        : Directions.ascending;
      const sortBy: SortByOptions = sortByFromString(sort.id);
      actionCreators.updateSort(sortBy, direction);
      api.fetchTrackers();
    }
  };
  const onHandleLoadMoreRows = () => {
    api.fetchMore();
  };

  // We add an empty 'load more' row, but we need to make sure it's not there when we re-render.
  const trackersFiltered = trackers.filter(
    (tracker: StreamTaskType) => tracker.filterId !== undefined
  );
  const allRecordsRetrieved = totalTrackers === trackers.length;

  const retrievalStave = allRecordsRetrieved
    ? "All rows loaded"
    : "Load more rows";

  const tableData = trackersFiltered.map(
    ({ filterId, priority, trackerPercent }: StreamTaskType) => ({
      filterId,
      pipelineName: "TODO: awaiting backend re-write. Sorting broken too.",
      priority,
      progress: trackerPercent
    })
  );

  const tableColumns = [
    {
      Header: "",
      accessor: "filterId",
      show: false
    },
    {
      Header: "Pipeline name",
      accessor: "pipelineName",
      Cell: (row: RowInfo) =>
        row.original.filterId ? row.original.pipelineName : undefined
    },
    {
      Header: "Priority",
      accessor: "priority",
      Cell: (row: RowInfo) =>
        row.original.filterId ? (
          row.original.priority
        ) : (
          <Button
            disabled={allRecordsRetrieved}
            className="border hoverable processing-list__load-more-button"
            onClick={() => onHandleLoadMoreRows()}
            text={retrievalStave}
          />
        )
    },
    {
      Header: "Progress",
      accessor: "progress",
      Cell: (row: RowInfo) =>
        row.original.filterId ? (
          <Progress
            percent={row.original.progress}
            symbolClassName="flat-text"
          />
        ) : (
          undefined
        )
    }
  ];

  useEffect(() => {
    Mousetrap.bind("up", () => onMoveSelection(Directions.ascending));
    Mousetrap.bind("down", () => onMoveSelection(Directions.descending));

    return () => {
      Mousetrap.unbind("up");
      Mousetrap.unbind("down");
    };
  }, []);

  return (
    <ReactTable
      manual
      className="table__reactTable"
      sortable
      showPagination={false}
      pageSize={pageSize + 1}
      data={tableData}
      columns={tableColumns}
      onFetchData={(state, instance) => onHandleSort(state.sorted[0])}
      getTdProps={(_: any, rowInfo: RowInfo) => ({
        onClick: (_: any, handleOriginal: () => void) => {
          if (rowInfo !== undefined) {
            onSelection(rowInfo.original.filterId, trackers);
          }

          // IMPORTANT! React-Table uses onClick internally to trigger
          // events like expanding SubComponents and pivots.
          // By default a custom 'onClick' handler will override this functionality.
          // If you want to fire the original onClick handler, call the
          // 'handleOriginal' function.
          if (handleOriginal) {
            handleOriginal();
          }
        }
      })}
      getTrProps={(_: any, rowInfo: RowInfo) => {
        // We don't want to see a hover on a row without data.
        // If a row is selected we want to see the selected color.
        const isSelected =
          selectedTrackerId !== undefined &&
          path(["original", "filterId"], rowInfo) === selectedTrackerId;
        const hasData = path(["original", "filterId"], rowInfo) !== undefined;
        let className;
        if (hasData) {
          className = isSelected ? "selected hoverable" : "hoverable";
        }
        return {
          className
        };
      }}
    />
  );
};

export default ProcessingList;
