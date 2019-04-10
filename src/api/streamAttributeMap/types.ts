import { PageRequest, StreamAttributeMapResult } from "src/types";
import { ExpressionOperatorWithUuid } from "src/components/ExpressionBuilder/types";

export interface UseStreamSearch {
  page: (p: PageRequest) => void;
  search: (expression: ExpressionOperatorWithUuid, page: PageRequest) => void;
  streams: StreamAttributeMapResult;
}
