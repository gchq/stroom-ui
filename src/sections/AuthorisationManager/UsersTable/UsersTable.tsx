import * as React from "react";

import ReactTable from "react-table";

import { User } from "../../../types";
import {
  useSelectableReactTable,
  SelectionBehaviour,
  TableOutProps
} from "../../../lib/useSelectableItemListing";

interface Props {
  users: Array<User>;
  selectableTableProps: TableOutProps<User>;
}

const COLUMNS = [
  {
    id: "uuid",
    Header: "UUID",
    accessor: (u: User) => u.uuid
  },
  {
    id: "name",
    Header: "Name",
    accessor: (u: User) => u.name
  },
  {
    id: "isGroup",
    Header: "Is Group",
    accessor: (u: User) => (u.isGroup ? "Group" : "User")
  }
];

const UsersTable = ({
  selectableTableProps: { onKeyDownWithShortcuts, tableProps }
}: Props) => (
  <div tabIndex={0} onKeyDown={onKeyDownWithShortcuts}>
    <ReactTable {...tableProps} />
  </div>
);

interface UseTable {
  componentProps: Props;
}

export const useTable = (users: Array<User>): UseTable => {
  const selectableTableProps = useSelectableReactTable<User>(
    {
      getKey: v => v.uuid,
      items: users,
      selectionBehaviour: SelectionBehaviour.MULTIPLE
    },
    {
      columns: COLUMNS
    }
  );

  return {
    componentProps: {
      selectableTableProps,
      users
    }
  };
};

export default UsersTable;
