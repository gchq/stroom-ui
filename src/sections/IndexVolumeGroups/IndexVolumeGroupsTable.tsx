import * as React from "react";
import { useState, useCallback } from "react";

import { path } from "ramda";
import ReactTable, { RowInfo } from "react-table";

import { IndexVolumeGroup } from "../../types";

export interface Props {
  groups: Array<IndexVolumeGroup>;
  selectedGroup?: IndexVolumeGroup;
  onSelection: (name?: string) => void;
}

const COLUMNS = [
  {
    id: "name",
    Header: "Name",
    accessor: (u: IndexVolumeGroup) => u.name
  }
];

const IndexVolumeGroupsTable = ({
  groups,
  selectedGroup,
  onSelection
}: Props) => (
  <ReactTable
    data={groups}
    columns={COLUMNS}
    getTdProps={(state: any, rowInfo: RowInfo) => {
      return {
        onClick: (_: any, handleOriginal: () => void) => {
          if (rowInfo !== undefined) {
            if (
              !!selectedGroup &&
              selectedGroup.name === rowInfo.original.name
            ) {
              onSelection();
            } else {
              onSelection(rowInfo.original.name);
            }
          }

          if (handleOriginal) {
            handleOriginal();
          }
        }
      };
    }}
    getTrProps={(_: any, rowInfo: RowInfo) => {
      // We don't want to see a hover on a row without data.
      // If a row is selected we want to see the selected color.
      const isSelected =
        !!selectedGroup &&
        path(["original", "name"], rowInfo) === selectedGroup.name;
      const hasData = path(["original", "name"], rowInfo) !== undefined;
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

export interface UseTable {
  componentProps: Props;
}

export const useTable = (groups: Array<IndexVolumeGroup>): UseTable => {
  const [selectedGroup, setSelectedGroup] = useState<
    IndexVolumeGroup | undefined
  >(undefined);

  const onSelection = useCallback(
    (selectedName?: string) => {
      setSelectedGroup(
        groups.find((u: IndexVolumeGroup) => u.name === selectedName)
      );
    },
    [groups]
  );

  return {
    componentProps: {
      selectedGroup,
      onSelection,
      groups
    }
  };
};

export default IndexVolumeGroupsTable;
