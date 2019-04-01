import * as React from "react";

import ReactTable from "react-table";

import {
  useSelectableReactTable,
  SelectionBehaviour,
  TableOutProps
} from "src/lib/useSelectableItemListing";

interface Props {
  groupNames: Array<string>;
  selectableTableProps: TableOutProps<string>;
}

const COLUMNS = [
  {
    id: "name",
    Header: "Name",
    accessor: (u: string) => u
  }
];

const IndexVolumeGroupNamesTable = ({
  selectableTableProps: { onKeyDownWithShortcuts, tableProps }
}: Props) => (
  <div tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
    <ReactTable {...tableProps} />
  </div>
);

interface UseTable {
  componentProps: Props;
}

export const useTable = (groupNames: Array<string>): UseTable => {
  const selectableTableProps = useSelectableReactTable<string>(
    {
      getKey: v => v,
      items: groupNames,
      selectionBehaviour: SelectionBehaviour.MULTIPLE
    },
    {
      columns: COLUMNS
    }
  );

  return {
    componentProps: {
      selectableTableProps,
      groupNames
    }
  };
};

export default IndexVolumeGroupNamesTable;
