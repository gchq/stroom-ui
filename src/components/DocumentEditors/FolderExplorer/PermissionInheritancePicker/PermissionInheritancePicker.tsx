import * as React from "react";

import Select from "react-select";
import { PermissionInheritance } from "./types";
import { ControlledInput } from "src/lib/useForm/types";

const options = Object.values(PermissionInheritance).map(o => ({
  value: o,
  label: o,
}));

const PermissionInheritancePicker: React.FunctionComponent<
  ControlledInput<PermissionInheritance>
> = ({ value, onChange }) => (
  <Select
    value={options.find(o => o.value === value)}
    onChange={React.useCallback(
      o => onChange(o.value as PermissionInheritance),
      [onChange],
    )}
    placeholder="Permission Inheritance"
    options={options}
  />
);

export default PermissionInheritancePicker;
