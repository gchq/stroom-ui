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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DragSourceSpec, DragSource } from "react-dnd";
import Button from "../../Button";
import ConditionPicker from "../ConditionPicker/ConditionPicker";
import {
  DragDropTypes,
  DragObject,
  dragCollect,
  DragCollectedProps,
} from "../types";
import ValueWidget from "../ValueWidget";
import {
  DataSourceType,
  ConditionType,
  DataSourceFieldType,
  ExpressionTermType,
} from "../types";
import withValueType from "../withValueType";
import DataSourceFieldPicker from "../DataSourceFieldPicker/DataSourceFieldPicker";
import { ControlledInput } from "src/lib/useForm/types";

interface Props extends ControlledInput<ExpressionTermType> {
  dataSource: DataSourceType;
  isEnabled: boolean;
  showDeleteItemDialog: (e: ExpressionTermType) => void;
}

interface EnhancedProps extends Props, DragCollectedProps {}

const dragSource: DragSourceSpec<Props, DragObject> = {
  beginDrag(props) {
    return {
      expressionItem: props.value,
    };
  },
};

const enhance = DragSource(DragDropTypes.TERM, dragSource, dragCollect);

const ExpressionTerm: React.FunctionComponent<EnhancedProps> = ({
  showDeleteItemDialog,
  connectDragSource,
  value,
  isEnabled,
  onChange,
  dataSource,
}) => {
  const onRequestDeleteTerm = () => {
    showDeleteItemDialog(value);
  };

  const onEnabledToggled = () => {
    onChange({
      ...value,
      enabled: !value.enabled,
    });
  };

  const onFieldChange = (field: string) => {
    onChange({
      ...value,
      field,
    });
  };

  const onConditionChange = (condition: ConditionType) => {
    onChange({
      ...value,
      condition,
    });
  };

  const onValueChange = (v: string) => onChange({ ...value, value: v });

  const classNames = ["expression-item", "expression-term"];

  if (!isEnabled) {
    classNames.push("expression-item--disabled");
  }

  const thisField = dataSource.fields.find(
    (f: DataSourceFieldType) => f.name === value.field,
  );

  let conditionOptions: ConditionType[] = [];
  if (thisField) {
    conditionOptions = thisField.conditions;
  }

  const className = classNames.join(" ");

  const valueType = withValueType(value, dataSource);

  return (
    <div className={className}>
      {connectDragSource(
        <span>
          <FontAwesomeIcon icon="bars" />
        </span>,
      )}
      <DataSourceFieldPicker
        dataSource={dataSource}
        value={value.field}
        onChange={onFieldChange}
      />
      <ConditionPicker
        className="expression-term__select"
        value={value.condition}
        onChange={onConditionChange}
        conditionOptions={conditionOptions}
      />
      <ValueWidget
        valueType={valueType}
        term={value}
        onChange={onValueChange}
      />

      <div className="expression-term__actions">
        <Button
          icon="check"
          groupPosition="left"
          disabled={value.enabled}
          onClick={onEnabledToggled}
        />
        <Button
          icon="trash"
          groupPosition="right"
          onClick={onRequestDeleteTerm}
        />
      </div>
    </div>
  );
};

export default enhance(ExpressionTerm);
