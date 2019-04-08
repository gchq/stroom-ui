import { PageRequest, StreamAttributeMapResult } from "src/types";
import { ExpressionOperatorWithUuid } from "src/components/ExpressionBuilder/types";

export interface UseStreamSearch {
  page: (p: PageProps) => void;
  search: (p: SearchWithExpressionProps) => void;
  streams: StreamAttributeMapResult;
}

export interface PageProps {
  pageInfo?: PageRequest;
}

export interface SearchWithExpressionProps extends PageProps {
  expressionWithUuids: ExpressionOperatorWithUuid;
}
