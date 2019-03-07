import * as React from "react";
import { DocRefType } from "../../../types";
import useDocumentPermissionsForUser from "../../../api/docPermission/useDocumentPermissionsForUser";

interface Props {
  docRef: DocRefType;
  userUuid: string;
}

export const DocumentPermissionForUserEditor = ({
  docRef,
  userUuid
}: Props) => {
  const { permissions } = useDocumentPermissionsForUser(docRef.uuid, userUuid);

  return (
    <div>
      {`Document Permissions for Doc ${docRef.type}-${
        docRef.name
      }, user ${userUuid}`}
      <ul>
        {permissions.map(p => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentPermissionForUserEditor;
