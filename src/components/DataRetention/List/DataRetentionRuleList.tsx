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

import { ControlledInput } from "lib/useForm/types";
import useListReducer from "lib/useListReducer";
import * as React from "react";
import { useEffect, useMemo } from "react";
import DataRetentionRuleEditor from "../Editor/DataRetentionRuleEditor";
import { DataRetentionRule } from "../types/DataRetentionRule";
import DataRetentionRuleListDropTarget from "./DataRetentionRuleListDropTarget";

const getKey = (k: DataRetentionRule) => k.ruleNumber.toString();

interface ValueAndChangeHandler {
  value: DataRetentionRule;
  onChange: (rule: DataRetentionRule) => void;
  onRemove: () => void;
}

const DataRetentionRuleList: React.FunctionComponent<
  ControlledInput<DataRetentionRule[]>
> = ({ value: values, onChange }) => {
  const {
    items,
    addItem,
    updateItemAtIndex,
    removeItemAtIndex,
  } = useListReducer<DataRetentionRule>(getKey, values);

  useEffect(() => onChange(items), [onChange, items]);

  const valuesAndChangeHandlers: ValueAndChangeHandler[] = useMemo(
    () =>
      values.map((value, valueIndex) => ({
        onChange: (newRule: DataRetentionRule) => {
          updateItemAtIndex(valueIndex, newRule);
        },
        onRemove: () => removeItemAtIndex(valueIndex),
        value,
      })),
    [values, updateItemAtIndex, removeItemAtIndex],
  );

  return (
    <div className="DataRetentionRuleList__content">
      <DataRetentionRuleListDropTarget />
      {valuesAndChangeHandlers.map(
        ({ value: rule, onChange: onRuleChange, onRemove }, index) => {
          return (
            <React.Fragment key={index}>
              <div key={index} className="DataRetentionRuleList__rule">
                <DataRetentionRuleEditor
                  value={rule}
                  onChange={onRuleChange}
                  onDelete={onRemove}
                />
              </div>
              <DataRetentionRuleListDropTarget />
            </React.Fragment>
          );
        },
      )}
    </div>
  );
};

export default DataRetentionRuleList;
