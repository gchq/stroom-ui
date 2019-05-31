import * as React from "react";
import ThemedModal from "components/ThemedModal";
import { ActivityEditor } from ".";
import useActivity from "../api/useActivity";
import useActivityConfig from "../api/useActivityConfig";
import IconHeader from "components/IconHeader";
import Button from "components/Button";
import ButtonContainer from "components/Button/ButtonContainer";
import Loader from "components/Loader";
import cogoToast from "cogo-toast";

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
  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onAfterUpdate = React.useCallback(
    (message: string) => {
      cogoToast.info(message);
      onClose();
    },
    [onClose],
  );

  const { activity, onPropChange, onCreateOrUpdate, isDirty } = useActivity(
    activityId,
    onAfterUpdate,
  );
  const { editorTitle, editorBody } = useActivityConfig();

  if (!activity || !editorTitle || !editorBody) {
    return <Loader message={`Loading Activity ${activityId}`} />;
  }

  return (
    <ThemedModal
      header={<IconHeader icon="tasks" text={editorTitle} />}
      content={
        <ActivityEditor
          activity={activity}
          editorTitle={editorTitle}
          editorBody={editorBody}
          onPropChange={onPropChange}
        />
      }
      actions={
        <ButtonContainer>
          <Button
            text="Save"
            icon="save"
            appearance="contained"
            action="primary"
            onClick={onCreateOrUpdate}
            disabled={!isDirty}
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
