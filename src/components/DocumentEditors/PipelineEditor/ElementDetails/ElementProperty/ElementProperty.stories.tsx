import * as React from "react";

import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import usePipelineState from "components/DocumentEditors/PipelineEditor/usePipelineState";
import ElementProperty from "./ElementProperty";
import { fullTestData } from "testing/data";
import {
  PipelineDocumentType,
  PipelineElementType,
} from "components/DocumentEditors/useDocumentApi/types/pipelineDoc";
import {
  ElementPropertiesType,
  ElementPropertyType,
} from "../../useElements/types";

const stories = storiesOf(
  "Document Editors/Pipeline/Element Details/Element Property",
  module,
);

interface Props {
  pipelineId: string;
  testElementId: string;
  elementPropertyType: ElementPropertyType;
}

const TestHarness: React.FunctionComponent<Props> = ({
  pipelineId,
  testElementId,
  elementPropertyType,
}) => {
  const { pipelineEditApi } = usePipelineState(pipelineId);
  const { elementSelected } = pipelineEditApi;
  React.useEffect(() => {
    elementSelected(testElementId);
  }, [elementSelected, pipelineId, testElementId]);
  const { pipeline } = pipelineEditApi;

  return pipeline !== undefined ? (
    <ElementProperty {...{ pipelineEditApi, elementPropertyType }} />
  ) : (
    <div>NO PIPELINE {pipelineId}</div>
  );
};

const testPipeline: PipelineDocumentType = fullTestData.documents
  .Pipeline[0] as PipelineDocumentType;
const testElement: PipelineElementType = testPipeline.merged.elements.add[0];
const elementProperties: ElementPropertiesType =
  fullTestData.elementProperties[testElement.type];
const testElementPropertyType: ElementPropertyType = Object.values(
  elementProperties,
)[0];

addThemedStories(stories, () => (
  <TestHarness
    pipelineId={testPipeline.uuid}
    testElementId={testElement.id}
    elementPropertyType={testElementPropertyType}
  />
));
