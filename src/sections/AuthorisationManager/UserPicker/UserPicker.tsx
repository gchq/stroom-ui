import * as React from "react";
import { useEffect, useState } from "react";

import Select from "react-select";

import { useFindUsers, IsGroup } from "../../../api/userGroups";
import { SelectOptionType } from "../../../types";

interface Props {
  value?: string;
  onChange: (v: string) => any;
  isGroup: IsGroup;
}

const UserPicker = ({ value, onChange, isGroup }: Props) => {
  const { findUsers, users } = useFindUsers();
  useEffect(() => {
    findUsers(undefined, isGroup, undefined);
  }, [findUsers]);

  const options: Array<SelectOptionType> = users.map(g => ({
    value: g.uuid,
    label: g.name
  }));

  return (
    <Select
      value={options.find(o => o.value === value)}
      onChange={(o: SelectOptionType) => onChange(o.value)}
      placeholder="User"
      options={options}
    />
  );
};

interface UseProps {
  pickerProps: Props;
  reset: () => void;
}

export const usePicker = (isGroup: IsGroup): UseProps => {
  const [value, onChange] = useState<string | undefined>(undefined);

  return {
    pickerProps: { value, onChange, isGroup },
    reset: () => onChange(undefined)
  };
};

export default UserPicker;
