import * as React from "react";

import ReactTable from "react-table";

import {
  useSelectableReactTable,
  SelectionBehaviour,
} from "lib/useSelectableItemListing";

import { TableOutProps } from "lib/useSelectableItemListing/types";

interface Props {
  groupNames: string[];
  selectableTableProps: TableOutProps<string>;
}

const COLUMNS = [
  {
    id: "name",
    Header: "Name",
    accessor: (u: string) => u,
  },
];

const IndexVolumeGroupNamesTable: React.FunctionComponent<Props> = ({
  selectableTableProps: { onKeyDownWithShortcuts, tableProps },
}) => (
  <div className="fill-space" tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
    <ReactTable
      className="IndexVolumeGroupNamesTable -striped -highlight"
      {...tableProps}
    />
  </div>
);

interface UseTable {
  componentProps: Props;
}

export const useTable = (groupNames: string[]): UseTable => {
  const selectableTableProps = useSelectableReactTable<string>(
    {
      getKey: v => v,
      items: groupNames,
      selectionBehaviour: SelectionBehaviour.MULTIPLE,
    },
    {
      columns: COLUMNS,
    },
  );

  return {
    componentProps: {
      selectableTableProps,
      groupNames,
    },
  };
};

export default IndexVolumeGroupNamesTable;
