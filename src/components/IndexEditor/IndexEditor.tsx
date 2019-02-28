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
import { useEffect, useCallback } from "react";

import DocRefEditor, { useDocRefEditor } from "../DocRefEditor";
import Loader from "../Loader";
import useIndexApi from "./useIndexApi";
import { IndexDoc, IndexField } from "../../types";
import IndexFieldsTable, {
  useTable as useFieldsTable
} from "./IndexFieldsTable";
import ThemedConfirm, { useDialog as useThemedConfirm } from "../ThemedConfirm";
import Button from "../Button";
import IndexFieldEditor, {
  useEditor as useFieldEditor
} from "./IndexFieldEditor/IndexFieldEditor";

export interface Props {
  indexUuid: string;
}

const IndexEditor = ({ indexUuid }: Props) => {
  const { fetchDocument, saveDocument } = useIndexApi();

  useEffect(() => {
    fetchDocument(indexUuid);
  }, [fetchDocument, indexUuid]);

  const { document, editorProps, onDocumentChange } = useDocRefEditor<IndexDoc>(
    {
      docRefUuid: indexUuid,
      saveDocument
    }
  );

  const { componentProps } = useFieldsTable(
    document && document.data ? document.data.fields : []
  );
  const {
    selectableTableProps: { selectedItems }
  } = componentProps;

  const {
    componentProps: deleteFieldComponentProps,
    showDialog: showDeleteFieldsDialog
  } = useThemedConfirm({
    onConfirm: useCallback(() => {
      let fieldNamesToDelete = selectedItems.map(s => s.fieldName);
      if (!!document) {
        onDocumentChange({
          data: {
            ...document.data,
            fields: document.data.fields.filter(
              f => !fieldNamesToDelete.includes(f.fieldName)
            )
          }
        });
      }
    }, [onDocumentChange, document, selectedItems]),
    getQuestion: useCallback(
      () => "Are you sure you want to delete these fields",
      []
    ),
    getDetails: useCallback(
      () => selectedItems.map(s => s.fieldName).join(", "),
      [selectedItems]
    )
  });

  const {
    componentProps: fieldEditorProps,
    showEditor: showFieldEditor
  } = useFieldEditor(
    useCallback(
      (fieldUpdates: Partial<IndexField>) => {
        if (!!document) {
          let updatedIndex: Partial<IndexDoc> = {
            data: {
              ...document.data,
              fields: document.data.fields.map(f =>
                f.fieldName === fieldUpdates.fieldName
                  ? {
                      ...f,
                      ...fieldUpdates
                    }
                  : f
              )
            }
          };
          onDocumentChange(updatedIndex);
        }
      },
      [document, onDocumentChange]
    )
  );
  const onEditClick = useCallback(() => {
    showFieldEditor(selectedItems[0]);
  }, [showFieldEditor, selectedItems]);

  if (!document) {
    return <Loader message="Loading Index..." />;
  }

  return (
    <DocRefEditor {...editorProps}>
      <h2>Fields</h2>
      <Button
        text="Delete"
        disabled={selectedItems.length === 0}
        onClick={showDeleteFieldsDialog}
      />
      <Button
        text="Edit"
        disabled={selectedItems.length !== 1}
        onClick={onEditClick}
      />

      <IndexFieldEditor {...fieldEditorProps} />
      <ThemedConfirm {...deleteFieldComponentProps} />
      <IndexFieldsTable {...componentProps} />
    </DocRefEditor>
  );
};

export default IndexEditor;
