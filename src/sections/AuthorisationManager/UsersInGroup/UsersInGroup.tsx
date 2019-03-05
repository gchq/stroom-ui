import * as React from "react";
import { useEffect, useCallback } from "react";

import { User } from "../../../types";

import useApi from "../../../api/userGroups/useApi";
import Loader from "../../../components/Loader";
import useReduxState from "../../../lib/useReduxState";
import UsersTable, { useTable as useUsersTable } from "../UsersTable";
import Button from "../../../components/Button";
import ThemedConfirm, {
  useDialog as useThemedConfirm
} from "../../../components/ThemedConfirm";

export interface Props {
  group: User;
}

export interface ConnectState {
  users: Array<User>;
}

const UsersInGroup = ({ group }: Props) => {
  const { findUsersInGroup, removeUserFromGroup } = useApi();
  useEffect(() => {
    if (group) {
      findUsersInGroup(group.uuid);
    }
  }, [!!group ? group.uuid : null]);

  const { usersInGroup } = useReduxState(
    ({ userGroups: { usersInGroup } }) => ({
      usersInGroup
    })
  );
  const users = usersInGroup[group.uuid];

  const { componentProps: tableProps } = useUsersTable(users);
  const {
    selectableTableProps: { selectedItems }
  } = tableProps;

  const {
    componentProps: deleteGroupMembershipComponentProps,
    showDialog: showDeleteGroupMembershipDialog
  } = useThemedConfirm({
    onConfirm: useCallback(
      () =>
        selectedItems
          .map(s => s.uuid)
          .forEach(uUuid => removeUserFromGroup(uUuid, group.uuid)),
      [removeUserFromGroup, group, selectedItems]
    ),
    getQuestion: useCallback(
      () => "Are you sure you want to remove these users from the group?",
      []
    ),
    getDetails: useCallback(() => selectedItems.map(s => s.name).join(", "), [
      selectedItems
    ])
  });

  if (!users) {
    return <Loader message={`Loading Users for Group ${group.uuid}`} />;
  }

  return (
    <div>
      <h2>Users in Group {group.name}</h2>
      <Button
        text="Remove Users"
        disabled={selectedItems.length === 0}
        onClick={showDeleteGroupMembershipDialog}
      />
      <ThemedConfirm {...deleteGroupMembershipComponentProps} />
      <UsersTable {...tableProps} />
    </div>
  );
};

export default UsersInGroup;
