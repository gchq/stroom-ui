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
  const permissionsForType = useDocTypePermissions(docRef.type);
  const {
    permissions,
    addPermission,
    removePermission
  } = useDocumentPermissionsForUser(docRefUuid, userUuid);

  return (
    <div>
      {`Document Permissions for Doc ${docRef.type}-${
        docRef.name
      }, user ${userUuid}`}
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
