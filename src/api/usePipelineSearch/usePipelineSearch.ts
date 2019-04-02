import { useState, useCallback } from "react";
import {
  PipelineSearchResultType,
  PipelineSearchCriteriaType,
} from "src/types";
import useApi from "./useApi";

interface UsePipelineSearch {
  results: PipelineSearchResultType;
  criteria: PipelineSearchCriteriaType;
  updateCriteria: (criteria: Partial<PipelineSearchCriteriaType>) => void;
  searchPipelines: () => void;
}

const DEFAULT_SEARCH_RESULT: PipelineSearchResultType = {
  total: 0,
  pipelines: [],
};
const DEFAULT_CRITERIA: PipelineSearchCriteriaType = {
  filter: "",
  pageOffset: 0,
  pageSize: 10,
};

const usePipelineSearch = (): UsePipelineSearch => {
  const [results, setResults] = useState<PipelineSearchResultType>(
    DEFAULT_SEARCH_RESULT,
  );
  const [criteria, setCriteria] = useState<PipelineSearchCriteriaType>(
    DEFAULT_CRITERIA,
  );
  const { searchPipelines } = useApi();

  return {
    results,
    criteria,
    updateCriteria: useCallback(
      updates => setCriteria({ ...criteria, ...updates }),
      [criteria, setCriteria],
    ),
    searchPipelines: useCallback(() => {
      searchPipelines(criteria).then(s => setResults);
    }, [searchPipelines, setResults]),
  };
};

export default usePipelineSearch;
