import * as React from "react";
import ThemedModal from "components/ThemedModal";
import ActivityChooser from ".";
import useActivityConfig from "../api/useActivityConfig";
import IconHeader from "components/IconHeader";
import Button from "components/Button";

interface Props {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
}

const ActivityChooserDialog: React.FunctionComponent<Props> = ({
  isOpen,
  setIsOpen,
}) => {
  const { managerTitle } = useActivityConfig();
  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <ThemedModal
      header={<IconHeader icon="tasks" text={managerTitle} />}
      content={<ActivityChooser />}
      actions={<Button text="Close" onClick={onClose} />}
      isOpen={isOpen}
    />
  );
};

interface UseDialog {
  componentProps: Props;
  showDialog: () => void;
}

export const useDialog = (): UseDialog => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const showDialog = React.useCallback(() => setIsOpen(true), [setIsOpen]);

  return {
    componentProps: {
      isOpen,
      setIsOpen,
    },
    showDialog,
  };
};

export default ActivityChooserDialog;
