/*
 * Copyright 2018 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { useEffect } from "react";

import Button from "../Button";
import { Pipeline } from "../PipelineEditor";
import Loader from "../Loader";
import { actionCreators as pipelineActionCreators } from "../PipelineEditor";

import { actionCreators } from "./redux";
import DebuggerStep from "./DebuggerStep";
import { getNext, getPrevious } from "./pipelineDebugger.utils";
import { useDispatch } from "redux-react-hook";
import useReduxState from "../../lib/useReduxState";
import { useFetchPipeline } from "../PipelineEditor/client";

const { startDebugging } = actionCreators;

const { pipelineElementSelected } = pipelineActionCreators;

export interface Props {
  debuggerId: string;
  pipelineId: string;
}

const PipelineDebugger = ({ pipelineId, debuggerId }: Props) => {
  const dispatch = useDispatch();
  const fetchPipeline = useFetchPipeline();
  const { pipelineStates, debuggers } = useReduxState(
    ({ debuggers, pipelineEditor: { pipelineStates } }) => ({
      debuggers,
      pipelineStates
    })
  );
  const debuggerState = debuggers[debuggerId];
  const pipelineState = pipelineStates[pipelineId];

  useEffect(() => {
    fetchPipeline(pipelineId);
    dispatch(startDebugging(debuggerId, pipelineId));
  }, []);

  if (!debuggerState) {
    return <Loader message="Loading pipeline..." />;
  }

  const onNext = () => {
    const nextElementId = getNext(pipelineState);
    if (nextElementId) {
      dispatch(pipelineElementSelected(pipelineId, nextElementId, {}));
    }
  };
  const onPrevious = () => {
    const nextElementId = getPrevious(pipelineState);
    if (nextElementId) {
      dispatch(pipelineElementSelected(pipelineId, nextElementId, {}));
    }
  };

  return (
    <div className="PipelineDebugger">
      <div>
        <Button icon="chevron-left" text="Previous" onClick={onPrevious} />
        <Button icon="chevron-right" text="Next" onClick={onNext} />
      </div>
      <Pipeline
        pipelineId={pipelineId}
        showAddElementDialog={() =>
          console.error(
            "Adding Elements from Palette not supported in debugger"
          )
        }
      />
      <DebuggerStep debuggerId={debuggerId} />
    </div>
  );
};

export default PipelineDebugger;
