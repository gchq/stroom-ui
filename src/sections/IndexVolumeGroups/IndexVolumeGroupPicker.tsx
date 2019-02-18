import * as React from "react";
import { useEffect } from "react";

import Select from "react-select";

import { useGetIndexVolumeGroupNames } from "./client";
import { SelectOptionType } from "../../types";
import useReduxState from "../../lib/useReduxState";

export interface Props {
  value?: string;
  onChange: (v: string) => any;
}

const IndexVolumeGroupPicker = ({ value, onChange }: Props) => {
  const getIndexVolumeGroupNames = useGetIndexVolumeGroupNames();
  useEffect(() => {
    getIndexVolumeGroupNames();
  }, []);

  const { groupNames } = useReduxState(
    ({ indexVolumeGroups: { groupNames } }) => ({ groupNames })
  );

  const options: Array<SelectOptionType> = groupNames.map(n => ({
    value: n,
    label: n
  }));

  return (
    <Select
      value={options.find(o => o.value === value)}
      onChange={(o: SelectOptionType) => onChange(o.value)}
      placeholder="Index Volume Group"
      options={options}
    />
  );
};

export default IndexVolumeGroupPicker;
