import * as React from "react";

import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import usePipelineState from "components/DocumentEditors/PipelineEditor/usePipelineState";
import ElementProperty from "./ElementProperty";
import { fullTestData } from "testing/data";
import { PipelineDocumentType } from "components/DocumentEditors/useDocumentApi/types/pipelineDoc";
import {
  ElementPropertiesType,
  ElementPropertyType,
} from "../../useElements/types";
import JsonDebug from "testing/JsonDebug";

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

  const piplineProperties = React.useMemo(
    () =>
      pipeline
        ? {
            configStack: pipeline.configStack.map(c => ({
              properties: c.properties,
            })),
            merged: {
              properties: pipeline.merged.properties,
            },
          }
        : {},
    [pipeline],
  );

  return pipeline !== undefined ? (
    <div>
      <ElementProperty {...{ pipelineEditApi, elementPropertyType }} />
      <JsonDebug value={{ piplineProperties }} />
    </div>
  ) : (
    <div>NO PIPELINE {pipelineId}</div>
  );
};

class TestDeduplicator {
  elementPropertyTypesSeen: string[] = [];

  isUnique(property: ElementPropertyType) {
    let unique: boolean = !this.elementPropertyTypesSeen.includes(
      property.type,
    );
    this.elementPropertyTypesSeen.push(property.type);
    return unique;
  }
}

const testDeduplicator: TestDeduplicator = new TestDeduplicator();

fullTestData.documents.Pipeline.forEach((pipeline: PipelineDocumentType) => {
  pipeline.merged.elements.add.forEach(element => {
    const elementProperties: ElementPropertiesType =
      fullTestData.elementProperties[element.type];
    Object.values(elementProperties)
      .filter(p => testDeduplicator.isUnique(p))
      .forEach((elementProperty: ElementPropertyType) => {
        const stories = storiesOf(
          `Document Editors/Pipeline/Element Details/Element Property/${
            elementProperty.type
          }`,
          module,
        );
        addThemedStories(stories, () => (
          <TestHarness
            pipelineId={pipeline.uuid}
            testElementId={element.id}
            elementPropertyType={elementProperty}
          />
        ));
      });
  });
});
