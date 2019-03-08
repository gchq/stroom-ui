import * as React from "react";
import { useCallback, useMemo } from "react";

import IconHeader from "../../../components/IconHeader";
import useDocumentPermissions from "../../../api/docPermission/useDocumentPermissions";
import { DocRefType, User } from "../../../types";
import Button from "../../../components/Button";
import ThemedConfirm, {
  useDialog as useThemedConfirm
} from "../../../components/ThemedConfirm";
import DocumentPermissionForUserEditor from "../DocumentPermissionForUserEditor";
import { useUsers } from "../../../api/userGroups";
import UsersTable, { useTable as useUsersTable } from "../UsersTable";

interface Props {
  docRef: DocRefType;
}

export const DocumentPermissionEditor = ({ docRef }: Props) => {
  const { clearPermissions, permissionsByUser } = useDocumentPermissions(
    docRef.uuid
  );

  const userUuids = useMemo(() => {
    console.log("Permissions By User Changed");
    return Object.keys(permissionsByUser);
  }, [permissionsByUser]);
  const users = useUsers(userUuids);
  const { componentProps: usersTableProps } = useUsersTable(users);

  const {
    selectableTableProps: { selectedItems }
  } = usersTableProps;
  const selectedUser: User | undefined =
    selectedItems.length > 0 ? selectedItems[0] : undefined;

  const {
    showDialog: showConfirmClear,
    componentProps: confirmClearProps
  } = useThemedConfirm({
    getQuestion: useCallback(
      () => `Are you sure you wish to clear all permissions?`,
      []
    ),
    getDetails: useCallback(() => {
      return `From Document ${docRef.type} - ${docRef.uuid}`;
    }, [docRef]),
    onConfirm: clearPermissions
  });

  return (
    <div>
      <IconHeader
        icon="key"
        text={`Document Permissions for ${docRef.type} - ${docRef.name}`}
      />
      <div>
        <UsersTable {...usersTableProps} />
        {selectedUser && (
          <DocumentPermissionForUserEditor
            docRef={docRef}
            userUuid={selectedUser.uuid}
          />
        )}

        <Button text="Clear Permissions" onClick={showConfirmClear} />
        <ThemedConfirm {...confirmClearProps} />
      </div>
    </div>
  );
};

export default DocumentPermissionEditor;
