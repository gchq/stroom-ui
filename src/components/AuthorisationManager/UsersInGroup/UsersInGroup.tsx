import * as React from "react";

import UsersTable, { useTable as useUsersTable } from "../UsersTable";
import Button from "src/components/Button";
import ThemedConfirm, {
  useDialog as useThemedConfirm,
} from "src/components/ThemedConfirm";
import {
  useUsersInGroup,
  User,
} from "src/components/AuthorisationManager/api/userGroups";
import UserModalPicker, {
  useDialog as useUserModalPicker,
} from "../UserModalPicker";
import useAppNavigation from "src/components/AppChrome/useAppNavigation";

interface Props {
  group: User;
}

const UsersInGroup = ({ group }: Props) => {
  const { users, addToGroup, removeFromGroup } = useUsersInGroup(group);
  const { goToAuthorisationsForUser } = useAppNavigation();

  const { componentProps: tableProps } = useUsersTable(users);
  const {
    selectableTableProps: { selectedItems },
  } = tableProps;

  const {
    componentProps: deleteGroupMembershipComponentProps,
    showDialog: showDeleteGroupMembershipDialog,
  } = useThemedConfirm({
    onConfirm: React.useCallback(
      () =>
        selectedItems.map(s => s.uuid).forEach(uUuid => removeFromGroup(uUuid)),
      [removeFromGroup, group, selectedItems],
    ),
    getQuestion: React.useCallback(
      () => "Are you sure you want to remove these users from the group?",
      [],
    ),
    getDetails: React.useCallback(
      () => selectedItems.map(s => s.name).join(", "),
      [selectedItems],
    ),
  });

  const goToSelectedUser = React.useCallback(() => {
    if (selectedItems.length === 1) {
      goToAuthorisationsForUser(selectedItems[0].uuid);
    }
  }, [goToAuthorisationsForUser, selectedItems]);

  const {
    componentProps: userPickerProps,
    showDialog: showUserPicker,
  } = useUserModalPicker({
    isGroup: false,
    onConfirm: addToGroup,
  });

  return (
    <div>
      <h2>Users in Group {group.name}</h2>
      <Button text="Add" onClick={showUserPicker} />
      <Button
        text="Remove Users"
        disabled={selectedItems.length === 0}
        onClick={showDeleteGroupMembershipDialog}
      />
      <Button
        text="View/Edit"
        disabled={selectedItems.length !== 1}
        onClick={goToSelectedUser}
      />
      <UsersTable {...tableProps} />
      <UserModalPicker {...userPickerProps} />
      <ThemedConfirm {...deleteGroupMembershipComponentProps} />
    </div>
  );
};

export default UsersInGroup;
