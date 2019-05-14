import * as React from "react";
import { ControlledInput } from "lib/useForm/types";
import InlineInput from "components/InlineInput/InlineInput";

interface Props extends ControlledInput<any> {
  valueType: string;
}

export const SingleValueWidget: React.FunctionComponent<Props> = ({
  value,
  onChange,
  // valueType,
}) => (
  <InlineInput
    // type={valueType}
    value={value || ""}
    onChange={value => onChange(value)}
  />
);

export default SingleValueWidget;
