import * as React from "react";
import {
  useDocTypePermissions,
  useDocumentPermissionsForUser
} from "../../../api/docPermission";
import {} from "../../../api/docPermission";
import CheckboxSeries from "../../../components/CheckboxSeries";
import Button from "../../../components/Button";
import useRouter from "../../../lib/useRouter";
import { useDocRefWithLineage } from "../../../api/explorer";
import { useUser } from "../../../api/userGroups";

interface Props {
  docRefUuid: string;
  userUuid: string;
}

export const DocumentPermissionForUserEditor = ({
  docRefUuid,
  userUuid
}: Props) => {
  const { history } = useRouter();
  const { node: docRef } = useDocRefWithLineage(docRefUuid);
  const user = useUser(userUuid);
  const permissionsForType = useDocTypePermissions(docRef.type);
  const {
    permissions,
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
        includedValues={permissions}
        addValue={addPermission}
        removeValue={removePermission}
      />
    </div>
  );
};

export default DocumentPermissionForUserEditor;
