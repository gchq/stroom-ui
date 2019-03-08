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
import { DragSource, DragSourceSpec } from "react-dnd";

import Select from "react-select";
import Button from "../Button";
import ConditionPicker from "./ConditionPicker";
import {
  DragDropTypes,
  DragObject,
  dragCollect,
  DragCollectedProps
} from "./types";
import ValueWidget from "./ValueWidget";
import {
  DataSourceType,
  ConditionType,
  DataSourceFieldType,
  SelectOptionType,
  ConditionDisplayValues,
  ExpressionTermWithUuid,
  SelectOptionsType
} from "../../types";
import withValueType from "./withValueType";

interface Props {
  dataSource: DataSourceType;
  term: ExpressionTermWithUuid;
  isEnabled: boolean;
  showDeleteItemDialog: (itemId: string) => void;
  expressionItemUpdated: (itemId: string, updates: object) => void;
}

interface EnhancedProps extends Props, DragCollectedProps {}

const dragSource: DragSourceSpec<Props, DragObject> = {
  beginDrag(props) {
    return {
      expressionItem: props.term
    };
  }
};

const enhance = DragSource(DragDropTypes.TERM, dragSource, dragCollect);

const ExpressionTerm = ({
  showDeleteItemDialog,
  connectDragSource,
  term,
  isEnabled,
  expressionItemUpdated,
  dataSource
}: EnhancedProps) => {
  const onRequestDeleteTerm = () => {
    showDeleteItemDialog(term.uuid);
  };

  const onEnabledToggled = () => {
    expressionItemUpdated(term.uuid, {
      enabled: !term.enabled
    });
  };

  const onFieldChange = (value: string) => {
    expressionItemUpdated(term.uuid, {
      field: value
    });
  };

  const onConditionChange = (value: ConditionType) => {
    expressionItemUpdated(term.uuid, {
      condition: value
    });
  };

  const onValueChange = (value: string) =>
    expressionItemUpdated(term.uuid, { value });

  const classNames = ["expression-item", "expression-term"];

  if (!isEnabled) {
    classNames.push("expression-item--disabled");
  }

  const fieldOptions = dataSource.fields.map((f: DataSourceFieldType) => ({
    value: f.name,
    label: f.name
  }));

  const thisField = dataSource.fields.find(
    (f: DataSourceFieldType) => f.name === term.field
  );

  let conditionOptions: SelectOptionsType = [];
  if (thisField) {
    conditionOptions = thisField.conditions.map((c: ConditionType) => ({
      value: c,
      label: ConditionDisplayValues[c]
    }));
  }

  const className = classNames.join(" ");

  const valueType = withValueType(term, dataSource);

  return (
    <div className={className}>
      {connectDragSource(
        <span>
          <FontAwesomeIcon icon="bars" />
        </span>
      )}
      <Select
        className="expression-term__select"
        placeholder="Field"
        value={fieldOptions.find(o => o.value === term.field)}
        onChange={(o: SelectOptionType) => onFieldChange(o.value)}
        options={fieldOptions}
      />
      <ConditionPicker
        className="expression-term__select"
        value={term.condition}
        onChange={onConditionChange}
        conditionOptions={conditionOptions}
      />
      <ValueWidget valueType={valueType} term={term} onChange={onValueChange} />

      <div className="expression-term__actions">
        <Button
          icon="check"
          groupPosition="left"
          disabled={term.enabled}
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
