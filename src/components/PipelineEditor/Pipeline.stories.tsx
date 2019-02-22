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
import { storiesOf } from "@storybook/react";

import Pipeline from "./Pipeline";
import { testPipelines } from "./test";
import StroomDecorator from "../../lib/storybook/StroomDecorator";

import "../../styles/main.css";
import usePipelineState from "./usePipelineState";

const pipelineStories = storiesOf("Pipeline/Display", module).addDecorator(
  StroomDecorator
);

interface TestProps {
  pipelineId: string;
}

const TestPipeline: React.FunctionComponent<TestProps> = ({
  pipelineId
}: TestProps) => {
  const pipelineStateProps = usePipelineState(pipelineId);
  return (
    <Pipeline
      pipelineId={pipelineId}
      pipelineStateProps={pipelineStateProps}
      showAddElementDialog={() => console.log("Add Element")}
    />
  );
};

Object.keys(testPipelines).forEach(k => {
  pipelineStories.add(k, () => <TestPipeline pipelineId={k} />);
});
