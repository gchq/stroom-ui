import * as React from "react";

import ThemedModal from "src/components/ThemedModal";
import DialogActionButtons from "src/components/DialogActionButtons";
import useForm from "src/lib/useForm";

interface FormValues {
  name: string;
  isGroup: boolean;
}

interface Props {
  isOpen: boolean;
  onCreateUser: (name: string, isGroup: boolean) => void;
  onCloseDialog: () => void;
}

// You MUST use a memo-ized/global constant here or you end up with render recursion
const defaultValues: FormValues = {
  name: "",
  isGroup: false,
};

const NewUserDialog: React.FunctionComponent<Props> = ({
  isOpen,
  onCreateUser,
  onCloseDialog,
}) => {
  const {
    value: { name, isGroup },
    useTextInput,
    useCheckboxInput,
  } = useForm<FormValues>({
    initialValues: defaultValues,
  });
  const nameProps = useTextInput("name");
  const isGroupProps = useCheckboxInput("isGroup");

  const onConfirm = React.useCallback(() => {
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

interface UseDialog {
  componentProps: Props;
  showDialog: () => void;
}

export const useDialog = (
  onCreateUser: (name: string, isGroup: boolean) => void,
): UseDialog => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return {
    componentProps: {
      isOpen,
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
