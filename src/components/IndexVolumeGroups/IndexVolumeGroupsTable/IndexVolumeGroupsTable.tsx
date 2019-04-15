import * as React from "react";

import ReactTable from "react-table";

import {
  useSelectableReactTable,
  SelectionBehaviour,
  TableOutProps,
} from "src/lib/useSelectableItemListing";
import { IndexVolumeGroup } from "src/api/indexVolumeGroup";

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

export const useTable = (groups: IndexVolumeGroup[]): UseTable => {
  const selectableTableProps = useSelectableReactTable<IndexVolumeGroup>(
    {
      getKey: v => v.name,
      items: groups,
      selectionBehaviour: SelectionBehaviour.MULTIPLE,
    },
    {
      columns: COLUMNS,
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
