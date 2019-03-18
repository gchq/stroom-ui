import { ExpressionOperatorWithUuid } from "../../types";

export interface ExpressionSearchCallback {
  isExpression: boolean;
  expression: ExpressionOperatorWithUuid;
  searchString: string;
}
