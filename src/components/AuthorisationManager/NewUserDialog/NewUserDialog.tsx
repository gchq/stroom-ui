import * as React from "react";

import ThemedModal from "src/components/ThemedModal";
import DialogActionButtons from "src/components/DialogActionButtons";
import useForm from "src/lib/useForm";

interface FormValues {
  name: string;
}

interface Props {
  isOpen: boolean;
  isGroup: boolean;
  onCreateUser: (name: string, isGroup: boolean) => void;
  onCloseDialog: () => void;
}

// You MUST use a memo-ized/global constant here or you end up with render recursion
const defaultValues: FormValues = {
  name: "",
};

const NewUserDialog: React.FunctionComponent<Props> = ({
  isOpen,
  isGroup,
  onCreateUser,
  onCloseDialog,
}) => {
  const {
    value: { name },
    useTextInput,
  } = useForm<FormValues>({
    initialValues: defaultValues,
  });
  const nameProps = useTextInput("name");

  const onConfirm = React.useCallback(() => {
    if (name) {
      onCreateUser(name, isGroup);
      onCloseDialog();
    }
  }, [onCreateUser, onCloseDialog, name, isGroup]);

  return (
    <ThemedModal
      isOpen={isOpen}
      header={<h2>Create {isGroup ? "User" : "Group"}</h2>}
      content={
        <form>
          <div>
            <label>Name</label>
            <input {...nameProps} />
          </div>
        </form>
      }
      actions={
        <DialogActionButtons onCancel={onCloseDialog} onConfirm={onConfirm} />
      }
    />
  );
};

interface UseDialog {
  componentProps: Props;
  showDialog: () => void;
}

interface UseDialogProps {
  isGroup: boolean;
  onCreateUser: (name: string, isGroup: boolean) => void;
}

export const useDialog = ({
  onCreateUser,
  isGroup,
}: UseDialogProps): UseDialog => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return {
    componentProps: {
      isOpen,
      isGroup,
      onCreateUser,
      onCloseDialog: React.useCallback(() => {
        setIsOpen(false);
      }, [setIsOpen]),
    },
    showDialog: React.useCallback(() => {
      setIsOpen(true);
    }, [setIsOpen]),
  };
};

export default NewUserDialog;
