import * as React from "react";

import ReactTable from "react-table";

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
  <div className="fill-space" tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
    <ReactTable className="fill-space -striped -highlight" {...tableProps} />
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
