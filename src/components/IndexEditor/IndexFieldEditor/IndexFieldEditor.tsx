import * as React from "react";
import { useState, useCallback } from "react";

import { IndexField } from "../../../types";
import ThemedModal from "../../ThemedModal";
import { DialogActionButtons } from "../../Button";
import IndexFieldTypePicker from "../IndexFieldTypePicker/IndexFieldTypePicker";
import AnalyzerPicker from "../AnalyzerPicker";
import useForm from "../../../lib/useForm";

export interface Props {
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
    onUpdate,
    currentValues: indexUpdates,
    inputProps: {
      text: { fieldName: fieldNameProps }
    }
  } = useForm<IndexField>({
    initialValues: indexField,
    inputs: { text: ["fieldName"] }
  });

  const {
    fieldType,
    stored,
    termPositions,
    caseSensitive,
    analyzerType
  } = indexUpdates;

  const onConfirm = () => {
    onUpdateField(id, indexUpdates);
    onCloseDialog();
  };

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
            <IndexFieldTypePicker
              onChange={fieldType => onUpdate({ fieldType })}
              value={fieldType}
            />
            <label>Stored</label>
            <input
              type="checkbox"
              checked={stored}
              onChange={() => onUpdate({ stored: !stored })}
            />
            <label>Positions</label>
            <input
              type="checkbox"
              checked={termPositions}
              onChange={() => onUpdate({ termPositions: !termPositions })}
            />
            <label>Analyzer</label>
            <AnalyzerPicker
              onChange={analyzerType => onUpdate({ analyzerType })}
              value={analyzerType}
            />
            <label>Case Sensitive</label>
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={() => onUpdate({ caseSensitive: !caseSensitive })}
            />
          </form>
        </React.Fragment>
      }
      actions={
        <DialogActionButtons onConfirm={onConfirm} onCancel={onCloseDialog} />
      }
    />
  ) : null;
};

export interface UseIndexFieldEditor {
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
