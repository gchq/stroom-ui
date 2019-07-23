import * as React from "react";

import ThemedModal from "components/ThemedModal";
import DialogActionButtons from "components/DialogActionButtons";
import useForm from "lib/useForm";
import { NewIndexVolume } from "components/IndexVolumes/api";

interface Props {
  isOpen: boolean;
  onConfirm: (newVolume: NewIndexVolume) => void;
  onCloseDialog: () => void;
}

const initialValues: NewIndexVolume = {
  nodeName: "",
  path: "",
};

const NewIndexVolumeDialog: React.FunctionComponent<Props> = ({
  isOpen,
  onConfirm,
  onCloseDialog,
}) => {
  const {
    value: { nodeName, path },
    useTextInput,
  } = useForm<NewIndexVolume>({
    initialValues,
  });
  const nodeNameProps = useTextInput("nodeName");
  const pathProps = useTextInput("path");

  const onConfirmLocal = React.useCallback(() => {
    if (!!nodeName && !!path) {
      onConfirm({ nodeName, path });
      onCloseDialog();
    } else {
      console.error("Form is invalid in some way", { nodeName, path });
    }
  }, [nodeName, path, onCloseDialog, onConfirm]);

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
  onConfirm: (newNode: NewIndexVolume) => void,
): UseDialog => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return {
    componentProps: {
      isOpen,
      onConfirm,
      onCloseDialog: () => {
        setIsOpen(false);
      },
    },
    showDialog: () => {
      setIsOpen(true);
    },
  };
};

export default NewIndexVolumeDialog;
