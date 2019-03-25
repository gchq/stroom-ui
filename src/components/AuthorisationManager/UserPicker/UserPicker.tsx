import * as React from "react";
import { useEffect, useState, useMemo } from "react";

import Select from "react-select";

import { useManageUsers } from "../../../api/userGroups";
import { SelectOptionType } from "../../../types";
import { Props, BaseProps, UseProps } from "./types";

const DEFAULT_USER_UUIDS_TO_FILTER_OUT: Array<string> = [];

const UserPicker = ({
  value,
  onChange,
  isGroup,
  valuesToFilterOut = DEFAULT_USER_UUIDS_TO_FILTER_OUT
}: Props) => {
  const { findUsers, users } = useManageUsers();
  useEffect(() => {
    findUsers(undefined, isGroup, undefined);
  }, [findUsers]);

  const options: Array<SelectOptionType> = useMemo(
    () =>
      users
        .filter(user => !valuesToFilterOut.includes(user.uuid))
        .map(g => ({
          value: g.uuid,
          label: g.name
        })),
    [users, valuesToFilterOut]
  );

  return (
    <Select
      value={options.find(o => o.value === value)}
      onChange={(o: SelectOptionType) => onChange(o.value)}
      placeholder="User"
      options={options}
    />
  );
};

export const usePicker = ({
  isGroup,
  valuesToFilterOut
}: BaseProps): UseProps => {
  const [value, onChange] = useState<string | undefined>(undefined);

  return {
    pickerProps: { value, onChange, isGroup, valuesToFilterOut },
    reset: () => onChange(undefined)
  };
};

export default UserPicker;
