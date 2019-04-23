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
import { pipe } from "ramda";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DragSource,
  DropTarget,
  DropTargetCollector,
  DropTargetSpec,
  DragSourceSpec,
} from "react-dnd";

import { canMove } from "src/lib/treeUtils/treeUtils";
import {
  DragDropTypes,
  DragObject,
  dragCollect,
  DragCollectedProps,
  DropCollectedProps,
  ExpressionOperatorType,
  ExpressionItem,
  ExpressionTermType,
} from "../types";
import ExpressionTerm from "src/components/ExpressionBuilder/ExpressionTerm/ExpressionTerm";
import Button from "src/components/Button";
import { DataSourceType, OperatorType, OperatorTypeValues } from "../types";
import { LineTo } from "src/components/LineTo";

import { getNewTerm, getNewOperator } from "../expressionUtils";

interface Props {
  index?: number; // If this is undefined, assume this is the root
  dataSource: DataSourceType;
  isEnabled: boolean;
  value: ExpressionOperatorType;
  onChange: (i: number | undefined, e: ExpressionOperatorType) => void;
  onDelete?: (i: number) => void;
}

interface EnhancedProps extends Props, DragCollectedProps, DropCollectedProps {}

const dragSource: DragSourceSpec<Props, DragObject> = {
  canDrag() {
    return true;
  },
  beginDrag(props) {
    return {
      expressionItem: props.value,
    };
  },
};

const dropTarget: DropTargetSpec<Props> = {
  canDrop(props, monitor) {
    return canMove(monitor.getItem(), props.value);
  },
  drop(props, monitor) {
    //TODO fix drag and drop
    console.log("Drag and Drop", {
      item: monitor.getItem().expressionItem,
      operator: props.value,
    });
    //props.expressionItemMoved(monitor.getItem().expressionItem, props.operator);
  },
};

let dropCollect: DropTargetCollector<DropCollectedProps> = function dropCollect(
  connect,
  monitor,
) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
};

const enhance = pipe(
  DragSource(DragDropTypes.OPERATOR, dragSource, dragCollect),
  DropTarget(
    [DragDropTypes.OPERATOR, DragDropTypes.TERM],
    dropTarget,
    dropCollect,
  ),
);

const ExpressionOperator: React.FunctionComponent<EnhancedProps> = ({
  value,
  index,
  isEnabled,
  dataSource,
  onChange,
  onDelete,

  connectDropTarget,
  isOver,
  canDrop,
  connectDragSource,
}) => {
  const isRoot = index === undefined;

  const onDeleteThis = React.useCallback(() => {
    if (!!index && onDelete) {
      onDelete(index);
    }
  }, [index, onDelete]);

  const onAddOperator = React.useCallback(() => {
    onChange(index, {
      ...value,
      children: [...value.children, getNewOperator()],
    });
  }, [index, value, onChange]);

  const onAddTerm = React.useCallback(() => {
    onChange(index, {
      ...value,
      children: [...value.children, getNewTerm()],
    });
  }, [index, value, onChange]);

  const onOpChange = React.useCallback(
    (op: OperatorType) => {
      onChange(index, {
        ...value,
        op,
      });
    },
    [index, onChange],
  );

  const onEnabledToggled = React.useCallback(() => {
    if (!!index) {
      onChange(index, {
        ...value,
        enabled: !value.enabled,
      });
    }
  }, [index, value, onChange]);

  const onChildUpdated = React.useCallback(
    (_index: number, _value: ExpressionTermType | ExpressionOperatorType) => {
      onChange(index, {
        ...value,
        children: value.children.map((c, i) => (i === _index ? _value : c)),
      });
    },
    [index, value, onChange],
  );

  const onChildDeleted = React.useCallback(
    (_index: number) => {
      onChange(index, {
        ...value,
        children: value.children.filter((c, i) => i !== _index),
      });
    },
    [index, value, onChange],
  );

  let dndBarColour = "grey";
  if (isOver) {
    dndBarColour = canDrop ? "blue" : "red";
  }

  const classNames = ["expression-item"];
  if (isRoot) {
    classNames.push("expression-item__root");
  }
  if (!isEnabled) {
    classNames.push("expression-item--disabled");
  }

  let enabledColour = "grey";
  if (value.enabled) {
    enabledColour = "blue";
  }

  const className = classNames.join(" ");

  return (
    <div className={className}>
      {connectDropTarget(
        <div>
          {connectDragSource(
            <span>
              <FontAwesomeIcon color={dndBarColour} icon="bars" />
            </span>,
          )}

          {OperatorTypeValues.map((l, i) => (
            <Button
              selected={value.op === l}
              key={l}
              groupPosition={
                i === 0
                  ? "left"
                  : OperatorTypeValues.length - 1 === i
                  ? "right"
                  : "middle"
              }
              onClick={() => onOpChange(l)}
              text={l}
            />
          ))}

          <div className="ExpressionItem__buttons">
            <Button
              icon="plus"
              text="Term"
              groupPosition="left"
              onClick={onAddTerm}
            />
            <Button
              icon="plus"
              text="Group"
              groupPosition={isRoot ? "right" : "middle"}
              onClick={onAddOperator}
            />
            {!isRoot && (
              <React.Fragment>
                <Button
                  icon="check"
                  groupPosition="middle"
                  color={enabledColour}
                  onClick={onEnabledToggled}
                />
                <Button
                  icon="trash"
                  groupPosition="right"
                  onClick={onDeleteThis}
                />
              </React.Fragment>
            )}
          </div>
        </div>,
      )}

      <div className="operator__children">
        {isOver && dropTarget.canDrop && (
          <div className="operator__placeholder" />
        )}
        {value.children &&
          value.children.map((c: ExpressionItem, i: number) => {
            let itemElement;
            switch (c.type) {
              case "term":
                itemElement = (
                  <div>
                    <ExpressionTerm
                      index={i}
                      dataSource={dataSource}
                      isEnabled={isEnabled && c.enabled}
                      value={c as ExpressionTermType}
                      onDelete={onChildDeleted}
                      onChange={(i, e) => onChildUpdated(i, e)}
                    />
                  </div>
                );
                break;
              case "operator":
                itemElement = (
                  <EnhancedExpressionOperator
                    index={i}
                    dataSource={dataSource}
                    isEnabled={isEnabled && c.enabled}
                    value={c as ExpressionOperatorType}
                    onDelete={onChildDeleted}
                    onChange={(_, e) => onChildUpdated(i, e)}
                  />
                );
                break;
              default:
                throw new Error(`Invalid operator type: ${c.type}`);
            }

            // Wrap it with a line to
            return (
              <div key={i} className="operator__child">
                <LineTo fromId="TODOFROM" toId="TODOTO" />
                {itemElement}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const EnhancedExpressionOperator = enhance(ExpressionOperator);

export default EnhancedExpressionOperator;
