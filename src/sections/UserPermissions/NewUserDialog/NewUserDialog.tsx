import * as React from "react";
import { useState, useCallback } from "react";

import ThemedModal from "../../../components/ThemedModal";
import DialogActionButtons from "../../../components/Button/DialogActionButtons";
import useForm from "../../../lib/useForm";

interface FormValues {
  name: string;
  isGroup: boolean;
}

export interface Props {
  isOpen: boolean;
  onCreateUser: (name: string, isGroup: boolean) => void;
  onCloseDialog: () => void;
}

// You MUST use a memo-ized/global constant here or you end up with render recursion
const defaultValues: FormValues = {
  name: "",
  isGroup: false
};

const NewUserDialog = ({ isOpen, onCreateUser, onCloseDialog }: Props) => {
  const {
    currentValues: { name, isGroup },
    inputProps: {
      text: { name: nameProps },
      checkbox: { isGroup: isGroupProps }
    }
  } = useForm<FormValues>({
    initialValues: defaultValues,
    inputs: { text: ["name"], checkbox: ["isGroup"] }
  });

  const onConfirm = useCallback(() => {
    if (name) {
      onCreateUser(name, isGroup || false);
      onCloseDialog();
    }
  }, [onCreateUser, onCloseDialog, name, isGroup]);

  return (
    <ThemedModal
      isOpen={isOpen}
      header={<h2>Create User/Group</h2>}
      content={
        <form>
          <div>
            <label>Name</label>
            <input {...nameProps} />
            <label>Is Group</label>
            <input {...isGroupProps} />
          </div>
        </form>
      }
      actions={
        <DialogActionButtons onCancel={onCloseDialog} onConfirm={onConfirm} />
      }
    />
  );
};

export interface UseDialog {
  componentProps: Props;
  showDialog: () => void;
}

export const useDialog = (
  onCreateUser: (name: string, isGroup: boolean) => void
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    componentProps: {
      isOpen,
      onCreateUser,
      onCloseDialog: useCallback(() => {
        setIsOpen(false);
      }, [setIsOpen])
    },
    showDialog: useCallback(() => {
      setIsOpen(true);
    }, [setIsOpen])
  };
};

export default NewUserDialog;
