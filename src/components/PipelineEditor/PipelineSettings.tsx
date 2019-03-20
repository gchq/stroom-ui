import * as React from "react";
import { useState, useMemo, useCallback } from "react";

import Button from "../Button";
import IconHeader from "../IconHeader";
import ThemedModal from "../ThemedModal";
import useForm from "../../lib/useForm";

interface Props {
  isOpen: boolean;
  initialDescription: string;
  updateValues: (description: string) => void;
  onCloseDialog: () => void;
}

interface FormValues {
  description: string;
}

const PipelineSettings = ({
  isOpen,
  initialDescription,
  updateValues,
  onCloseDialog
}: Props) => {
  const initialValues = useMemo(() => ({ description: initialDescription }), [
    initialDescription
  ]);

  const {
    value: { description },
    useTextInput
  } = useForm<FormValues>({
    initialValues
  });
  const descriptionProps = useTextInput("description");

  const onConfirmLocal = useCallback(() => {
    if (!!description) {
      updateValues(description);
      onCloseDialog();
    } else {
      console.error("Form invalid", { description });
    }
  }, [description]);

  return (
    <ThemedModal
      isOpen={isOpen}
      onRequestClose={onCloseDialog}
      header={<IconHeader icon="cog" text="Pipeline Settings" />}
      content={
        <form>
          <div>
            <label>Description</label>
            <input {...descriptionProps} autoFocus />
          </div>
        </form>
      }
      actions={
        <React.Fragment>
          <Button
            text="Submit"
            // disabled={invalid || submitting}
            onClick={onConfirmLocal}
          />
          <Button text="Cancel" onClick={onCloseDialog} />
        </React.Fragment>
      }
    />
  );
};

type UseDialog = {
  /**
   * The owning component is ready to start a deletion process.
   * Calling this will open the dialog, and setup the UUIDs
   */
  showDialog: (_initialDescription: string) => void;
  /**
   * These are the properties that the owning component can just give to the Dialog component
   * using destructing.
   */
  componentProps: Props;
};

export const useDialog = (
  updateValues: (description: string) => void
): UseDialog => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialDescription, setInitialDescription] = useState<string>("");

  return {
    showDialog: (_initialDescription: string) => {
      setIsOpen(true);
      setInitialDescription(_initialDescription);
    },
    componentProps: {
      isOpen,
      onCloseDialog: () => {
        setIsOpen(false);
      },
      initialDescription,
      updateValues
    }
  };
};

export default PipelineSettings;
