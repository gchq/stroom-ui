import * as React from "react";
import { useState, useMemo } from "react";

import Select from "react-select";

import { useIndexVolumeGroupNames } from "src/api/indexVolumeGroup";
import { SelectOptionType } from "../../../types";
import { PickerProps, UsePickerProps, PickerBaseProps } from "./types";

const IndexVolumeGroupPicker = ({
  value,
  onChange,
  valuesToFilterOut = []
}: PickerProps) => {
  const groupNames = useIndexVolumeGroupNames();

  const options: Array<SelectOptionType> = useMemo(
    () =>
      groupNames
        .filter(n => !valuesToFilterOut.includes(n))
        .map(n => ({
          value: n,
          label: n
        })),
    [groupNames, valuesToFilterOut]
  );

  return (
    <Select
      value={options.find(o => o.value === value)}
      onChange={(o: SelectOptionType) => onChange(o.value)}
      placeholder="Index Volume Group"
      options={options}
    />
  );
};

export const usePicker = (baseProps?: PickerBaseProps): UsePickerProps => {
  const [value, onChange] = useState<string | undefined>(undefined);

  return {
    ...baseProps,
    value,
    onChange,
    reset: () => onChange(undefined)
  };
};

export default IndexVolumeGroupPicker;
