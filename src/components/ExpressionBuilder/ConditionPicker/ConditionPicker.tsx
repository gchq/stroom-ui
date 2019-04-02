import * as React from "react";
import Select from "react-select";
import {
  SelectOptionType,
  ConditionType,
  ConditionDisplayValues,
  SelectOptionsType,
} from "src/types";

interface Props {
  className?: string;
  conditionOptions?: SelectOptionsType;
  value?: ConditionType;
  onChange: (c: ConditionType) => any;
}

const DEFAULT_OPTIONS: SelectOptionsType = Object.entries(
  ConditionDisplayValues,
).map(d => ({
  value: d[0],
  label: d[1],
}));

const ConditionPicker = ({
  className,
  conditionOptions = DEFAULT_OPTIONS,
  value,
  onChange,
}: Props) => (
  <Select
    className={className}
    placeholder="Condition"
    value={conditionOptions.find(o => o.value === value)}
    onChange={(o: SelectOptionType) => onChange(o.value as ConditionType)}
    options={conditionOptions}
  />
);

export default ConditionPicker;
