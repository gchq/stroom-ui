import * as React from "react";

import ReactTable, { TableProps } from "react-table";

import {
  useSelectableReactTable,
  SelectionBehaviour,
} from "lib/useSelectableItemListing";
import { TableOutProps } from "lib/useSelectableItemListing/types";
import { IndexVolumeGroup } from "components/IndexVolumeGroups/api";

interface Props {
  groups: IndexVolumeGroup[];
  selectableTableProps: TableOutProps<IndexVolumeGroup>;
}

const COLUMNS = [
  {
    id: "name",
    Header: "Name",
    accessor: (u: IndexVolumeGroup) => u.name,
  },
];

const IndexVolumeGroupsTable: React.FunctionComponent<Props> = ({
  selectableTableProps: { onKeyDownWithShortcuts, tableProps },
}) => (
  <div tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
    <ReactTable {...tableProps} />
  </div>
);

interface UseTable {
  componentProps: Props;
}

export const useTable = (
  groups: IndexVolumeGroup[],
  customTableProps?: Partial<TableProps>,
): UseTable => {
  const selectableTableProps = useSelectableReactTable<IndexVolumeGroup>(
    {
      getKey: v => v.name,
      items: groups,
      selectionBehaviour: SelectionBehaviour.MULTIPLE,
    },
    {
      columns: COLUMNS,
      ...customTableProps,
    },
  );

  return {
    componentProps: {
      selectableTableProps,
      groups,
    },
  };
};

export default IndexVolumeGroupsTable;
