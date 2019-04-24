import * as React from "react";

import CreatableSelect from "react-select/lib/Creatable";

import { useIndexVolumeGroups } from "components/IndexVolumeGroups/api";
import { PickerProps, UsePickerProps, PickerBaseProps } from "./types";

const IndexVolumeGroupPicker: React.FunctionComponent<PickerProps> = ({
  value,
  onChange,
  valuesToFilterOut = [],
}) => {
  const { groups, createIndexVolumeGroup } = useIndexVolumeGroups();

  const options: string[] = React.useMemo(
    () => groups.map(g => g.name).filter(n => !valuesToFilterOut.includes(n)),
    [groups, valuesToFilterOut],
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const onCreateOption = React.useCallback(
    d => {
      setIsLoading(true);
      createIndexVolumeGroup(d).then(() => {
        onChange(d);
        setIsLoading(false);
      });
    },
    [isLoading],
  );

  return (
    <CreatableSelect
      isLoading={isLoading}
      value={value}
      onChange={onChange}
      placeholder="Index Volume Group"
      onCreateOption={onCreateOption}
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
