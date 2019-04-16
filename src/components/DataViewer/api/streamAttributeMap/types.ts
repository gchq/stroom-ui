import { ExpressionOperatorWithUuid } from "src/components/ExpressionBuilder/types";
import { PageRequest, StreamAttributeMapResult } from "../../types";

export interface UseStreamSearch {
  page: (p: PageRequest) => void;
  search: (expression: ExpressionOperatorWithUuid, page: PageRequest) => void;
  streams: StreamAttributeMapResult;
}
