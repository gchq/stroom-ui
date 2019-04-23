import * as React from "react";
import { ExpressionTermType } from "../../types";

interface Props {
  term: ExpressionTermType;
  isEnabled: boolean;
}

/**
 * Read only expression operator
 */
const ReadOnlyExpressionTerm: React.FunctionComponent<Props> = ({
  term,
  isEnabled,
}) => {
  let className = "expression-item expression-item--readonly";
  if (!isEnabled) {
    className += " expression-item--disabled";
  }
  let value = term.value;
  if (term.condition === "IN_DICTIONARY" && term.value) {
    value = term.value.name;
  }

  return (
    <div className={className}>
      {term.field} {term.condition} {value}
    </div>
  );
};

export default ReadOnlyExpressionTerm;
