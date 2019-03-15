import {
  ExpressionOperatorWithUuid,
  PageRequest,
  StreamAttributeMapResult
} from "../../types";

export interface UseStreamSearch {
  search: (p: SearchProps) => void;
  searchWithExpression: (p: SearchWithExpressionProps) => void;
  streams: StreamAttributeMapResult;
}

export interface SearchProps {
  pageInfo: PageRequest;
}

export interface SearchWithExpressionProps extends SearchProps {
  expressionWithUuids: ExpressionOperatorWithUuid;
}
