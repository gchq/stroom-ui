/*
 * Copyright 2019 Crown Copyright
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

import { Card, Button, Popconfirm, Tooltip, Switch } from "antd";
import "antd/dist/antd.css";
import ExpressionBuilder from "components/ExpressionBuilder";
import InlineInput from "components/InlineInput/InlineInput";
import { useMetaDataSource } from "components/MetaBrowser/api";
import { ControlledInput } from "lib/useForm/types";
import * as React from "react";
import { useCallback } from "react";
import TimeUnitSelect from "../TimeUnitSelect";
import { DataRetentionRule } from "../types/DataRetentionRule";
import useHandlers from "./useHandlers";
import {
  ConnectDragSource,
  DragSourceSpec,
  DragSourceCollector,
  DragSource,
} from "react-dnd";
import { DragDropTypes } from "../types/DragDropTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props extends ControlledInput<DataRetentionRule> {
  onDelete: (v: number) => void;
  rule: DataRetentionRule;
}

interface DragCollectedProps {
  connectDragSource: ConnectDragSource;
  isDragging: boolean;
}

const dragSource: DragSourceSpec<Props, DataRetentionRule> = {
  beginDrag(props) {
    return { ...props.rule };
  },
};

const dragCollect: DragSourceCollector<DragCollectedProps, Props> = (
  connect,
  monitor,
) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

interface EnhancedProps extends Props, DragCollectedProps {}

const enhance = DragSource<Props, DragCollectedProps>(
  DragDropTypes.RULE,
  dragSource,
  dragCollect,
);

const DataRetentionRuleEditor: React.FunctionComponent<EnhancedProps> = ({
  value: rule,
  onChange,
  onDelete,
  connectDragSource,
  isDragging,
}) => {
  const dataSource = useMetaDataSource();
  const {
    handleNameChange,
    handleAgeChange,
    handleExpressionChange,
    handleTimeUnitChange,
    handleEnabledChange,
    handleForeverChange,
  } = useHandlers(rule, onChange);

  const opacity = isDragging ? 0.5 : 1;
  const handleDelete = useCallback(e => onDelete(e.target.value), [onDelete]);
  return connectDragSource(
    <div>
      <Card
        size="small"
        title={
          <div className="DataRetentionRuleEditor__header" style={{ opacity }}>
            <div>
              <FontAwesomeIcon icon="grip-vertical" />
              <InlineInput value={rule.name} onChange={handleNameChange} />
            </div>

            <div className="DataRetentionRuleEditor__header__actions">
              <Popconfirm
                title="Delete this retention rule?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
                placement="left"
              >
                <Button shape="circle" icon="delete" type="danger" />
              </Popconfirm>
              <Tooltip
                placement="rightBottom"
                title="Enabled/disable this rule"
              >
                <Switch
                  size="small"
                  checked={rule.enabled}
                  onChange={handleEnabledChange}
                  defaultChecked
                />
              </Tooltip>
            </div>
          </div>
        }
        extra={<div />}
        style={{ width: "100%" }}
      >
        <div className="DataRetentionRuleEditor__content">
          <div>
            <h4>Match the following:</h4>
            <ExpressionBuilder
              value={rule.expression}
              onChange={handleExpressionChange}
              editMode={true}
              dataSource={dataSource}
            />
          </div>
          <div>
            <h4>And then:</h4>
            <div className="DataRetentionRuleEditor__retention">
              <div>
                <label>
                  <input
                    type="radio"
                    name={"forever_" + rule.ruleNumber}
                    value="keep_forever"
                    checked={rule.forever}
                    onChange={handleForeverChange}
                  />
                  <span>keep forever</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name={"forever_" + rule.ruleNumber}
                    value="keep_then_delete"
                    checked={!rule.forever}
                    onChange={handleForeverChange}
                  />
                  <span>delete after </span>
                </label>
                <span>
                  <InlineInput
                    type="number"
                    value={rule.age}
                    onChange={handleAgeChange}
                  />
                  <span> </span>
                  <TimeUnitSelect
                    selected={rule.timeUnit}
                    onChange={handleTimeUnitChange}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>,
  );
};

export default enhance(DataRetentionRuleEditor);
