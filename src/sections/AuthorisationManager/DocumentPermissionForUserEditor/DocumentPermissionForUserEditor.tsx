import * as React from "react";
import { DocRefType } from "../../../types";
import {
  useDocTypePermissions,
  useDocumentPermissionsForUser
} from "../../../api/docPermission";
import {} from "../../../api/docPermission";
import CheckboxSeries from "../../../components/CheckboxSeries";

interface Props {
  docRef: DocRefType;
  userUuid: string;
}

export const DocumentPermissionForUserEditor = ({
  docRef,
  userUuid
}: Props) => {
  const permissionsForType = useDocTypePermissions(docRef.type);
  const {
    permissions,
    addPermission,
    removePermission
  } = useDocumentPermissionsForUser(docRef.uuid, userUuid);

  return (
    <div>
      {`Document Permissions for Doc ${docRef.type}-${
        docRef.name
      }, user ${userUuid}`}

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
