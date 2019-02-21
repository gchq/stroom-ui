import * as React from "react";

import ReactTable from "react-table";

import { IndexVolume } from "../../types";
import {
  useSelectableReactTable,
  SelectionBehaviour,
  TableOutProps
} from "../../lib/useSelectableItemListing";

export interface Props {
  indexVolumes: Array<IndexVolume>;
  selectableTableProps: TableOutProps;
}

const COLUMNS = [
  {
    id: "id",
    Header: "ID",
    accessor: (u: IndexVolume) => u.id
  },
  {
    id: "nodeName",
    Header: "Node",
    accessor: (u: IndexVolume) => u.nodeName
  },
  {
    id: "path",
    Header: "Path",
    accessor: (u: IndexVolume) => u.path
  }
];

const IndexVolumesTable = ({
  selectableTableProps: { onKeyDownWithShortcuts, tableProps }
}: Props) => (
  <div tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
    <ReactTable {...tableProps} />
  </div>
);

export interface UseTable {
  componentProps: Props;
}

export const useTable = (indexVolumes: Array<IndexVolume>): UseTable => {
  const selectableTableProps = useSelectableReactTable<IndexVolume>(
    {
      getKey: v => v.id,
      items: indexVolumes,
      selectionBehaviour: SelectionBehaviour.MULTIPLE
    },
    {
      columns: COLUMNS
    }
  );

  return {
    componentProps: {
      selectableTableProps,
      indexVolumes
    }
  };
};

export default IndexVolumesTable;
