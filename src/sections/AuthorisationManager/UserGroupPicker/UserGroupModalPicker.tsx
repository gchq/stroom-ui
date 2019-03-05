import * as React from "react";
import { useState, useCallback } from "react";

import UserGroupPicker, { usePicker } from "./UserGroupPicker";
import ThemedModal from "../../../components/ThemedModal";
import IconHeader from "../../../components/IconHeader";
import Button, { DialogActionButtons } from "../../../components/Button";
import useUserGroupApi from "../../../api/userGroups";

export interface BaseProps {
  onConfirm: (groupUuid: string) => void;
}

export interface Props extends BaseProps {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
}

export const UserGroupModalPicker = ({
  onConfirm,
  isOpen,
  setIsOpen
}: Props) => {
  const useGroupPickerProps = usePicker();
  const { reset: resetUserGroup, value: userGroupUuid } = useGroupPickerProps;

  const [isNewGroup, setIsNewGroup] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>("");

  const { createUser } = useUserGroupApi();

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
      createUser(newGroupName, true).then(newGroup => onConfirm(newGroup.uuid));
    } else if (!!userGroupUuid) {
      onConfirm(userGroupUuid);
    }
    onClose();
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
            <UserGroupPicker {...useGroupPickerProps} />
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

export interface UseDialog {
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

export default UserGroupModalPicker;
