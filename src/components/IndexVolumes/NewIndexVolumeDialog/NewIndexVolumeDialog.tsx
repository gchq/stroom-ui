import * as React from "react";
import { useState, useCallback } from "react";

import ThemedModal from "src/components/ThemedModal";
import DialogActionButtons from "src/components/DialogActionButtons";
import useForm from "src/lib/useForm";

interface Props {
  isOpen: boolean;
  onConfirm: (nodeName: string, path: string) => void;
  onCloseDialog: () => void;
}

interface FormValues {
  nodeName: string;
  path: string;
}

const initialValues: FormValues = {
  nodeName: "",
  path: ""
};

const NewIndexVolumeDialog = ({ isOpen, onConfirm, onCloseDialog }: Props) => {
  const {
    value: { nodeName, path },
    useTextInput
  } = useForm<FormValues>({
    initialValues
  });
  const nodeNameProps = useTextInput("nodeName");
  const pathProps = useTextInput("path");

  const onConfirmLocal = useCallback(() => {
    if (!!nodeName && !!path) {
      onConfirm(nodeName, path);
      onCloseDialog();
    } else {
      console.error("Form is invalid in some way", { nodeName, path });
    }
  }, [onConfirm]);

  return (
    <ThemedModal
      isOpen={isOpen}
      header={<h2>Create New Index Volume</h2>}
      content={
        <form>
          <label>Node Name</label>
          <input {...nodeNameProps} />
          <label>Path</label>
          <input {...pathProps} />
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

interface UseDialog {
  componentProps: Props;
  showDialog: () => void;
}

export const useDialog = (
  onConfirm: (nodeName: string, path: string) => void
): UseDialog => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    componentProps: {
      isOpen,
      onConfirm,
      onCloseDialog: () => {
        setIsOpen(false);
      }
    },
    showDialog: () => {
      setIsOpen(true);
    }
  };
};

export default NewIndexVolumeDialog;
