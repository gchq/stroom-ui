import * as React from "react";
import ReactTable from "react-table";

import { IndexField } from "../../types";
import {
  useSelectableReactTable,
  SelectionBehaviour,
  TableOutProps
} from "../../lib/useSelectableItemListing";

export interface Props {
  fields: Array<IndexField>;
  selectableTableProps: TableOutProps<IndexField>;
}

const COLUMNS = [
  {
    id: "fieldName",
    Header: "Name",
    accessor: (u: IndexField) => u.fieldName
  },
  {
    id: "fieldType",
    Header: "Type",
    accessor: (u: IndexField) => u.fieldType
  },
  {
    id: "stored",
    Header: "Stored",
    accessor: (u: IndexField) => u.stored.toString()
  },
  {
    id: "termPositions",
    Header: "Positions",
    accessor: (u: IndexField) => u.termPositions.toString()
  },
  {
    id: "analyzerType",
    Header: "Analyzer",
    accessor: (u: IndexField) => u.analyzerType
  },
  {
    id: "caseSensitive",
    Header: "Case Sensitive",
    accessor: (u: IndexField) => u.caseSensitive.toString()
  }
];

const IndexFieldsTable = ({
  selectableTableProps: { onKeyDownWithShortcuts, tableProps }
}: Props) => (
  <div tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
    <ReactTable {...tableProps} />
  </div>
);

export interface UseTable {
  componentProps: Props;
}

export const useTable = (fields: Array<IndexField>): UseTable => {
  const selectableTableProps = useSelectableReactTable<IndexField>(
    {
      getKey: v => v.fieldName,
      items: fields,
      selectionBehaviour: SelectionBehaviour.MULTIPLE
    },
    {
      columns: COLUMNS
    }
  );

  return {
    componentProps: {
      selectableTableProps,
      fields
    }
  };
};

export default IndexFieldsTable;
