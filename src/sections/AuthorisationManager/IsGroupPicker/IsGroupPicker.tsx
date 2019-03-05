import * as React from "react";
import { useCallback } from "react";

import Select from "react-select";
import { SelectOptionType } from "../../../types";
import { IsGroup } from "../../../api/userGroups/useApi";

export interface Props {
  value?: IsGroup;
  onChange: (v: IsGroup) => any;
}

const IS_GROUP_OPTIONS: Array<SelectOptionType> = [
  {
    label: "N/A",
    value: ""
  },
  {
    label: "Group",
    value: "Group"
  },
  {
    label: "User",
    value: "user"
  }
];

const IsGroupPicker = ({ value, onChange }: Props) => (
  <Select
    value={IS_GROUP_OPTIONS.find(o => o.value === value)}
    onChange={useCallback(
      (o: SelectOptionType) => onChange(o.value as IsGroup),
      [onChange]
    )}
    placeholder="Is Group"
    options={IS_GROUP_OPTIONS}
  />
);

export default IsGroupPicker;
