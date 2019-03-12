import * as React from "react";
import { useState, useCallback } from "react";

import UserPicker, { usePicker } from "../UserPicker";
import ThemedModal from "../../../components/ThemedModal";
import IconHeader from "../../../components/IconHeader";
import Button, { DialogActionButtons } from "../../../components/Button";
import { useManageUsers } from "../../../api/userGroups";

interface BaseProps {
  onConfirm: (groupUuid: string) => void;
}

interface Props extends BaseProps {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
}

export const UserGroupPickOrCreateDialog = ({
  onConfirm,
  isOpen,
  setIsOpen
}: Props) => {
  const { reset: resetUserGroup, pickerProps: useGroupPickerProps } = usePicker(
    "Group"
  );
  const { value: userGroupUuid } = useGroupPickerProps;

  const [isNewGroup, setIsNewGroup] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>("");

  const { createUser } = useManageUsers();

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
    resetUserGroup();
    setIsOpen(false);
    setIsNewGroup(false);
  }, [resetUserGroup, setIsOpen, setIsNewGroup]);

  const onConfirmLocal = useCallback(() => {
    if (isNewGroup) {
      createUser(newGroupName, true)
        .then(newGroup => onConfirm(newGroup.uuid))
        .finally(onClose);
    } else if (!!userGroupUuid) {
      onConfirm(userGroupUuid);
      onClose();
    }
  }, [onConfirm, onClose, createUser, newGroupName, isNewGroup]);

  return (
    <ThemedModal
      isOpen={isOpen}
      header={<IconHeader icon="plus" text="Add Users to Group" />}
      content={
        <div>
          {isNewGroup ? (
            <React.Fragment>
              <label>New User Group Name</label>
              <input value={newGroupName} onChange={onNewGroupNameChange} />
            </React.Fragment>
          ) : (
            <UserPicker {...useGroupPickerProps} />
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

export default UserGroupPickOrCreateDialog;
