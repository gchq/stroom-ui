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
import { useEffect, useState } from "react";

import ExpressionOperator from "./ExpressionOperator";
import DeleteExpressionItem, {
  useDialog as useDeleteItemDialog
} from "./DeleteExpressionItem/DeleteExpressionItem";
import {
  DataSourceType,
  StyledComponentProps,
  ExpressionOperatorWithUuid,
  ExpressionHasUuid
} from "../../types";
import ROExpressionBuilder from "./ROExpressionBuilder";
import {
  updateItemInTree,
  addItemsToTree,
  deleteItemFromTree,
  moveItemsInTree
} from "src/lib/treeUtils";

import { getNewTerm, getNewOperator } from "./expressionBuilderUtils";

interface Props extends StyledComponentProps {
  dataSource: DataSourceType;
  showModeToggle?: boolean;
  editMode?: boolean;
  expression: ExpressionOperatorWithUuid;
  onChange: (e: ExpressionOperatorWithUuid) => void;
}

const ExpressionBuilder = ({
  dataSource,
  showModeToggle: smtRaw,
  editMode,
  expression,
  onChange
}: Props) => {
  const [inEditMode, setEditableByUser] = useState<boolean>(false);

  const expressionTermAdded = (itemId: string) => {
    const e = addItemsToTree(expression, itemId, [
      getNewTerm()
    ]) as ExpressionOperatorWithUuid;
    onChange(e);
  };
  const expressionOperatorAdded = (itemId: string) => {
    const e = addItemsToTree(expression, itemId, [
      getNewOperator()
    ]) as ExpressionOperatorWithUuid;
    onChange(e);
  };
  const expressionItemUpdated = (itemId: string, updates: object) => {
    const e = updateItemInTree(
      expression,
      itemId,
      updates
    ) as ExpressionOperatorWithUuid;
    onChange(e);
  };
  const expressionItemDeleted = (itemId: string) => {
    const e = deleteItemFromTree(
      expression,
      itemId
    ) as ExpressionOperatorWithUuid;
    onChange(e);
  };
  const expressionItemMoved = (
    destination: ExpressionHasUuid,
    itemToMove: ExpressionHasUuid
  ) => {
    const e = moveItemsInTree(expression, destination, [
      itemToMove
    ]) as ExpressionOperatorWithUuid;
    onChange(e);
  };

  useEffect(() => {
    setEditableByUser(editMode || false);
  }, []);

  const {
    showDialog: showDeleteItemDialog,
    componentProps: deleteDialogComponentProps
  } = useDeleteItemDialog(itemId => expressionItemDeleted(itemId));

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
          operator={expression}
          expressionTermAdded={expressionTermAdded}
          expressionOperatorAdded={expressionOperatorAdded}
          expressionItemUpdated={expressionItemUpdated}
          expressionItemMoved={expressionItemMoved}
        />
      ) : (
        <ROExpressionBuilder expression={expression} />
      )}
    </div>
  );
};

export default ExpressionBuilder;
