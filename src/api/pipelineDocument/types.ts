import {
  PipelineSearchResultType,
  PipelineSearchCriteriaType
} from "../../types";

export interface StoreState {
  results: PipelineSearchResultType;
  criteria: PipelineSearchCriteriaType;
}
