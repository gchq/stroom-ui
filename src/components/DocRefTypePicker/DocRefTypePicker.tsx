import * as React from "react";

import DocRefImage from "../DocRefImage";
import { ControlledInput, OptionType } from "src/types";
import useDocRefTypes from "src/components/DocumentEditors/api/explorer/useDocRefTypes";
import Select, { components } from "react-select";
import { OptionProps } from "react-select/lib/components/Option";
import { SingleValueProps } from "react-select/lib/components/SingleValue";

interface Props extends ControlledInput<string> {
  invalidTypes?: string[];
}

const SingleValue: React.FunctionComponent<SingleValueProps<OptionType>> = ({
  children,
  ...props
}) => {
  if (!!props.data.value) {
    return (
      <div>
        <DocRefImage
          className="DocRefTypePicker--image"
          size="sm"
          docRefType={props.data.value}
        />
        {children}
      </div>
    );
  } else {
    return (
      <components.SingleValue {...props}>{children}</components.SingleValue>
    );
  }
};

const Option: React.FunctionComponent<OptionProps<OptionType>> = (
  props: OptionProps<{ value: string; label: string }>,
) => (
  <components.Option {...props}>
    <DocRefImage
      className="DocRefTypePicker--image"
      size="sm"
      docRefType={props.data.value}
    />
    {props.children}
  </components.Option>
);

let DocRefTypePicker = ({ value, onChange, invalidTypes = [] }: Props) => {
  const docRefTypes: string[] = useDocRefTypes();
  const options: { value: string; label: string }[] = React.useMemo(
    () =>
      docRefTypes
        .filter(d => !invalidTypes.includes(d))
        .map(d => ({ value: d, label: d })),
    [docRefTypes, invalidTypes],
  );

  return (
    <Select
      value={{ value, label: value }}
      onChange={(d: OptionType) => onChange(d.value)}
      options={options}
      components={{ SingleValue, Option }}
    />
  );
};

export default DocRefTypePicker;
