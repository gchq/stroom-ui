import * as React from "react";

import ReactTable from "react-table";

import {
  useSelectableReactTable,
  SelectionBehaviour,
  TableOutProps,
} from "src/lib/useSelectableItemListing";
import { IndexVolume } from "src/api/indexVolume";

interface Props {
  indexVolumes: IndexVolume[];
  selectableTableProps: TableOutProps<IndexVolume>;
}

const COLUMNS = [
  {
    id: "id",
    Header: "ID",
    accessor: (u: IndexVolume) => u.id,
  },
  {
    id: "nodeName",
    Header: "Node",
    accessor: (u: IndexVolume) => u.nodeName,
  },
  {
    id: "path",
    Header: "Path",
    accessor: (u: IndexVolume) => u.path,
  },
];

const IndexVolumesTable: React.FunctionComponent<Props> = ({
  selectableTableProps: { onKeyDownWithShortcuts, tableProps },
}) => (
  <div tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
    <ReactTable {...tableProps} />
  </div>
);

interface UseTable {
  componentProps: Props;
}

export const useTable = (indexVolumes: IndexVolume[]): UseTable => {
  const selectableTableProps = useSelectableReactTable<IndexVolume>(
    {
      getKey: v => v.id,
      items: indexVolumes,
      selectionBehaviour: SelectionBehaviour.MULTIPLE,
    },
    {
      columns: COLUMNS,
    },
  );

  return {
    componentProps: {
      selectableTableProps,
      indexVolumes,
    },
  };
};

export default IndexVolumesTable;
