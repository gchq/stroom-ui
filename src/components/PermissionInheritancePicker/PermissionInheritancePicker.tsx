import * as React from "react";
import { useCallback } from "react";

import Select from "react-select";
import {
  PermissionInheritance,
  SelectOptionType,
  SelectOptionsType,
  ControlledInput
} from "../../types";

const options: SelectOptionsType = Object.values(PermissionInheritance).map(
  o => ({
    value: o,
    label: o
  })
);

const PermissionInheritancePicker = ({
  value,
  onChange
}: ControlledInput<PermissionInheritance>) => (
  <Select
    value={options.find(o => o.value === value)}
    onChange={useCallback(
      (o: SelectOptionType) => onChange(o.value as PermissionInheritance),
      [onChange]
    )}
    placeholder="Permission Inheritance"
    options={options}
  />
);

export default PermissionInheritancePicker;
