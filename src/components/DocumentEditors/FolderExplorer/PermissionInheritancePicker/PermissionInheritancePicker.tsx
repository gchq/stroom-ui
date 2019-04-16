import * as React from "react";

import Select from "react-select";
import {
  PermissionInheritance,
  SelectOptionType,
  SelectOptionsType,
  ControlledInput,
} from "src/types";

const options: SelectOptionsType = Object.values(PermissionInheritance).map(
  o => ({
    value: o,
    label: o,
  }),
);

const PermissionInheritancePicker: React.FunctionComponent<
  ControlledInput<PermissionInheritance>
> = ({ value, onChange }) => (
  <Select
    value={options.find(o => o.value === value)}
    onChange={React.useCallback(
      (o: SelectOptionType) => onChange(o.value as PermissionInheritance),
      [onChange],
    )}
    placeholder="Permission Inheritance"
    options={options}
  />
);

export default PermissionInheritancePicker;
