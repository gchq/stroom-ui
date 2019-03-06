import * as React from "react";
import { useState } from "react";

import Select from "react-select";

import { useIndexVolumeGroupNames } from "../../../api/indexVolumeGroup";
import { SelectOptionType } from "../../../types";

export interface Props {
  value?: string;
  onChange: (v: string) => any;
}

const IndexVolumeGroupPicker = ({ value, onChange }: Props) => {
  const groupNames = useIndexVolumeGroupNames();

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

export default IndexVolumeGroupPicker;
