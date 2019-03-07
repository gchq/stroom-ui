import * as React from "react";
import { useState, useMemo, useCallback } from "react";

import IconHeader from "../IconHeader";
import Button from "../Button";
import ThemedModal from "../ThemedModal";
// import { required, minLength2 } from "../../lib/reduxUtils";
import { ElementDefinition } from "../../types";
import useForm from "../../lib/useForm";

export type OnAddElement = (
  parentId: string,
  elementDefinition: ElementDefinition,
  name: string
) => void;

export interface Props {
  isOpen: boolean;
  onCloseDialog: () => void;
  onAddElement: OnAddElement;
  existingNames: Array<string>;
  parentId?: string;
  elementDefinition?: ElementDefinition;
}

interface FormValues {
  newName: string;
}

const AddElementModal = ({
  isOpen,
  onAddElement,
  onCloseDialog,
  parentId,
  elementDefinition,
  existingNames
}: Props) => {
  const initialValues = useMemo<FormValues>(
    () => ({
      newName: !!elementDefinition
        ? elementDefinition.type
        : "no element definition"
    }),
    [elementDefinition]
  );

  const onUniqueNameCheck = useCallback(
    (value: string) => {
      return existingNames.includes(value);
    },
    [existingNames]
  );

  const {
    currentValues: { newName },
    generateTextInput
  } = useForm<FormValues>({
    initialValues,
    onValidate: useCallback(v => {
      onUniqueNameCheck(v.newName);
    }, [])
  });
  const newNameProps = generateTextInput("newName");

  const onAddElementLocal = useCallback(() => {
    if (!!parentId && !!elementDefinition && !!newName) {
      onAddElement(parentId, elementDefinition, newName);
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

export type ShowDialog = (
  parentId: string,
  elementDefinition: ElementDefinition,
  existingNames: Array<string>
) => void;

export interface UseDialog {
  componentProps: Props;
  showDialog: ShowDialog;
}

export const useDialog = (onAddElement: OnAddElement): UseDialog => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [parentId, setParentId] = useState<string | undefined>(undefined);
  const [elementDefinition, setElementDefinition] = useState<
    ElementDefinition | undefined
  >(undefined);
  const [existingNames, setExistingNames] = useState<Array<string>>([]);

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
      }
    }
  };
};

export default AddElementModal;
