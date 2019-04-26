import * as React from "react";

import Select from "react-select";
import { PermissionInheritance } from "./types";
import { ControlledInput } from "lib/useForm/types";
import useReactSelect from "lib/useReactSelect";

const options = Object.values(PermissionInheritance).map(({ name }) => name);

const PermissionInheritancePicker: React.FunctionComponent<
  ControlledInput<PermissionInheritance>
> = ({ value, onChange }) => {
  const { _options, _onChange, _value } = useReactSelect({
    options,
    onChange,
    value,
  });

  return (
    <Select
      placeholder="Permission Inheritance"
      options={_options}
      value={_value}
      onChange={_onChange}
    />
  );
};
export default PermissionInheritancePicker;
