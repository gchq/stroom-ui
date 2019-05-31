import * as React from "react";
import ThemedModal from "components/ThemedModal";
import { ActivityEditor } from ".";
import useActivityConfig from "../api/useActivityConfig";
import IconHeader from "components/IconHeader";
import Button from "components/Button";
import ButtonContainer from "components/Button/ButtonContainer";

interface Props {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
  activityId?: string;
}

const ActivityEditorDialog: React.FunctionComponent<Props> = ({
  isOpen,
  setIsOpen,
  activityId,
}) => {
  const { editorTitle } = useActivityConfig();
  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <ThemedModal
      header={<IconHeader icon="tasks" text={editorTitle} />}
      content={<ActivityEditor activityId={activityId} />}
      actions={
        <ButtonContainer>
          <Button
            text="Save"
            icon="save"
            appearance="contained"
            action="primary"
            onClick={onClose}
          />
          <Button
            text="Close"
            icon="times"
            appearance="contained"
            action="secondary"
            onClick={onClose}
          />
        </ButtonContainer>
      }
      isOpen={isOpen}
      shouldFocusAfterRender={true}
    />
  );
};

interface UseDialog {
  componentProps: Props;
  showDialog: (activityId?: string) => void;
}

export const useDialog = (): UseDialog => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [activityId, setActivityId] = React.useState<string>(undefined);

  const showDialog = React.useCallback(
    activityId => {
      setActivityId(activityId);
      setIsOpen(true);
    },
    [setIsOpen, setActivityId],
  );

  return {
    componentProps: {
      isOpen,
      setIsOpen,
      activityId,
    },
    showDialog,
  };
};

export default ActivityEditorDialog;
