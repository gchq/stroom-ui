import InlineInput from "components/InlineInput/InlineInput";
import { ControlledInput } from "lib/useForm/types";
import * as React from "react";

interface Props extends ControlledInput<any> {
  valueType: string;
}

export const SingleValueWidget: React.FunctionComponent<Props> = ({
  value,
  onChange,
  valueType,
}) => (
  <InlineInput
    type={valueType}
    value={value || ""}
    onChange={(value: any) => onChange(value)}
  />
);

export default SingleValueWidget;
