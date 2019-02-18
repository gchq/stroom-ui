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

import * as moment from "moment";
import { path } from "ramda";
import * as Mousetrap from "mousetrap";
import ReactTable, { RowInfo, Column } from "react-table";
import "react-table/react-table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "redux-react-hook";

import {
  //useSearch,
  useGetDetailsForSelectedRow,
  useFetchDataSource,
  useSearchWithExpression
} from "../streamAttributeMapClient";
import { useGetDataForSelectedRow } from "../dataResourceClient";
import { actionCreators, defaultStatePerId } from "../redux";

import Loader from "../../../components/Loader";
import Button from "../../../components/Button";
import { Direction } from "../../../types";

import { DataRow } from "../types";
import useReduxState from "../../../lib/useReduxState";

export interface Props {
  dataViewerId: string;
}

interface TableData {
  metaId?: string;
  created?: string;
  type?: string;
  feed?: string;
  pipeline?: string;
}

const { selectRow } = actionCreators;

const DataList = ({ dataViewerId }: Props) => {
  const dispatch = useDispatch();
  const { dataViewers } = useReduxState(({ dataViewers }) => ({ dataViewers }));
  const { selectedRow, pageOffset, pageSize, streamAttributeMaps, dataSource } =
    dataViewers[dataViewerId] || defaultStatePerId;

  //const search = useSearch();
  const searchWithExpression = useSearchWithExpression();
  const fetchDataSource = useFetchDataSource();
  const getDetailsForSelectedRow = useGetDetailsForSelectedRow();
  const getDataForSelectedRow = useGetDataForSelectedRow();

  const onRowSelected = (dataViewerId: string, selectedRow: number) => {
    dispatch(selectRow(dataViewerId, selectedRow));

    getDataForSelectedRow(dataViewerId);
    getDetailsForSelectedRow(dataViewerId);
  };
  const onHandleLoadMoreRows = () => {
    searchWithExpression(dataViewerId, pageOffset, pageSize, dataViewerId);
    // TODO: need to search with expression too
    // search(dataViewerId, pageOffset + 1, pageSize, true);
  };
  const onMoveSelection: (direction: Direction) => void = (
    direction: Direction
  ) => {
    if (!streamAttributeMaps) return;

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
        onRowSelected(dataViewerId, (selectedRow || 0) + 1);
      } else if (direction === "up") {
        onRowSelected(dataViewerId, (selectedRow || 0) - 1);
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
    // if (!selectedRow) {
    //   searchWithExpression(dataViewerId, pageOffset, pageSize, dataViewerId);
    //   // search(dataViewerId, pageOffset, pageSize);
    // }

    Mousetrap.bind("up", () => onMoveSelection(Direction.UP));
    Mousetrap.bind("down", () => onMoveSelection(Direction.DOWN));

    return () => {
      Mousetrap.unbind("up");
      Mousetrap.unbind("down");
    };
  }, []);

  if (!streamAttributeMaps) {
    return <Loader message="Loading data..." />;
  }

  if (!dataSource) {
    return <Loader message="Loading data source..." />;
  }

  let tableData: TableData[] = streamAttributeMaps.map(
    (streamAttributeMap: DataRow) => {
      return {
        metaId: `${streamAttributeMap.data.id}`,
        created: moment(streamAttributeMap.data.createMs).format(
          "MMMM Do YYYY, h:mm:ss a"
        ),
        type: streamAttributeMap.data.typeName,
        feed: streamAttributeMap.data.feedName,
        pipeline: streamAttributeMap.data.pipelineUuid
      };
    }
  );

  // Just keep rows with data, more 'load more' rows
  tableData = tableData.filter((row: TableData) => row.metaId !== undefined);
  const dummyRowForLoadMore = {
    metaId: undefined,
    created: undefined,
    type: undefined,
    feed: undefined,
    pipeline: undefined
  };
  tableData.push(dummyRowForLoadMore);

  let tableColumns: Column[] = [
    {
      Header: "",
      accessor: "type",
      Cell: (row: RowInfo): React.ReactNode => {
        // This block of code is mostly about making a sensible looking popup.
        const stream = streamAttributeMaps.find(
          (streamAttributeMap: DataRow) =>
            streamAttributeMap.data.id === row.original.metaId
        );

        const eventIcon = <FontAwesomeIcon color="blue" icon="file" />;
        const warningIcon = (
          <FontAwesomeIcon color="orange" icon="exclamation-circle" />
        );

        let icon;
        if (stream !== undefined) {
          if (stream.data.typeName === "Error") {
            icon = warningIcon;
          } else {
            icon = eventIcon;
          }
        } else {
          icon = <span />;
        }

        return icon;
      },
      width: 35
    },
    {
      Header: "Type",
      accessor: "type"
    },
    {
      Header: "Created",
      accessor: "created",
      Cell: (row: RowInfo): React.ReactNode => {
        if (row.original.metaId) {
          return <span>{row.original.created}</span>;
        } else {
          return (
            <Button
              className="border hoverable load-more-button"
              onClick={() => onHandleLoadMoreRows()}
              text="Load more rows"
            />
          );
        }
      }
    },
    {
      Header: "Feed",
      accessor: "feed"
    },
    {
      Header: "Pipeline",
      accessor: "pipeline"
    }
  ];

  return (
    <ReactTable
      manual
      sortable={false}
      showPagination={false}
      className="table__reactTable"
      data={tableData}
      columns={tableColumns}
      getTdProps={(_: any, rowInfo: RowInfo) => ({
        onClick: (_: any, handleOriginal: () => void) => {
          const index = path(["index"], rowInfo);
          const metaId = path(["original", "metaId"], rowInfo);
          if (index !== undefined && metaId !== undefined) {
            onRowSelected(dataViewerId, rowInfo.index);
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
          selectedRow !== undefined && path(["index"], rowInfo) === selectedRow;
        const hasData = path(["original", "created"], rowInfo) !== undefined;
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

export default DataList;
