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
import { useCallback, useMemo, useEffect } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import ReactTable, { RowInfo, SortingRule } from "react-table";

import Button from "../../../components/Button";
import {
  Directions,
  SortByOptions,
  sortByFromString,
  UseStreamTasks
} from "../../../api/useStreamTasks/types";
import { StreamTaskType } from "../../../types";
import {
  useSelectableReactTable,
  SelectionBehaviour
} from "../../../lib/useSelectableItemListing";

interface Props {
  streamTasksApi: UseStreamTasks;
  onSelectionChanged: (selectedTask: StreamTaskType | undefined) => void;
}

const ProcessingList = ({ streamTasksApi, onSelectionChanged }: Props) => {
  const {
    pagedTrackerInfo: { trackers, totalTrackers },
    updateSort,
    fetchMore,
    fetchTrackers,
    fetchParameters: { pageSize }
  } = streamTasksApi;

  // We add an empty 'load more' row, but we need to make sure it's not there when we re-render.
  const allRecordsRetrieved = totalTrackers === trackers.length;

  const retrievalStave = allRecordsRetrieved
    ? "All rows loaded"
    : "Load more rows";

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
        row.original.filterId !== undefined
          ? row.original.pipelineName
          : "UNKNOWN"
    },
    {
      Header: "Priority",
      accessor: "priority",
      Cell: (row: RowInfo) =>
        row.original.filterId !== undefined ? (
          row.original.priority
        ) : (
          <Button
            disabled={allRecordsRetrieved}
            className="border hoverable processing-list__load-more-button"
            onClick={fetchMore}
            text={retrievalStave}
          />
        )
    },
    {
      Header: "Progress",
      accessor: "progress",
      Cell: (row: RowInfo) =>
        row.original.filterId !== undefined ? (
          <Progress
            percent={row.original.trackerPercent}
            symbolClassName="flat-text"
          />
        ) : (
          "UNKNOWN"
        )
    }
  ];

  const tableData = useMemo(
    () =>
      trackers.filter(
        (tracker: StreamTaskType) => tracker.filterId !== undefined
      ),
    [trackers]
  );

  const preFocusWrap = useCallback((): boolean => {
    if (totalTrackers === trackers.length) {
      return true;
    } else {
      fetchMore();
      return false;
    }
  }, [totalTrackers, trackers]);

  const { tableProps, selectedItem } = useSelectableReactTable<StreamTaskType>(
    {
      items: tableData,
      getKey: t => `${t.filterId}`,
      selectionBehaviour: SelectionBehaviour.SINGLE,
      preFocusWrap
    },
    {
      columns: tableColumns
    }
  );

  useEffect(() => onSelectionChanged(selectedItem), [
    selectedItem,
    onSelectionChanged
  ]);

  const onHandleSort = useCallback(
    (sort: SortingRule) => {
      if (sort !== undefined) {
        const direction = sort.desc
          ? Directions.descending
          : Directions.ascending;
        const sortBy: SortByOptions = sortByFromString(sort.id);
        updateSort(sortBy, direction);
        fetchTrackers();
      }
    },
    [fetchTrackers, updateSort]
  );

  return (
    <ReactTable
      manual
      sortable
      className="tracker-table"
      showPagination={false}
      pageSize={pageSize + 1}
      {...tableProps}
      onFetchData={(state, instance) => onHandleSort(state.sorted[0])}
    />
  );
};

export default ProcessingList;
