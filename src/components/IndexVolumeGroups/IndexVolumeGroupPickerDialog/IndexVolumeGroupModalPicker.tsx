import * as React from "react";

import IndexVolumeGroupPicker, {
  usePicker,
} from "../IndexVolumeGroupPicker/IndexVolumeGroupPicker";
import ThemedModal from "src/components/ThemedModal";
import IconHeader from "src/components/IconHeader";
import Button from "src/components/Button";
import DialogActionButtons from "src/components/DialogActionButtons";
import { useIndexVolumeGroups } from "src/components/IndexVolumeGroups/api/indexVolumeGroup";
import { PickerBaseProps } from "../IndexVolumeGroupPicker/types";

interface BaseProps extends PickerBaseProps {
  onConfirm: (groupName: string) => void;
}

interface Props extends BaseProps {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
}

export const IndexVolumeGroupModalPicker: React.FunctionComponent<Props> = ({
  onConfirm,
  isOpen,
  setIsOpen,
  valuesToFilterOut,
}) => {
  const volumeGroupPickerProps = usePicker({ valuesToFilterOut });
  const {
    reset: resetVolumeGroup,
    value: volumeGroupName,
  } = volumeGroupPickerProps;

  const [isNewGroup, setIsNewGroup] = React.useState<boolean>(false);
  const [newGroupName, setNewGroupName] = React.useState<string>("");

  const { createIndexVolumeGroup } = useIndexVolumeGroups();

  const onNewGroupNameChange: React.ChangeEventHandler<
    HTMLInputElement
  > = React.useCallback(({ target: { value } }) => setNewGroupName(value), [
    setNewGroupName,
  ]);
  const toggleNewGroup: React.MouseEventHandler<
    HTMLButtonElement
  > = React.useCallback(() => setIsNewGroup(!isNewGroup), [
    setIsNewGroup,
    isNewGroup,
  ]);
  const newGroupButtonText = isNewGroup ? "Choose Existing" : "Create New";

  const onClose = React.useCallback(() => {
    resetVolumeGroup();
    setIsOpen(false);
    setIsNewGroup(false);
  }, [resetVolumeGroup, setIsOpen, setIsNewGroup]);

  const onConfirmLocal = React.useCallback(() => {
    if (isNewGroup) {
      // Todo, the response to this is reported to an umounted component...
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
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return {
    componentProps: {
      ...props,
      isOpen,
      setIsOpen,
    },
    showDialog: () => setIsOpen(true),
  };
};

export default IndexVolumeGroupModalPicker;
