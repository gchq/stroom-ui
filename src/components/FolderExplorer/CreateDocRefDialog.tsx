/*
 * Copyright 2018 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { useState, useCallback } from "react";

import IconHeader from "../IconHeader";
import ThemedModal from "../ThemedModal";
import DialogActionButtons from "../Button/DialogActionButtons";
import { DocRefTypePicker } from "../DocRefTypes";
import PermissionInheritancePicker from "../PermissionInheritancePicker";
import { PermissionInheritance, DocRefType } from "../../types";
import useForm from "../../lib/useForm";
// import { required, minLength2 } from "../../lib/reduxUtils";

export interface Props {
  destination?: DocRefType;
  isOpen: boolean;
  onConfirm: (
    docRefType: string,
    docRefName: string,
    permissionInheritance: string
  ) => void;
  onCloseDialog: () => void;
}

interface FormValues {
  docRefType?: string;
  docRefName?: string;
  permissionInheritance: PermissionInheritance;
}

const initialValues: FormValues = {
  docRefName: "New Document",
  permissionInheritance: PermissionInheritance.NONE
};

let CreateDocRefDialog = ({ isOpen, onConfirm, onCloseDialog }: Props) => {
  const {
    currentValues: { docRefType, docRefName, permissionInheritance },
    generateControlledInputProps,
    inputProps: {
      text: { docRefName: docRefNameProps }
    }
  } = useForm<FormValues>({
    initialValues,
    inputs: { text: ["docRefName"] }
  });

  const docRefTypeProps = generateControlledInputProps<string>("docRefType");
  const permissionInheritanceProps = generateControlledInputProps<
    PermissionInheritance
  >("permissionInheritance");

  const onConfirmLocal = useCallback(() => {
    if (!!docRefType && !!docRefName && !!permissionInheritance) {
      onConfirm(docRefType, docRefName, permissionInheritance);
      onCloseDialog();
    } else {
      console.error("Form Invalid", {
        docRefType,
        docRefName,
        permissionInheritance
      });
    }
  }, [docRefType, docRefName, permissionInheritance, onConfirm, onCloseDialog]);

  return (
    <ThemedModal
      isOpen={isOpen}
      onRequestClose={onCloseDialog}
      header={<IconHeader icon="plus" text="Create a New Doc Ref" />}
      content={
        <form>
          <div>
            <label>Doc Ref Type</label>
            <DocRefTypePicker {...docRefTypeProps} />
          </div>
          <div>
            <label>Name</label>
            <input {...docRefNameProps} />
          </div>
          <div>
            <label>Permission Inheritance</label>
            <PermissionInheritancePicker {...permissionInheritanceProps} />
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

/**
 * These are the things returned by the custom hook that allow the owning component to interact
 * with this dialog.
 */
export type UseDialog = {
  /**
   * The owning component is ready to start a deletion process.
   * Calling this will open the dialog, and setup the UUIDs
   */
  showDialog: (destination: DocRefType) => void;
  /**
   * These are the properties that the owning component can just give to the Dialog component
   * using destructing.
   */
  componentProps: Props;
};

/**
 * This is a React custom hook that sets up things required by the owning component.
 */
export const useDialog = (
  onConfirm: (
    docRefType: string,
    docRefName: string,
    permissionInheritance: string
  ) => void
): UseDialog => {
  const [destination, setDestination] = useState<DocRefType | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    componentProps: {
      destination,
      isOpen,
      onConfirm,
      onCloseDialog: () => {
        setIsOpen(false);
        setDestination(undefined);
      }
    },
    showDialog: _destination => {
      setIsOpen(true);
      setDestination(_destination);
    }
  };
};

export default CreateDocRefDialog;
