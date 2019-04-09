import * as React from "react";

import { useGroupsForUser, User } from "src/api/userGroups";
import UsersTable, { useTable as useUsersTable } from "../UsersTable";
import Button from "src/components/Button";
import {
  UserGroupPickOrCreateDialog,
  useDialog as useUserGroupModalPicker,
} from "../UserGroupPickOrCreateDialog";
import ThemedConfirm, {
  useDialog as useThemedConfirm,
} from "src/components/ThemedConfirm";
import useAppNavigation from "src/components/AppChrome/useAppNavigation";

interface Props {
  user: User;
}

const GroupsForUser: React.FunctionComponent<Props> = ({ user }) => {
  const { groups, addToGroup, removeFromGroup } = useGroupsForUser(user);
  const { goToAuthorisationsForUser } = useAppNavigation();

  const { componentProps: tableProps } = useUsersTable(groups);
  const {
    selectableTableProps: { selectedItems },
  } = tableProps;

  const {
    componentProps: deleteGroupMembershipComponentProps,
    showDialog: showDeleteGroupMembershipDialog,
  } = useThemedConfirm({
    onConfirm: React.useCallback(
      () =>
        selectedItems.map(g => g.uuid).forEach(gUuid => removeFromGroup(gUuid)),
      [removeFromGroup, user, selectedItems],
    ),
    getQuestion: React.useCallback(
      () => "Are you sure you want to remove the user from these groups?",
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
    componentProps: userGroupPickerProps,
    showDialog: showUserGroupPicker,
  } = useUserGroupModalPicker({
    onConfirm: React.useCallback((groupUuid: string) => addToGroup(groupUuid), [
      addToGroup,
    ]),
    valuesToFilterOut: React.useMemo(() => groups.map(g => g.uuid), [groups]),
  });

  return (
    <div>
      <h2>Groups for User {user.name}</h2>
      <Button text="Add to Group" onClick={showUserGroupPicker} />
      <Button
        text="Remove from Group"
        disabled={selectedItems.length === 0}
        onClick={showDeleteGroupMembershipDialog}
      />
      <Button
        text="View/Edit"
        disabled={selectedItems.length !== 1}
        onClick={goToSelectedUser}
      />
      <ThemedConfirm {...deleteGroupMembershipComponentProps} />
      <UsersTable {...tableProps} />
      <UserGroupPickOrCreateDialog {...userGroupPickerProps} />
    </div>
  );
};

export default GroupsForUser;
