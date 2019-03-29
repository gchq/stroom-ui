import {DocRefType, PermissionInheritance} from '../../../../types';

export interface Props {
  uuids: Array<string>;
  initialDestination?: DocRefType;
  isOpen: boolean;
  onConfirm: (
    uuids: Array<string>,
    destination: DocRefType,
    permissionInheritance: PermissionInheritance,
  ) => void;
  onCloseDialog: () => void;
}

export type ShowDialog = (
  uuids: Array<string>,
  destination?: DocRefType,
) => void;

export type UseDialog = {
  showDialog: ShowDialog;
  componentProps: Props;
};
