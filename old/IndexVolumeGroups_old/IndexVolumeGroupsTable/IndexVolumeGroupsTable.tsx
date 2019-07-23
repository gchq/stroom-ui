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
  selectableTableProps: { onKeyDown, tableProps },
}) => (
  <div className="fill-space" tabIndex={0} onKeyDown={onKeyDown}>
    <ReactTable className="fill-space -striped -highlight" {...tableProps} />
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
      getKey: React.useCallback(v => v.name, []),
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
