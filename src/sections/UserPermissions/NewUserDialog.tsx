import * as React from "react";
import { useState } from "react";

import { Formik, Field } from "formik";

import useApi from "./useUserPermissionsApi";
import ThemedModal from "../../components/ThemedModal";
import DialogActionButtons from "../../components/Button/DialogActionButtons";

export interface Props {
  isOpen: boolean;
  onCloseDialog: () => void;
}

interface FormValues {
  name: string;
  isGroup: boolean;
}

const NewUserDialog = ({ isOpen, onCloseDialog }: Props) => {
  const api = useApi();

  return (
    <Formik<FormValues>
      initialValues={{
        name: "",
        isGroup: false
      }}
      onSubmit={values => {
        if (values.name) {
          api.createUser(values.name, values.isGroup);
          onCloseDialog();
        }
      }}
    >
      {({ submitForm }: Formik) => (
        <ThemedModal
          isOpen={isOpen}
          header={<h2>Create User/Group</h2>}
          content={
            <form>
              <div>
                <label>Name</label>
                <Field name="name" />
                <label>Is Group</label>
                <Field name="isGroup" type="checkbox" />
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

export interface UseDialog {
  componentProps: Props;
  showDialog: () => void;
}

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    componentProps: {
      isOpen,
      onCloseDialog: () => {
        setIsOpen(false);
      }
    },
    showDialog: () => {
      setIsOpen(true);
    }
  };
};

export default NewUserDialog;
