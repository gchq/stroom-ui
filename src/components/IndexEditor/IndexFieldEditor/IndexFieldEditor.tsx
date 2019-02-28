import * as React from "react";
import { useState, useCallback, useEffect } from "react";

import { IndexField, IndexFieldType, AnalyzerType } from "../../../types";
import ThemedModal from "../../ThemedModal";
import { DialogActionButtons } from "../../Button";
import IndexFieldTypePicker from "./IndexFieldTypePicker";
import AnalyzerPicker from "./AnalyzerPicker";

export interface Props {
  indexField?: IndexField;
  onUpdateField: (updates: Partial<IndexField>) => void;
  onCloseDialog: () => void;
}

export const IndexFieldEditor = ({
  indexField,
  onUpdateField,
  onCloseDialog
}: Props) => {
  const [fieldType, setFieldType] = useState<IndexFieldType | undefined>(
    undefined
  );
  const [analyzerType, setAnalyzerType] = useState<AnalyzerType | undefined>(
    undefined
  );
  const [stored, setStored] = useState<boolean>(false);
  const [termPositions, setTermPositions] = useState<boolean>(false);
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);

  useEffect(() => {
    if (!!indexField) {
      setFieldType(indexField.fieldType);
      setAnalyzerType(indexField.analyzerType);
      setStored(indexField.stored);
      setTermPositions(indexField.termPositions);
      setCaseSensitive(indexField.caseSensitive);
    }
  }, [indexField]);

  const onConfirm = () => {
    onUpdateField({
      fieldName: indexField!.fieldName,
      fieldType,
      analyzerType,
      stored,
      termPositions,
      caseSensitive
    });
    onCloseDialog();
  };

  return !!indexField ? (
    <ThemedModal
      isOpen={!!indexField}
      header={<h2>Index Field {indexField.fieldName}</h2>}
      content={
        <React.Fragment>
          <form>
            <label>Field Type</label>
            <IndexFieldTypePicker onChange={setFieldType} value={fieldType} />
            <label>Stored</label>
            <input
              type="checkbox"
              checked={stored}
              onChange={() => setStored(!stored)}
            />
            <label>Positions</label>
            <input
              type="checkbox"
              checked={termPositions}
              onChange={() => setTermPositions(!termPositions)}
            />
            <label>Analyzer</label>
            <AnalyzerPicker onChange={setAnalyzerType} value={analyzerType} />
            <label>Case Sensitive</label>
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={() => setCaseSensitive(!caseSensitive)}
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
  showEditor: (indexField: IndexField) => void;
}

export const useEditor = (
  onUpdateField: (updates: IndexField) => void
): UseIndexFieldEditor => {
  const [indexField, setIndexField] = useState<IndexField | undefined>(
    undefined
  );

  return {
    componentProps: {
      indexField,
      onUpdateField,
      onCloseDialog: useCallback(() => setIndexField(undefined), [
        setIndexField
      ])
    },
    showEditor: useCallback(setIndexField, [setIndexField])
  };
};

export default IndexFieldEditor;
