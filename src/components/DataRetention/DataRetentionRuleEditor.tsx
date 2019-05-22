import ExpressionBuilder from "components/ExpressionBuilder";
import InlineInput from "components/InlineInput/InlineInput";
import { useMetaDataSource } from "components/MetaBrowser/api";
import * as React from "react";
import { ChangeEventHandler, useCallback, useEffect } from "react";
import TimeUnitSelect from "./TimeUnitSelect";
import { DataRetentionRule } from "./types/DataRetentionRule";
import Toggle from "react-toggle";

interface Props {
  rule: DataRetentionRule;
  onChange: (dataRetentionRule: DataRetentionRule) => void;
}

const useHandlers = (
  rule: DataRetentionRule,
  onChange: (dataRetentionRule: DataRetentionRule) => void,
) => {
  const handleNameChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => onChange({ ...rule, name: e.target.value }),
    [rule, onChange],
  );

  const handleAgeChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => onChange({ ...rule, age: Number(e.target.value) }),
    [rule, onChange],
  );

  const handleExpressionChange = useCallback(
    expression => onChange({ ...rule, expression }),
    [rule, onChange],
  );

  const handleTimeUnitChange = useCallback(
    e => onChange({ ...rule, timeUnit: e.target.value }),
    [rule, onChange],
  );

  const handleEnabledChange = useCallback(
    e => onChange({ ...rule, enabled: e.target.checked }),
    [rule, onChange],
  );

  const handleForeverChange = useCallback(
    e => onChange({ ...rule, forever: e.target.value === "keep_forever" }),
    [rule, onChange],
  );

  return {
    handleNameChange,
    handleAgeChange,
    handleExpressionChange,
    handleTimeUnitChange,
    handleEnabledChange,
    handleForeverChange,
  };
};

const DataRetentionRuleEditor: React.FunctionComponent<Props> = ({
  rule,
  onChange,
}) => {
  useEffect(() => onChange(rule), [onChange, rule]);

  const dataSource = useMetaDataSource();

  const {
    handleNameChange,
    handleAgeChange,
    handleExpressionChange,
    handleTimeUnitChange,
    handleEnabledChange,
    handleForeverChange,
  } = useHandlers(rule, onChange);

  return (
    <div>
      <div className="DataRetentionRuleEditor__header">
        <h2>
          <InlineInput value={rule.name} onChange={handleNameChange} />
        </h2>
        <Toggle checked={rule.enabled} onChange={handleEnabledChange} />
      </div>

      <h3>Match the following</h3>
      <ExpressionBuilder
        value={rule.expression}
        onChange={handleExpressionChange}
        editMode={true}
        dataSource={dataSource}
      />

      <div>
        <h3>and...</h3>
        <div>
          <label>
            <input
              type="radio"
              name="forever"
              value="keep_forever"
              checked={rule.forever}
              onChange={handleForeverChange}
            />
            keep forever
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="forever"
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
  );
};

export default DataRetentionRuleEditor;
