import * as React from "react";
import { useEffect, useState } from "react";

import Select from "react-select";

import { useFindUsers } from "../../../api/userGroups";
import { SelectOptionType } from "../../../types";

export interface Props {
  value?: string;
  onChange: (v: string) => any;
}

const UserGroupGroupPicker = ({ value, onChange }: Props) => {
  const { findUsers, users: groups } = useFindUsers();
  useEffect(() => {
    findUsers(undefined, "Group", undefined);
  }, [findUsers]);

  const options: Array<SelectOptionType> = groups.map(g => ({
    value: g.uuid,
    label: g.name
  }));

  return (
    <Select
      value={options.find(o => o.value === value)}
      onChange={(o: SelectOptionType) => onChange(o.value)}
      placeholder="User Group"
      options={options}
    />
  );
};

export interface UseProps extends Props {
  reset: () => void;
}

export const usePicker = (): UseProps => {
  const [value, onChange] = useState<string | undefined>(undefined);

  return {
    value,
    onChange,
    reset: () => onChange(undefined)
  };
};

export default UserGroupGroupPicker;
