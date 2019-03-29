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
import { useCallback } from "react";

import DocRefEditor, {
  useDocRefEditor,
  SwitchedDocRefEditorProps
} from "../DocRefEditor";
import Loader from "../../Loader";
import useDocumentApi from "../../../api/useDocumentApi";
import { IndexDoc, IndexField } from "../../../types";
import IndexFieldsTable, {
  useTable as useFieldsTable
} from "./IndexFieldsTable";
import ThemedConfirm, {
  useDialog as useThemedConfirm
} from "../../ThemedConfirm";
import Button from "../../Button";
import IndexFieldEditor, {
  useEditor as useFieldEditor
} from "./IndexFieldEditor";
import { IndexVolumeGroupPicker } from "../../IndexVolumeGroups/IndexVolumeGroupPicker";

const IndexEditor = ({ docRefUuid }: SwitchedDocRefEditorProps) => {
  const documentApi = useDocumentApi<"Index", IndexDoc>("Index");

  const { editorProps, onDocumentChange } = useDocRefEditor<IndexDoc>({
    docRefUuid,
    documentApi
  });

  const { docRefContents } = editorProps;

  const onVolumeGroupChange = useCallback(
    volumeGroupName => {
      onDocumentChange({ volumeGroupName });
    },
    [onDocumentChange]
  );

  const { componentProps } = useFieldsTable(
    docRefContents && docRefContents.data ? docRefContents.data.fields : []
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
      if (!!docRefContents) {
        onDocumentChange({
          data: {
            ...docRefContents.data,
            fields: docRefContents.data.fields.filter(
              f => !fieldNamesToDelete.includes(f.fieldName)
            )
          }
        });
      }
    }, [onDocumentChange, docRefContents, selectedItems]),
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
        if (!!docRefContents) {
          let updatedIndex: Partial<IndexDoc> = {
            data: {
              ...docRefContents.data,
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
      [docRefContents, onDocumentChange]
    )
  );

  const onCreateClick = useCallback(() => {
    if (!!docRefContents && !!docRefContents.data) {
      let updatedIndex: Partial<IndexDoc> = {
        ...docRefContents,
        data: {
          ...docRefContents.data,
          fields: [
            ...docRefContents.data.fields,
            {
              fieldName: `New Field ${docRefContents.data.fields.length}`,
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
  }, [docRefContents, onDocumentChange]);

  const onEditClick = useCallback(() => {
    if (lastSelectedIndex !== undefined) {
      showFieldEditor(lastSelectedIndex, selectedItems[0]);
    } else {
      console.error("Could not determine last selected index of field");
    }
  }, [showFieldEditor, lastSelectedIndex, selectedItems]);

  const onMoveUpClick = useCallback(() => {
    if (
      !!docRefContents &&
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
          ...docRefContents.data,
          fields: newFields
        }
      };
      onDocumentChange(updatedIndex);
    }
  }, [lastSelectedIndex, docRefContents]);

  const onMoveDownClick = useCallback(() => {
    if (
      !!docRefContents &&
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
          ...docRefContents.data,
          fields: newFields
        }
      };
      onDocumentChange(updatedIndex);
    }
  }, [lastSelectedIndex, docRefContents]);

  if (!docRefContents) {
    return <Loader message="Loading Index..." />;
  }

  return (
    <DocRefEditor {...editorProps}>
      <form>
        <label>Volume Group</label>
        <IndexVolumeGroupPicker
          value={docRefContents.volumeGroupName}
          onChange={onVolumeGroupChange}
        />
      </form>

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
