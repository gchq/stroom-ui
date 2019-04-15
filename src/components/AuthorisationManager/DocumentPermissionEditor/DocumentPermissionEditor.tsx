import * as React from "react";

import IconHeader from "src/components/IconHeader";
import useDocumentPermissions from "src/api/docPermission/useDocumentPermissions";
import Button from "src/components/Button";
import ThemedConfirm, {
  useDialog as useThemedConfirm,
} from "src/components/ThemedConfirm";
import { useUsers, StroomUser } from "src/api/userGroups";
import UsersTable, { useTable as useUsersTable } from "../UsersTable";
import useAppNavigation from "../../AppChrome/useAppNavigation";
import useRouter from "src/lib/useRouter";
import { useDocumentTree } from "src/api/explorer";
import UserModalPicker, {
  useDialog as useUserModalPicker,
} from "../UserModalPicker";

interface Props {
  docRefUuid: string;
}

export const DocumentPermissionEditor: React.FunctionComponent<Props> = ({
  docRefUuid,
}) => {
  const { goToAuthorisationsForDocumentForUser } = useAppNavigation();
  const {
    clearPermissions,
    clearPermissionForUser,
    preparePermissionsForUser,
    permissionsByUser,
  } = useDocumentPermissions(docRefUuid);

  const { history } = useRouter();
  const userUuids = React.useMemo(() => Object.keys(permissionsByUser), [
    permissionsByUser,
  ]);
  const users = useUsers(userUuids);
  const { componentProps: usersTableProps } = useUsersTable(users);

  const { findDocRefWithLineage } = useDocumentTree();
  const { node: docRef } = React.useMemo(
    () => findDocRefWithLineage(docRefUuid),
    [findDocRefWithLineage, docRefUuid],
  );
  const {
    selectableTableProps: { selectedItems: selectedUsers, clearSelection },
  } = usersTableProps;
  const selectedUser: StroomUser | undefined =
    selectedUsers.length > 0 ? selectedUsers[0] : undefined;

  const {
    componentProps: userPickerProps,
    showDialog: showUserPicker,
  } = useUserModalPicker({
    isGroup: undefined, // either,
    onConfirm: preparePermissionsForUser,
  });

  const {
    showDialog: showConfirmClear,
    componentProps: confirmClearProps,
  } = useThemedConfirm({
    getQuestion: React.useCallback(
      () =>
        `Are you sure you wish to clear permissions for ${
          selectedUsers.length === 0 ? "all" : "selected"
        } users?`,
      [selectedUsers.length],
    ),
    getDetails: React.useCallback(() => {
      if (selectedUsers.length === 0) {
        return `From Document ${docRef.type} - ${docRefUuid}`;
      } else {
        return (
          `From Document ${docRef.type} - ${docRefUuid} for users ` +
          selectedUsers.map(u => u.name).join(", ")
        );
      }
    }, [docRef, selectedUsers]),
    onConfirm: React.useCallback(() => {
      if (selectedUsers.length !== 0) {
        selectedUsers.forEach(user => clearPermissionForUser(user.uuid));
        clearSelection();
      } else {
        clearPermissions();
      }
    }, [
      selectedUsers,
      clearSelection,
      clearPermissionForUser,
      clearPermissions,
    ]),
  });
  const clearButtonText =
    selectedUsers.length === 0 ? "Clear All" : "Clear Selected";

  const onClickEdit = React.useCallback(() => {
    if (!!selectedUser) {
      goToAuthorisationsForDocumentForUser(docRefUuid, selectedUser.uuid);
    }
  }, [history, docRef, selectedUser]);

  return (
    <div>
      <IconHeader
        icon="key"
        text={`Document Permissions for ${docRef.type} - ${docRef.name}`}
      />
      <div>
        <Button text="Back" onClick={history.goBack} />
        <Button text="Add" onClick={showUserPicker} />
        <Button
          text="View/Edit"
          disabled={selectedUsers.length !== 1}
          onClick={onClickEdit}
        />
        <Button text={clearButtonText} onClick={showConfirmClear} />

        <h2>Users</h2>
        <UsersTable {...usersTableProps} />

        <ThemedConfirm {...confirmClearProps} />
        <UserModalPicker {...userPickerProps} />
      </div>
    </div>
  );
};

export default DocumentPermissionEditor;
