import * as React from "react";
import { useState } from "react";

import { Formik, Field } from "formik";

import useApi from "./useIndexVolumeApi";
import ThemedModal from "../../components/ThemedModal";
import DialogActionButtons from "../../components/FolderExplorer/DialogActionButtons";

export interface Props {
  isOpen: boolean;
  onCloseDialog: () => void;
}

interface FormValues {
  nodeName: string;
  path: string;
}

const NewIndexVolumeDialog = ({ isOpen, onCloseDialog }: Props) => {
  const api = useApi();

  return (
    <Formik<FormValues>
      initialValues={{
        nodeName: "",
        path: ""
      }}
      onSubmit={values => {
        if (values.nodeName && values.path) {
          api.createIndexVolume(values.nodeName, values.path);
          onCloseDialog();
        }
      }}
    >
      {({ submitForm }: Formik) => (
        <ThemedModal
          isOpen={isOpen}
          header={<h2>Create New Index Volume</h2>}
          content={
            <form>
              <div>
                <label>Node Name</label>
                <Field name="nodeName" />
                <label>Path</label>
                <Field name="path" />
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

export default NewIndexVolumeDialog;
