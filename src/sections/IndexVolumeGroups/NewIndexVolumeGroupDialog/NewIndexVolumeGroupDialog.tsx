import * as React from "react";
import { useState, useCallback } from "react";

import ThemedModal from "../../../components/ThemedModal";
import DialogActionButtons from "../../../components/Button/DialogActionButtons";
import useForm from "../../../lib/useForm";

export interface Props {
  isOpen: boolean;
  onConfirm: (name: string) => void;
  onCloseDialog: () => void;
}

interface FormValues {
  name: string;
}

const initialValues: FormValues = {
  name: "New Group"
};

const NewIndexVolumeGroupDialog = ({
  isOpen,
  onConfirm,
  onCloseDialog
}: Props) => {
  const {
    generateTextInput,
    currentValues: { name }
  } = useForm<FormValues>({
    initialValues
  });
  const nameProps = generateTextInput("name");

  const onConfirmLocal = useCallback(() => {
    if (!!name) {
      onConfirm(name);
      onCloseDialog();
    } else {
      console.error("Form invalid somehow");
    }
  }, [name, onConfirm, onCloseDialog]);

  return (
    <ThemedModal
      isOpen={isOpen}
      header={<h2>Create New Index Volume Group</h2>}
      content={
        <form>
          <div>
            <label>Name</label>
            <input {...nameProps} />
          </div>
        </form>
      }
      actions={
        <DialogActionButtons
          onCancel={onCloseDialog}
          onConfirm={onConfirmLocal}
        />
      }
    />
  );
};

export interface OpenDialogProps {}

export interface UseDialog {
  showDialog: () => void;
  componentProps: Props;
}

export const useDialog = (onConfirm: (name: string) => void): UseDialog => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    showDialog: () => setIsOpen(true),
    componentProps: {
      onConfirm,
      onCloseDialog: () => setIsOpen(false),
      isOpen
    }
  };
};

export default NewIndexVolumeGroupDialog;
