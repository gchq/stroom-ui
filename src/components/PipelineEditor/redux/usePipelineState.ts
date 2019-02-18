import { useEffect } from "react";

import { useFetchPipeline } from "../client";
import useReduxState from "../../../lib/useReduxState";

export const usePipelineState = (pipelineId: string) => {
  const fetchPipeline = useFetchPipeline();
  useEffect(() => {
    fetchPipeline(pipelineId);
  }, [pipelineId]);

  const { pipelineStates } = useReduxState(
    ({ pipelineEditor: { pipelineStates } }) => ({ pipelineStates })
  );

  return pipelineStates[pipelineId];
};

export default usePipelineState;
