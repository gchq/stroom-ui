import * as React from "react";
import { useState, useCallback } from "react";

import { IndexField, IndexFieldType, AnalyzerType } from "../../../types";
import ThemedModal from "../../ThemedModal";
import { DialogActionButtons } from "../../Button";
import IndexFieldTypePicker from "../IndexFieldTypePicker/IndexFieldTypePicker";
import AnalyzerPicker from "../AnalyzerPicker";
import useForm from "../../../lib/useForm";

interface Props {
  id: number;
  indexField?: IndexField;
  onUpdateField: (id: number, updates: Partial<IndexField>) => void;
  onCloseDialog: () => void;
}

export const IndexFieldEditor = ({
  id,
  indexField,
  onUpdateField,
  onCloseDialog
}: Props) => {
  const {
    value: indexUpdates,
    generateControlledInputProps,
    generateTextInput,
    generateCheckboxInput
  } = useForm<IndexField>({
    initialValues: indexField
  });

  const fieldNameProps = generateTextInput("fieldName");
  const storedProps = generateCheckboxInput("stored");
  const caseSensitiveProps = generateCheckboxInput("caseSensitive");
  const termPositionsProps = generateCheckboxInput("termPositions");
  const onConfirm = () => {
    onUpdateField(id, indexUpdates);
    onCloseDialog();
  };

  const fieldTypeProps = generateControlledInputProps<IndexFieldType>(
    "fieldType"
  );
  const analyzerTypeProps = generateControlledInputProps<AnalyzerType>(
    "analyzerType"
  );

  return !!indexField ? (
    <ThemedModal
      isOpen={!!indexField}
      header={<h2>Index Field {indexField.fieldName}</h2>}
      content={
        <React.Fragment>
          <form>
            <label>Field Name</label>
            <input {...fieldNameProps} />
            <label>Field Type</label>
            <IndexFieldTypePicker {...fieldTypeProps} />
            <label>Stored</label>
            <input {...storedProps} />
            <label>Positions</label>
            <input {...termPositionsProps} />
            <label>Analyzer</label>
            <AnalyzerPicker {...analyzerTypeProps} />
            <label>Case Sensitive</label>
            <input {...caseSensitiveProps} />
          </form>
        </React.Fragment>
      }
      actions={
        <DialogActionButtons onConfirm={onConfirm} onCancel={onCloseDialog} />
      }
    />
  ) : null;
};

interface UseIndexFieldEditor {
  componentProps: Props;
  showEditor: (id: number, indexField: IndexField) => void;
}

export const useEditor = (
  onUpdateField: (id: number, updates: IndexField) => void
): UseIndexFieldEditor => {
  const [id, setId] = useState<number>(0);
  const [indexField, setIndexField] = useState<IndexField | undefined>(
    undefined
  );

  return {
    componentProps: {
      id,
      indexField,
      onUpdateField,
      onCloseDialog: useCallback(() => setIndexField(undefined), [
        setIndexField
      ])
    },
    showEditor: useCallback(
      (_id, _indexField) => {
        setId(_id);
        setIndexField(_indexField);
      },
      [setId, setIndexField]
    )
  };
};

export default IndexFieldEditor;
