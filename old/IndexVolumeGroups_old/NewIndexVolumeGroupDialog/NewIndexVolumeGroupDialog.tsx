import * as React from "react";

import ThemedModal from "components/ThemedModal";
import DialogActionButtons from "components/DialogActionButtons";
import useForm from "lib/useForm";

interface Props {
  isOpen: boolean;
  onConfirm: (name: string) => void;
  onCloseDialog: () => void;
}

interface FormValues {
  name: string;
}

const initialValues: FormValues = {
  name: "New Group",
};

const NewIndexVolumeGroupDialog: React.FunctionComponent<Props> = ({
  isOpen,
  onConfirm,
  onCloseDialog,
}) => {
  const {
    useTextInput,
    value: { name },
  } = useForm<FormValues>({
    initialValues,
  });
  const nameProps = useTextInput("name");

  const onConfirmLocal = React.useCallback(() => {
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

interface UseDialog {
  showDialog: () => void;
  componentProps: Props;
}

export const useDialog = (onConfirm: (name: string) => void): UseDialog => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return {
    showDialog: () => setIsOpen(true),
    componentProps: {
      onConfirm,
      onCloseDialog: () => setIsOpen(false),
      isOpen,
    },
  };
};

export default NewIndexVolumeGroupDialog;
