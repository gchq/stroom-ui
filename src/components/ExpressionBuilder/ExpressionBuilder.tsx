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

import ExpressionOperator from "./ExpressionOperator";
import DeleteExpressionItem, {
  useDialog as useDeleteItemDialog,
} from "./DeleteExpressionItem/DeleteExpressionItem";
import {
  DataSourceType,
  ExpressionItem,
  ExpressionOperatorType,
} from "./types";
import ReadOnlyExpressionBuilder from "./ReadOnlyExpressionBuilder/ReadOnlyExpressionBuilder";

interface Props {
  className?: string;
  dataSource: DataSourceType;
  showModeToggle?: boolean;
  editMode?: boolean;
  expression: ExpressionOperatorType;
  onChange: (e: ExpressionOperatorType) => void;
}

const ExpressionBuilder: React.FunctionComponent<Props> = ({
  dataSource,
  showModeToggle: smtRaw,
  editMode,
  expression,
  onChange,
}) => {
  const [inEditMode, setEditableByUser] = React.useState<boolean>(false);

  console.log("Expression Builder Render", onChange);

  const onChildChange = (updates: object) => {
    // const e = updateItemInTree(
    //   expression,
    //   "FOO",
    //   updates,
    // ) as ExpressionOperatorWithUuid;
    // onChange(e);
    console.log("TODO Expression Item Updated", updates);
  };
  const expressionItemDeleted = (expressionItem: ExpressionItem) => {
    // const e = deleteItemFromTree(
    //   expression,
    //   itemId,
    // ) as ExpressionOperatorWithUuid;
    console.log("TODO Expression Item Deleted", expressionItem);
    //onChange(e);
  };

  React.useEffect(() => {
    setEditableByUser(editMode || false);
  }, []);

  const {
    showDialog: showDeleteItemDialog,
    componentProps: deleteDialogComponentProps,
  } = useDeleteItemDialog(e => expressionItemDeleted(e));

  const showModeToggle = smtRaw && !!dataSource;

  return (
    <div>
      <DeleteExpressionItem {...deleteDialogComponentProps} />
      {showModeToggle ? (
        <React.Fragment>
          <label>Edit Mode</label>
          <input
            type="checkbox"
            checked={inEditMode}
            onChange={() => setEditableByUser(!inEditMode)}
          />
        </React.Fragment>
      ) : (
        undefined
      )}
      {inEditMode ? (
        <ExpressionOperator
          showDeleteItemDialog={showDeleteItemDialog}
          dataSource={dataSource}
          isRoot
          isEnabled
          value={expression}
          onChange={onChildChange}
        />
      ) : (
        <ReadOnlyExpressionBuilder expression={expression} />
      )}
    </div>
  );
};

export default ExpressionBuilder;
