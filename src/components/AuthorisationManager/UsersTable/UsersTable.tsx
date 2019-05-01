import * as React from "react";
import ReactTable, { TableProps } from "react-table";
import {
  SelectionBehaviour,
  useSelectableReactTable,
} from "lib/useSelectableItemListing";
import { StroomUser } from "../api/userGroups";
import { TableOutProps } from "lib/useSelectableItemListing/types";
import useColumns from "./useColumns";

interface Props {
  users: StroomUser[];
  selectableTableProps: TableOutProps<StroomUser>;
}

const UsersTable: React.FunctionComponent<Props> = ({
  selectableTableProps: { onKeyDownWithShortcuts, tableProps },
}) => (
  <div tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
    <ReactTable className="UsersTable -striped -highlight" {...tableProps} />
  </div>
);

interface UseTable {
  componentProps: Props;
}

export const useTable = (
  users: StroomUser[],
  customTableProps?: Partial<TableProps>,
): UseTable => {
  const selectableTableProps = useSelectableReactTable<StroomUser>(
    {
      getKey: v => v.uuid,
      items: users,
      selectionBehaviour: SelectionBehaviour.MULTIPLE,
    },
    {
      columns: useColumns(),
      ...customTableProps,
    },
  );

  return {
    componentProps: {
      selectableTableProps,
      users,
    },
  };
};

export default UsersTable;
