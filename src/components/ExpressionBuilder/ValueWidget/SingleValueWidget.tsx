import * as React from "react";
import { ControlledInput } from "src/types";

interface Props extends ControlledInput<any> {
  valueType: string;
}

export const SingleValueWidget: React.FunctionComponent<Props> = ({
  value,
  onChange,
  valueType,
}) => (
  <input
    placeholder="value"
    type={valueType}
    value={value || ""}
    onChange={({ target: { value } }) => onChange(value)}
  />
);

export default SingleValueWidget;
