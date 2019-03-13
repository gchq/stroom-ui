import * as React from "react";

import ReactTable from "react-table";

import { IndexVolumeGroup } from "../../../types";
import {
  useSelectableReactTable,
  SelectionBehaviour,
  TableOutProps
} from "../../../lib/useSelectableItemListing";

 interface Props {
  groups: Array<IndexVolumeGroup>;
  selectableTableProps: TableOutProps<IndexVolumeGroup>;
}

const COLUMNS = [
  {
    id: "name",
    Header: "Name",
    accessor: (u: IndexVolumeGroup) => u.name
  }
];

const IndexVolumeGroupsTable = ({
  selectableTableProps: { onKeyDownWithShortcuts, tableProps }
}: Props) => (
  <div tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
    <ReactTable {...tableProps} />
  </div>
);

 interface UseTable {
  componentProps: Props;
}

export const useTable = (groups: Array<IndexVolumeGroup>): UseTable => {
  const selectableTableProps = useSelectableReactTable<IndexVolumeGroup>(
    {
      getKey: v => v.name,
      items: groups,
      selectionBehaviour: SelectionBehaviour.MULTIPLE
    },
    {
      columns: COLUMNS
    }
  );

  return {
    componentProps: {
      selectableTableProps,
      groups
    }
  };
};

export default IndexVolumeGroupsTable;
