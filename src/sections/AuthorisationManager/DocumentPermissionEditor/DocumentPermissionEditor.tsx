import * as React from "react";
import { useCallback } from "react";
import ReactTable from "react-table";

import IconHeader from "../../../components/IconHeader";
import useDocumentPermissions from "../../../api/docPermission/useDocumentPermissions";
import { DocRefType } from "../../../types";
import Button from "../../../components/Button";
import ThemedConfirm, {
  useDialog as useThemedConfirm
} from "../../../components/ThemedConfirm";
import DocumentPermissionForUserEditor from "../DocumentPermissionForUserEditor";
import {
  useSelectableReactTable,
  SelectionBehaviour
} from "../../../lib/useSelectableItemListing";

export interface Props {
  docRef: DocRefType;
}
const COLUMNS = [
  {
    id: "userUuid",
    Header: "UUID",
    accessor: (uuid: string) => uuid
  }
];

export const DocumentPermissionEditor = ({ docRef }: Props) => {
  const { clearPermissions, permissionsByUser } = useDocumentPermissions(
    docRef.uuid
  );

  const { tableProps, selectedItems } = useSelectableReactTable(
    {
      items: Object.keys(permissionsByUser),
      getKey: d => d,
      selectionBehaviour: SelectionBehaviour.SINGLE
    },
    { columns: COLUMNS }
  );

  const selectedUserUuid: string | undefined =
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
        <ReactTable {...tableProps} />
        {selectedUserUuid && (
          <DocumentPermissionForUserEditor
            docRef={docRef}
            userUuid={selectedUserUuid}
          />
        )}

        <Button text="Clear Permissions" onClick={showConfirmClear} />
        <ThemedConfirm {...confirmClearProps} />
      </div>
    </div>
  );
};

export default DocumentPermissionEditor;
