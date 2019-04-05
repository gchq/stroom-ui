import * as React from "react";

import IconHeader from "src/components/IconHeader";
import Button from "src/components/Button";
import ThemedModal from "src/components/ThemedModal";
// import { required, minLength2 } from "src/lib/formUtils";
import { ElementDefinition } from "src/types";
import useForm from "src/lib/useForm";
import { Props, OnAddElement, UseDialog } from "./types";

interface FormValues {
  newName: string;
}

export const AddElementModal: React.FunctionComponent<Props> = ({
  isOpen,
  onAddElement,
  onCloseDialog,
  parentId,
  elementDefinition,
  existingNames,
}) => {
  const initialValues = React.useMemo<FormValues>(
    () => ({
      newName: !!elementDefinition
        ? elementDefinition.type
        : "no element definition",
    }),
    [elementDefinition],
  );

  const onUniqueNameCheck = React.useCallback(
    (value: string) => {
      return existingNames.includes(value);
    },
    [existingNames],
  );

  const {
    value: { newName },
    useTextInput,
  } = useForm<FormValues>({
    initialValues,
    onValidate: React.useCallback(v => {
      onUniqueNameCheck(v.newName);
    }, []),
  });
  const newNameProps = useTextInput("newName");

  const onAddElementLocal = React.useCallback(() => {
    if (!!parentId && !!elementDefinition && !!newName) {
      onAddElement({ parentId, elementDefinition, name: newName });
      onCloseDialog();
    } else {
      console.error("Form invalid");
    }
  }, [onAddElement, onCloseDialog, parentId, elementDefinition, newName]);

  if (!elementDefinition || !parentId) {
    return null;
  }

  // TODO figure this out
  // const submitDisabled = invalid || submitting;

  return (
    <ThemedModal
      isOpen={isOpen}
      onRequestClose={onCloseDialog}
      header={<IconHeader icon="file" text="Add New Element" />}
      content={
        <form>
          <div>
            <label>Name</label>
            <input {...newNameProps} />
          </div>
        </form>
      }
      actions={
        <React.Fragment>
          <Button
            text="Submit"
            // disabled={submitDisabled}
            onClick={onAddElementLocal}
          />
          <Button text="Cancel" onClick={onCloseDialog} />
        </React.Fragment>
      }
    />
  );
};

export const useDialog = (onAddElement: OnAddElement): UseDialog => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [parentId, setParentId] = React.useState<string | undefined>(undefined);
  const [elementDefinition, setElementDefinition] = React.useState<
    ElementDefinition | undefined
  >(undefined);
  const [existingNames, setExistingNames] = React.useState<string[]>([]);

  return {
    showDialog: (_parentId, _elementDefinition, _existingNames) => {
      setParentId(_parentId);
      setElementDefinition(_elementDefinition);
      setExistingNames(_existingNames);
      setIsOpen(true);
    },
    componentProps: {
      onAddElement,
      elementDefinition,
      parentId,
      existingNames,
      isOpen,
      onCloseDialog: () => {
        setParentId(undefined);
        setElementDefinition(undefined);
        setExistingNames([]);
        setIsOpen(false);
      },
    },
  };
};

export default AddElementModal;
