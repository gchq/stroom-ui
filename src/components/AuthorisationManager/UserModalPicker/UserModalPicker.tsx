import * as React from "react";
import { useCallback, useState } from "react";

import ThemedModal from "src/components/ThemedModal";
import IconHeader from "src/components/IconHeader";
import UserPicker, { usePicker } from "../UserPicker";
import { BaseProps as PickerBaseProps } from "../UserPicker/types";
import DialogActionButtons from "src/components/DialogActionButtons";

interface BaseProps extends PickerBaseProps {
  onConfirm: (userUuid: string) => void;
}

interface Props extends BaseProps {
  isOpen: boolean;
  onCloseDialog: () => void;
}

export const UserModalPicker = ({
  isOpen,
  onConfirm,
  onCloseDialog,
  ...rest
}: Props) => {
  const { pickerProps } = usePicker(rest);
  const { value: userUuid } = pickerProps;

  const onConfirmLocal = useCallback(() => {
    if (!!userUuid) {
      onConfirm(userUuid);
    }
    onCloseDialog();
  }, [onCloseDialog, onConfirm, userUuid]);

  return (
    <ThemedModal
      isOpen={isOpen}
      header={<IconHeader icon="user" text="Picker User" />}
      content={
        <form>
          <label>User</label>
          <UserPicker {...pickerProps} />
        </form>
      }
      actions={
        <DialogActionButtons
          onConfirm={onConfirmLocal}
          onCancel={onCloseDialog}
        />
      }
    />
  );
};

interface UseDialog {
  componentProps: Props;
  showDialog: () => void;
}

export const useDialog = (baseProps: BaseProps): UseDialog => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    componentProps: {
      ...baseProps,
      isOpen,
      onCloseDialog: useCallback(() => {
        setIsOpen(false);
      }, [setIsOpen]),
    },
    showDialog: useCallback(() => {
      setIsOpen(true);
    }, [setIsOpen]),
  };
};

export default UserModalPicker;
