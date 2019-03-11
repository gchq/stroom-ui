import * as React from "react";
import { useCallback, useMemo } from "react";

import IconHeader from "../../../components/IconHeader";
import useDocumentPermissions from "../../../api/docPermission/useDocumentPermissions";
import { User } from "../../../types";
import Button from "../../../components/Button";
import ThemedConfirm, {
  useDialog as useThemedConfirm
} from "../../../components/ThemedConfirm";
import { useUsers } from "../../../api/userGroups";
import UsersTable, { useTable as useUsersTable } from "../UsersTable";
import { useDocRefWithLineage } from "../../../api/explorer";
import useAppNavigation from "../../../AppChrome/useAppNavigation";

interface Props {
  docRefUuid: string;
}

export const DocumentPermissionEditor = ({ docRefUuid }: Props) => {
  const { goToAuthorisationsForDocumentForUser } = useAppNavigation();
  const { clearPermissions, permissionsByUser } = useDocumentPermissions(
    docRefUuid
  );

  const userUuids = useMemo(() => Object.keys(permissionsByUser), [
    permissionsByUser
  ]);
  const users = useUsers(userUuids);
  const { componentProps: usersTableProps } = useUsersTable(users);

  const { node: docRef } = useDocRefWithLineage(docRefUuid);
  const {
    selectableTableProps: { selectedItems: selectedUsers, clearSelection }
  } = usersTableProps;
  const selectedUser: User | undefined =
    selectedUsers.length > 0 ? selectedUsers[0] : undefined;

  const {
    showDialog: showConfirmClear,
    componentProps: confirmClearProps
  } = useThemedConfirm({
    getQuestion: useCallback(
      () => `Are you sure you wish to clear all permissions?`,
      []
    ),
    getDetails: useCallback(() => {
      return `From Document ${docRef.type} - ${docRefUuid}`;
    }, [docRef]),
    onConfirm: useCallback(() => {
      clearSelection();
      clearPermissions();
    }, [clearSelection, clearPermissions])
  });

  const onClickEdit = useCallback(() => {
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
        <Button
          text="View/Edit"
          disabled={selectedUsers.length !== 1}
          onClick={onClickEdit}
        />
        <Button text="Clear Permissions" onClick={showConfirmClear} />

        <UsersTable {...usersTableProps} />

        <ThemedConfirm {...confirmClearProps} />
      </div>
    </div>
  );
};

export default DocumentPermissionEditor;
