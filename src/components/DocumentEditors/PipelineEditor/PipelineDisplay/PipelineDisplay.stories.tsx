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

import PipelineDisplay from "./PipelineDisplay";
import { testPipelines } from "testing/data/pipelines";

import usePipelineState from "../usePipelineState/usePipelineState";
import { addStory } from "testing/storybook/themedStoryGenerator";

interface TestProps {
  pipelineId: string;
}

const TestHarness: React.FunctionComponent<TestProps> = ({
  pipelineId,
}: TestProps) => {
  const pipelineStateProps = usePipelineState(pipelineId);
  return (
    <PipelineDisplay
      pipelineStateProps={pipelineStateProps}
      showAddElementDialog={() => console.log("Add Element")}
    />
  );
};

Object.entries(testPipelines).forEach(k => {
  addStory("Document Editors/Pipeline/Display", `${k[0]}`, module, () => <TestHarness pipelineId={k[1].uuid} />);
});
