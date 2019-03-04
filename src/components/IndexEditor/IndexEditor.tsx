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
} from "./IndexFieldEditor";

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
    fields,
    selectableTableProps: { selectedItems, lastSelectedIndex }
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
      (id: number, fieldUpdates: Partial<IndexField>) => {
        if (!!document) {
          let updatedIndex: Partial<IndexDoc> = {
            data: {
              ...document.data,
              fields: fields.map((f, _id) =>
                _id === id
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

  const onCreateClick = useCallback(() => {
    if (!!document && !!document.data) {
      let updatedIndex: Partial<IndexDoc> = {
        ...document,
        data: {
          ...document.data,
          fields: [
            ...document.data.fields,
            {
              fieldName: `New Field ${document.data.fields.length}`,
              fieldType: "ID",
              stored: true,
              indexed: true,
              termPositions: false,
              analyzerType: "KEYWORD",
              caseSensitive: false,
              conditions: []
            }
          ]
        }
      };

      onDocumentChange(updatedIndex);
    }
  }, [document, onDocumentChange]);

  const onEditClick = useCallback(() => {
    if (lastSelectedIndex !== undefined) {
      showFieldEditor(lastSelectedIndex, selectedItems[0]);
    } else {
      console.error("Could not determine last selected index of field");
    }
  }, [showFieldEditor, lastSelectedIndex, selectedItems]);

  const onMoveUpClick = useCallback(() => {
    if (
      !!document &&
      !!lastSelectedIndex &&
      lastSelectedIndex > 0 &&
      selectedItems.length > 0
    ) {
      let f0 = fields[lastSelectedIndex - 1];
      let f1 = fields[lastSelectedIndex];

      let newFields = [...fields];
      newFields[lastSelectedIndex] = f0;
      newFields[lastSelectedIndex - 1] = f1;

      let updatedIndex: Partial<IndexDoc> = {
        data: {
          ...document.data,
          fields: newFields
        }
      };
      onDocumentChange(updatedIndex);
    }
  }, [lastSelectedIndex, document]);

  const onMoveDownClick = useCallback(() => {
    if (
      !!document &&
      !!lastSelectedIndex &&
      lastSelectedIndex > 0 &&
      selectedItems.length > 0
    ) {
      let f0 = fields[lastSelectedIndex];
      let f1 = fields[lastSelectedIndex + 1];

      let newFields = [...fields];
      newFields[lastSelectedIndex + 1] = f0;
      newFields[lastSelectedIndex] = f1;

      let updatedIndex: Partial<IndexDoc> = {
        data: {
          ...document.data,
          fields: newFields
        }
      };
      onDocumentChange(updatedIndex);
    }
  }, [lastSelectedIndex, document]);

  if (!document) {
    return <Loader message="Loading Index..." />;
  }

  return (
    <DocRefEditor {...editorProps}>
      <h2>Fields</h2>
      <Button text="Create" onClick={onCreateClick} />
      <Button
        text="Edit"
        disabled={selectedItems.length !== 1}
        onClick={onEditClick}
      />
      <Button
        text="Move Up"
        disabled={lastSelectedIndex === undefined || lastSelectedIndex === 0}
        onClick={onMoveUpClick}
      />
      <Button
        text="Move Down"
        disabled={
          lastSelectedIndex === undefined ||
          lastSelectedIndex === fields.length - 1
        }
        onClick={onMoveDownClick}
      />
      <Button
        text="Delete"
        disabled={selectedItems.length === 0}
        onClick={showDeleteFieldsDialog}
      />

      <IndexFieldEditor {...fieldEditorProps} />
      <ThemedConfirm {...deleteFieldComponentProps} />
      <IndexFieldsTable {...componentProps} />
    </DocRefEditor>
  );
};

export default IndexEditor;
