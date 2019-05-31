import * as React from "react";
import ThemedModal from "components/ThemedModal";
import ActivityChooser from ".";
import useActivityConfig from "../api/useActivityConfig";
import IconHeader from "components/IconHeader";
import Button from "components/Button";
import ButtonContainer from "components/Button/ButtonContainer";

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
      width="800px"
      height="600px"
      header={<IconHeader icon="tasks" text={managerTitle} />}
      content={<ActivityChooser />}
      actions={
        <ButtonContainer>
          <Button
            action="primary"
            appearance="contained"
            icon="check"
            text="Close"
            onClick={onClose}
          />
        </ButtonContainer>
      }
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
