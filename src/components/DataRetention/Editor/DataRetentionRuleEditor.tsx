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

import { Card } from "antd";
import "antd/dist/antd.css";
import ExpressionBuilder from "components/ExpressionBuilder";
import InlineInput from "components/InlineInput/InlineInput";
import { useMetaDataSource } from "components/MetaBrowser/api";
import { ControlledInput } from "lib/useForm/types";
import * as React from "react";
import { useCallback } from "react";
import TimeUnitSelect from "../TimeUnitSelect";
import { DataRetentionRule } from "../types/DataRetentionRule";
import DataRetentionRuleEditHeader from "./DataRetentionRuleEditHeader";
import useHandlers from "./useHandlers";

interface Props extends ControlledInput<DataRetentionRule> {
  onDelete: (v: number) => void;
}

const DataRetentionRuleEditor: React.FunctionComponent<Props> = ({
  value: rule,
  onChange,
  onDelete,
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

  const handleDelete = useCallback(e => onDelete(e.target.value), [onDelete]);
  return (
    <Card
      size="small"
      title={
        <DataRetentionRuleEditHeader
          {...{ rule, handleNameChange, handleEnabledChange, handleDelete }}
        />
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
  );
};

export default DataRetentionRuleEditor;
