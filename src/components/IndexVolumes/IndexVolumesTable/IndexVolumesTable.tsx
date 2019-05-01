import * as React from "react";

import ReactTable from "react-table";

import {
  useSelectableReactTable,
  SelectionBehaviour,
} from "lib/useSelectableItemListing";
import { TableOutProps } from "lib/useSelectableItemListing/types";
import { IndexVolume } from "components/IndexVolumes/api";

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
  <div className="fill-space" tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
    <ReactTable className="fill-space -striped -highlight" {...tableProps} />
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
