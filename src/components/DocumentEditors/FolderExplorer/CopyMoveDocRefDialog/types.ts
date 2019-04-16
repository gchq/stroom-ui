import { PermissionInheritance } from "src/types";
import { DocRefType } from "src/components/DocumentEditors/useDocumentApi/types/base";

export interface Props {
  uuids: string[];
  initialDestination?: DocRefType;
  isOpen: boolean;
  onConfirm: (
    uuids: string[],
    destination: DocRefType,
    permissionInheritance: PermissionInheritance,
  ) => void;
  onCloseDialog: () => void;
}

export type ShowDialog = (uuids: string[], destination?: DocRefType) => void;

export interface UseDialog {
  showDialog: ShowDialog;
  componentProps: Props;
}
