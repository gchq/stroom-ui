import * as React from "react";
import { useState } from "react";

import { Formik, Field } from "formik";

import useApi from "./useIndexVolumeGroupApi";
import ThemedModal from "../../components/ThemedModal";
import DialogActionButtons from "../../components/Button/DialogActionButtons";

export interface Props {
  isOpen: boolean;
  onCloseDialog: () => void;
}

interface FormValues {
  name: string;
}

const NewIndexVolumeGroupDialog = ({ isOpen, onCloseDialog }: Props) => {
  const api = useApi();

  return (
    <Formik<FormValues>
      initialValues={{
        name: ""
      }}
      onSubmit={values => {
        if (values.name) {
          api.createIndexVolumeGroup(values.name);
          onCloseDialog();
        }
      }}
    >
      {({ submitForm }: Formik) => (
        <ThemedModal
          isOpen={isOpen}
          header={<h2>Create New Index Volume Group</h2>}
          content={
            <form>
              <div>
                <label>Name</label>
                <Field name="name" />
              </div>
            </form>
          }
          actions={
            <DialogActionButtons
              onCancel={onCloseDialog}
              onConfirm={submitForm}
            />
          }
        />
      )}
    </Formik>
  );
};

export interface OpenDialogProps {}

export interface UseDialog {
  showDialog: () => void;
  componentProps: Props;
}

export const useDialog = (): UseDialog => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    showDialog: () => setIsOpen(true),
    componentProps: {
      onCloseDialog: () => setIsOpen(false),
      isOpen
    }
  };
};

export default NewIndexVolumeGroupDialog;
