import * as React from "react";

import DocRefImage from "../DocRefImage";
import { ControlledInput } from "src/types";
import useDocRefTypes from "src/api/explorer/useDocRefTypes";
import Select from "react-select";
import { OptionProps } from "react-select/lib/components/Option";

interface Props extends ControlledInput<string> {
  invalidTypes?: string[];
}

const DocRefTypeOption = ({
  data,
  innerProps: { onClick },
}: OptionProps<string>) => (
  // <div className={`hoverable ${inFocus ? "inFocus" : ""}`} onClick={onClick}>
  <div onClick={onClick}>
    <DocRefImage size="sm" docRefType={data} />
    {data}
  </div>
);

let DocRefTypePicker = ({ value, onChange, invalidTypes = [] }: Props) => {
  const docRefTypes: string[] = useDocRefTypes();
  const options = React.useMemo(
    () => docRefTypes.filter(d => !invalidTypes.includes(d)),
    [docRefTypes, invalidTypes],
  );

  return (
    <Select
      value={value}
      onChange={(d: string) => onChange(d)}
      options={options}
      getOptionLabel={d => d}
      components={{ Option: DocRefTypeOption }}
    />
  );
};

export default DocRefTypePicker;
