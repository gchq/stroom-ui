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

import ElementDetails from "./ElementDetails";

import { fullTestData } from "src/testing/data";
import usePipelineState from "../usePipelineState";
import { PipelineDocumentType } from "src/types";

interface Props {
  pipelineId: string;
  testElementId: string;
  testElementConfig: object;
}

const TestHarness: React.FunctionComponent<Props> = ({
  pipelineId,
  testElementId,
  testElementConfig,
}) => {
  const {
    pipelineEditApi,
    useEditorProps: {
      editorProps: { docRefContents },
    },
  } = usePipelineState(pipelineId);
  React.useEffect(() => {
    pipelineEditApi.elementSelected(testElementId, testElementConfig);
  }, [pipelineId]);

  if (!docRefContents) {
    return null;
  }

  return (
    <ElementDetails
      pipeline={docRefContents}
      pipelineEditApi={pipelineEditApi}
    />
  );
};

const stories = storiesOf("Document Editors/Pipeline/Element Details", module);

Object.values(fullTestData.documents.Pipeline)
  .map(p => p as PipelineDocumentType)
  .map(pipeline => {
    pipeline.merged.elements.add!.map(element => {
      stories.add(`${pipeline.uuid} - ${element.id}`, () => (
        <TestHarness
          pipelineId={pipeline.uuid}
          testElementId={element.id}
          testElementConfig={{ splitDepth: 10, splitCount: 10 }}
        />
      ));
    });
  });
