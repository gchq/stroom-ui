import * as React from "react";
import {
  useDocTypePermissions,
  useDocumentPermissionsForUser
} from "../../../api/docPermission";
import {} from "../../../api/docPermission";
import CheckboxSeries from "../../../components/CheckboxSeries";
import Button from "../../../components/Button";
import useRouter from "../../../lib/useRouter";
import { useUser } from "../../../api/userGroups";
import { useDocumentTree } from "../../../api/explorer";

interface Props {
  docRefUuid: string;
  userUuid: string;
}

export const DocumentPermissionForUserEditor = ({
  docRefUuid,
  userUuid
}: Props) => {
  const { history } = useRouter();
  const { findDocRefWithLineage } = useDocumentTree();

  const { node: docRef } = findDocRefWithLineage(docRefUuid);

  const user = useUser(userUuid);
  const permissionsForType = useDocTypePermissions(docRef.type);
  const {
    permissionNames,
    addPermission,
    removePermission
  } = useDocumentPermissionsForUser(docRefUuid, userUuid);

  return (
    <div>
      <h2>{`Document Permissions for Doc ${docRef.type}-${
        docRef.name
      }, user ${user && user.name}`}</h2>
      <Button text="Back" onClick={history.goBack} />

      <CheckboxSeries
        allValues={permissionsForType}
        includedValues={permissionNames}
        addValue={addPermission}
        removeValue={removePermission}
      />
    </div>
  );
};

export default DocumentPermissionForUserEditor;
