import * as React from "react";
import { useState, useCallback } from "react";

import IndexVolumeGroupPicker, {
  usePicker
} from "../IndexVolumeGroupPicker/IndexVolumeGroupPicker";
import ThemedModal from "../../../components/ThemedModal";
import IconHeader from "../../../components/IconHeader";
import Button from "../../../components/Button";
import DialogActionButtons from "../../../components/DialogActionButtons";
import { useIndexVolumeGroups } from "../../../api/indexVolumeGroup";
import { PickerBaseProps } from "../IndexVolumeGroupPicker/types";

interface BaseProps extends PickerBaseProps {
  onConfirm: (groupName: string) => void;
}

interface Props extends BaseProps {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
}

export const IndexVolumeGroupModalPicker = ({
  onConfirm,
  isOpen,
  setIsOpen,
  valuesToFilterOut
}: Props) => {
  const volumeGroupPickerProps = usePicker({ valuesToFilterOut });
  const {
    reset: resetVolumeGroup,
    value: volumeGroupName
  } = volumeGroupPickerProps;

  const [isNewGroup, setIsNewGroup] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>("");

  const { createIndexVolumeGroup } = useIndexVolumeGroups();

  const onNewGroupNameChange: React.ChangeEventHandler<
    HTMLInputElement
  > = useCallback(({ target: { value } }) => setNewGroupName(value), [
    setNewGroupName
  ]);
  const toggleNewGroup: React.MouseEventHandler<
    HTMLButtonElement
  > = useCallback(() => setIsNewGroup(!isNewGroup), [
    setIsNewGroup,
    isNewGroup
  ]);
  const newGroupButtonText = isNewGroup ? "Choose Existing" : "Create New";

  const onClose = useCallback(() => {
    resetVolumeGroup();
    setIsOpen(false);
    setIsNewGroup(false);
  }, [resetVolumeGroup, setIsOpen, setIsNewGroup]);

  const onConfirmLocal = useCallback(() => {
    if (isNewGroup) {
      createIndexVolumeGroup(newGroupName);
      onConfirm(newGroupName);
    } else if (!!volumeGroupName) {
      onConfirm(volumeGroupName);
    }
    onClose();
  }, [onClose, onConfirm, newGroupName, isNewGroup, createIndexVolumeGroup]);

  return (
    <ThemedModal
      isOpen={isOpen}
      header={<IconHeader icon="plus" text="Add Volume to Group" />}
      content={
        <div>
          {isNewGroup ? (
            <React.Fragment>
              <label>New Group Name</label>
              <input value={newGroupName} onChange={onNewGroupNameChange} />
            </React.Fragment>
          ) : (
            <IndexVolumeGroupPicker {...volumeGroupPickerProps} />
          )}

          <Button text={newGroupButtonText} onClick={toggleNewGroup} />
        </div>
      }
      actions={
        <DialogActionButtons onConfirm={onConfirmLocal} onCancel={onClose} />
      }
    />
  );
};

interface UseDialog {
  componentProps: Props;
  showDialog: () => void;
}

export const useDialog = (props: BaseProps): UseDialog => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    componentProps: {
      ...props,
      isOpen,
      setIsOpen
    },
    showDialog: () => setIsOpen(true)
  };
};

export default IndexVolumeGroupModalPicker;
