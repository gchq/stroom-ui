import { useEffect } from "react";

import usePipelineApi from "../usePipelineApi";
import useReduxState from "../../../lib/useReduxState";

export const usePipelineState = (pipelineId: string) => {
  const pipelineApi = usePipelineApi();
  useEffect(() => {
    pipelineApi.fetchPipeline(pipelineId);
  }, [pipelineId]);

  const { pipelineStates } = useReduxState(
    ({ pipelineEditor: { pipelineStates } }) => ({ pipelineStates })
  );

  return pipelineStates[pipelineId];
};

export default usePipelineState;
