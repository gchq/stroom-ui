import * as React from "react";
import ReactTable from "react-table";
import {
  SelectionBehaviour,
  TableOutProps,
  useSelectableReactTable,
} from "lib/useSelectableItemListing";
import { StroomUser } from "../api/userGroups";

interface Props {
  users: StroomUser[];
  selectableTableProps: TableOutProps<StroomUser>;
}

const COLUMNS = [
  {
    id: "uuid",
    Header: "UUID",
    accessor: (u: StroomUser) => u.uuid,
  },
  {
    id: "name",
    Header: "Name",
    accessor: (u: StroomUser) => u.name,
  },
  {
    id: "isGroup",
    Header: "Is Group",
    accessor: (u: StroomUser) => (u.group ? "Group" : "User"),
  },
];

const UsersTable: React.FunctionComponent<Props> = ({
  selectableTableProps: { onKeyDownWithShortcuts, tableProps },
}) => (
  <div tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
    <ReactTable {...tableProps} />
  </div>
);

interface UseTable {
  componentProps: Props;
}

export const useTable = (users: StroomUser[]): UseTable => {
  const selectableTableProps = useSelectableReactTable<StroomUser>(
    {
      getKey: v => v.uuid,
      items: users,
      selectionBehaviour: SelectionBehaviour.MULTIPLE,
    },
    {
      columns: COLUMNS,
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
