import * as React from "react";
import Select from "react-select";
import { ConditionType, ConditionDisplayValues } from "../types";

interface Props {
  className?: string;
  conditionOptions?: ConditionType[];
  value?: ConditionType;
  onChange: (c: ConditionType) => any;
}

interface ConditionOption {
  value: ConditionType;
  label: string;
}

const DEFAULT_OPTIONS: ConditionType[] = Object.keys(
  ConditionDisplayValues,
) as ConditionType[];

const ConditionPicker: React.FunctionComponent<Props> = ({
  className,
  conditionOptions = DEFAULT_OPTIONS,
  value,
  onChange,
}) => {
  const options = React.useMemo(() => {
    return conditionOptions.map(d => ({
      value: d[0] as ConditionType,
      label: d[1],
    }));
  }, [conditionOptions]);

  return (
    <Select
      className={className}
      placeholder="Condition"
      value={options.find(o => o.value === value)}
      onChange={(o: ConditionOption) => onChange(o.value)}
      options={options}
    />
  );
};

export default ConditionPicker;
