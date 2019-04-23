import * as React from "react";
import { ExpressionTermType } from "../types";

interface Props {
  idWithinExpression: string;
  value: ExpressionTermType;
  isEnabled: boolean;
}

/**
 * Read only expression operator
 */
const ReadOnlyExpressionTerm: React.FunctionComponent<Props> = ({
  value,
  isEnabled,
}) => {
  let className = "expression-item expression-item--readonly";
  if (!isEnabled) {
    className += " expression-item--disabled";
  }
  let valueStr: string = value.value;
  if (value.condition === "IN_DICTIONARY" && value.value) {
    valueStr = value.value.name;
  }

  return (
    <div className={className}>
      {value.field} {value.condition} {valueStr}
    </div>
  );
};

export default ReadOnlyExpressionTerm;
