import * as React from "react";
import Select from "react-select";
import {
  ConditionType,
  ConditionDisplayValues,
  conditionTypes,
} from "../types";
import InlineSelect, {
  SelectOption,
} from "components/InlineSelect/InlineSelect";

interface Props {
  conditionOptions?: ConditionType[];
  value?: ConditionType;
  onChange: (c: ConditionType) => any;
}

const ConditionPicker: React.FunctionComponent<Props> = ({
  conditionOptions = conditionTypes,
  value,
  onChange,
}) => {
  const options: SelectOption[] = React.useMemo(
    () =>
      conditionOptions.map(c => ({
        value: c,
        label: ConditionDisplayValues[c],
      })),
    [conditionOptions],
  );

  const selected = options.find(option => option.value === value);
  return (
    <InlineSelect
      selected={!!selected ? selected.value : undefined}
      onChange={(value: string) => onChange(value as ConditionType)}
      options={options}
    />
  );
};

export default ConditionPicker;
