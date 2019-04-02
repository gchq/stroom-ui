import * as React from "react";

import DocRefImage from "../DocRefImage";
import { OptionType, ControlledInput } from "src/types";
import DropdownSelect, { DropdownOptionProps } from "../DropdownSelect";
import useDocRefTypes from "src/api/explorer/useDocRefTypes";

const DocRefTypeOption = ({
  inFocus,
  option: { text, value },
  onClick,
}: DropdownOptionProps) => (
  <div className={`hoverable ${inFocus ? "inFocus" : ""}`} onClick={onClick}>
    <DocRefImage size="sm" docRefType={value} />
    {text}
  </div>
);

let DocRefTypePicker = (props: ControlledInput<string>) => {
  const docRefTypes: string[] = useDocRefTypes();

  let options: OptionType[] = React.useMemo(
    () =>
      docRefTypes.map((d: string) => ({
        text: d,
        value: d,
      })),
    [docRefTypes],
  );
  return (
    <DropdownSelect
      {...props}
      options={options}
      OptionComponent={DocRefTypeOption}
    />
  );
};

export default DocRefTypePicker;
