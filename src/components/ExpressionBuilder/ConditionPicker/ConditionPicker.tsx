import * as React from "react";
import Select from "react-select";
import {
  ConditionType,
  ConditionDisplayValues,
  conditionTypes,
} from "../types";

interface Props {
  className?: string;
  conditionOptions?: ConditionType[];
  value?: ConditionType;
  onChange: (c: ConditionType) => any;
}

interface ConditionOption {
  value: string;
  label: string;
}

const ConditionPicker: React.FunctionComponent<Props> = ({
  className,
  conditionOptions = conditionTypes,
  value,
  onChange,
}) => {
  const options: ConditionOption[] = React.useMemo(
    () =>
      conditionOptions.map(c => ({
        value: c,
        label: ConditionDisplayValues[c],
      })),
    [conditionOptions],
  );

  return (
    <Select
      className={className}
      placeholder="Condition"
      value={options.find(o => o.value === value)}
      onChange={(o: ConditionOption) => onChange(o.value as ConditionType)}
      options={options}
    />
  );
};

export default ConditionPicker;
