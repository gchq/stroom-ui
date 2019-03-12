import * as React from "react";
import { useCallback } from "react";

import { User } from "../../../types";

import { useGroupsForUser } from "../../../api/userGroups";
import Loader from "../../../components/Loader";
import UsersTable, { useTable as useUsersTable } from "../UsersTable";
import Button from "../../../components/Button";
import {
  UserGroupPickOrCreateDialog,
  useDialog as useUserGroupModalPicker
} from "../UserGroupPickOrCreateDialog";
import ThemedConfirm, {
  useDialog as useThemedConfirm
} from "../../../components/ThemedConfirm";

interface Props {
  user: User;
}

const GroupsForUser = ({ user }: Props) => {
  const { groups, addToGroup, removeFromGroup } = useGroupsForUser(user);

  const { componentProps: tableProps } = useUsersTable(groups);
  const {
    selectableTableProps: { selectedItems }
  } = tableProps;

  const {
    componentProps: deleteGroupMembershipComponentProps,
    showDialog: showDeleteGroupMembershipDialog
  } = useThemedConfirm({
    onConfirm: useCallback(
      () =>
        selectedItems.map(g => g.uuid).forEach(gUuid => removeFromGroup(gUuid)),
      [removeFromGroup, user, selectedItems]
    ),
    getQuestion: useCallback(
      () => "Are you sure you want to remove the user from these groups?",
      []
    ),
    getDetails: useCallback(() => selectedItems.map(s => s.name).join(", "), [
      selectedItems
    ])
  });

  const {
    componentProps: userGroupPickerProps,
    showDialog: showUserGroupPicker
  } = useUserGroupModalPicker({
    onConfirm: useCallback((groupUuid: string) => addToGroup(groupUuid), [
      addToGroup
    ])
  });

  if (!groups) {
    return <Loader message={`Loading Groups for User ${user.uuid}`} />;
  }

  return (
    <div>
      <h2>Groups for User {user.name}</h2>
      <Button text="Add to Group" onClick={showUserGroupPicker} />
      <Button
        text="Remove from Group"
        disabled={selectedItems.length === 0}
        onClick={showDeleteGroupMembershipDialog}
      />
      <ThemedConfirm {...deleteGroupMembershipComponentProps} />
      <UsersTable {...tableProps} />
      <UserGroupPickOrCreateDialog {...userGroupPickerProps} />
    </div>
  );
};

export default GroupsForUser;
