import * as React from "react";

import ReactTable from "react-table";

import {
  useSelectableReactTable,
  SelectionBehaviour,
  TableOutProps,
} from "src/lib/useSelectableItemListing";
import { User } from "src/components/AuthorisationManager/api/userGroups";

interface Props {
  users: User[];
  selectableTableProps: TableOutProps<User>;
}

const COLUMNS = [
  {
    id: "uuid",
    Header: "UUID",
    accessor: (u: User) => u.uuid,
  },
  {
    id: "name",
    Header: "Name",
    accessor: (u: User) => u.name,
  },
  {
    id: "isGroup",
    Header: "Is Group",
    accessor: (u: User) => (u.group ? "Group" : "User"),
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

export const useTable = (users: User[]): UseTable => {
  const selectableTableProps = useSelectableReactTable<User>(
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
