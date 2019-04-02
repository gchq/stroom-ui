import {
  ExpressionHasUuid,
  ExpressionOperatorWithUuid,
  ExpressionOperatorType,
} from "src/types";

/**
 * TODO: shouldn't actually have to use this -- ideally the ExpressionBuilder would
 * generate JSON compatible with the resource's endpoints. I.e. jackson binding
 * fails if we have these uuids.
 */
const cleanExpression = (
  expression: ExpressionOperatorWithUuid,
): ExpressionOperatorType => {
  // UUIDs are not part of Expression
  delete expression.uuid;
  expression.children.forEach((child: ExpressionHasUuid) => {
    delete child.uuid;
  });

  // Occasionally the ExpressionBuilder will put a value on the root, which is wrong.
  // It does this when there's an underscore in the term, e.g. feedName=thing_thing.
  //delete expression.value; // TODO oh rly?
  return expression;
};

export default cleanExpression;
