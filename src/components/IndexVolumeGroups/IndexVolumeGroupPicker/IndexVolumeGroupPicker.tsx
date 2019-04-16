import * as React from "react";

import Select from "react-select";

import { useIndexVolumeGroupNames } from "src/components/IndexVolumeGroups/api/indexVolumeGroup";
import { SelectOptionType } from "src/types";
import { PickerProps, UsePickerProps, PickerBaseProps } from "./types";

const IndexVolumeGroupPicker: React.FunctionComponent<PickerProps> = ({
  value,
  onChange,
  valuesToFilterOut = [],
}) => {
  const groupNames = useIndexVolumeGroupNames();

  const options: SelectOptionType[] = React.useMemo(
    () =>
      groupNames
        .filter(n => !valuesToFilterOut.includes(n))
        .map(n => ({
          value: n,
          label: n,
        })),
    [groupNames, valuesToFilterOut],
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
  const [value, onChange] = React.useState<string | undefined>(undefined);

  return {
    ...baseProps,
    value,
    onChange,
    reset: () => onChange(undefined),
  };
};

export default IndexVolumeGroupPicker;
