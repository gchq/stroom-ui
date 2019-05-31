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
import { useEffect, useMemo, useCallback } from "react";
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
  const sortedRules = useMemo(
    () => values.sort((l, r) => (l.ruleNumber >= r.ruleNumber ? 1 : -1)),
    [values],
  );

  console.log({ sortedRules });
  const {
    items,
    addItem,
    updateItemAtIndex,
    removeItemAtIndex,
  } = useListReducer<DataRetentionRule>(getKey, sortedRules);

  useEffect(() => onChange(items), [onChange, items]);

  const valuesAndChangeHandlers: ValueAndChangeHandler[] = useMemo(
    () =>
      sortedRules.map((value, valueIndex) => ({
        onChange: (newRule: DataRetentionRule) => {
          updateItemAtIndex(valueIndex, newRule);
        },
        onRemove: () => removeItemAtIndex(valueIndex),
        value,
      })),
    [sortedRules, updateItemAtIndex, removeItemAtIndex],
  );

  const handleRuleMove = useCallback(
    (ruleNumber: number, newPosition: number) => {
      // We stop caring about maintaining the items array using the reducer.
      // We'll move the rule to its new position in the items array
      // then re-calcualte all the ruleNumbers, then call onChange to refresh
      // everything.
      const movingRuleIndex = items.findIndex(
        item => item.ruleNumber === ruleNumber,
      );

      let newRuleIndex = newPosition;
      if (newRuleIndex > movingRuleIndex) {
        newRuleIndex = newRuleIndex - 1;
      }

      // Move rule to its new position in the array
      items.splice(newRuleIndex, 0, items.splice(movingRuleIndex, 1)[0]);

      // Update the ruleNumbers according to their position in the array
      const itemsWithUpdatedRuleNumbers = items.map((item, index) => {
        item.ruleNumber = index + 1;
        return item;
      });

      onChange(itemsWithUpdatedRuleNumbers);
    },
    [updateItemAtIndex, onChange],
  );

  return (
    <div className="DataRetentionRuleList__content">
      <DataRetentionRuleListDropTarget position={0} moveRule={handleRuleMove} />
      {valuesAndChangeHandlers
        .sort((l, r) => (l.value.ruleNumber >= r.value.ruleNumber ? 1 : -1))
        .map(({ value: rule, onChange: onRuleChange, onRemove }, index) => {
          return (
            <React.Fragment key={index}>
              <div key={index} className="DataRetentionRuleList__rule">
                <DataRetentionRuleEditor
                  value={rule}
                  onChange={onRuleChange}
                  onDelete={onRemove}
                />
              </div>
              <DataRetentionRuleListDropTarget
                position={index + 1}
                moveRule={handleRuleMove}
              />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default DataRetentionRuleList;
