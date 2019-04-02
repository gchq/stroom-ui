import * as uuidv4 from "uuid/v4";

import {
  ExpressionItem,
  ExpressionTermType,
  ExpressionOperatorType,
  ConditionDisplayValues,
  ExpressionTermWithUuid,
  ExpressionOperatorWithUuid,
} from "src/types";

export const getNewTerm = (): ExpressionTermWithUuid => ({
  uuid: uuidv4(),
  type: "term",
  condition: "EQUALS",
  enabled: true,
});

export const getNewOperator = (): ExpressionOperatorWithUuid => ({
  uuid: uuidv4(),
  type: "operator",
  op: "AND",
  enabled: true,
  children: [],
});

function childrenToString(
  expression: ExpressionOperatorType,
  asString: string = "",
) {
  if (!!expression.children) {
    expression.children.forEach((child: ExpressionItem, i: number) => {
      if (child.enabled) {
        if (child.type === "term") {
          let childTerm = child as ExpressionTermType;
          asString += `${childTerm.field} ${childTerm.condition &&
            ConditionDisplayValues[childTerm.condition]} ${childTerm.value}`;
          if (
            expression.children!.length > i + 1 &&
            expression.children![i + 1].enabled
          ) {
            asString += ` ${expression.op} `;
          }
        } else if (child.type === "operator") {
          let childOperator = child as ExpressionOperatorType;
          let childTerms = "";
          asString += `(${childrenToString(childOperator, childTerms)})`;
        }
      }
    });
  }
  return asString;
}

/**
 * Converts an expression to a string.
 *
 * Currently the string is intended only for display, but we
 * might want to parse it back into an expression at some point.
 */
export function toString(expression: ExpressionOperatorType) {
  if (expression.children !== undefined && expression.children.length > 0) {
    return childrenToString(expression);
  }
  return "";
}
