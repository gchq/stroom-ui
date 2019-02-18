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

import ElementImage from "../../ElementImage";
import HorizontalPanel from "../../HorizontalPanel";
import ElementProperty from "./ElementProperty";
import {
  PipelineElementType,
  ElementPropertiesType,
  ElementDefinition,
  ElementPropertyType
} from "../../../types";
import Loader from "../../../components/Loader";
import usePipelineState from "../redux/usePipelineState";
import useElements from "../redux/useElements";

export interface Props {
  pipelineId: string;
  onClose: () => void;
}

const ElementDetails = ({ pipelineId, onClose }: Props) => {
  const pipelineState = usePipelineState(pipelineId);
  const { elementDefinitions, elementProperties } = useElements();

  let initialValues: object | undefined;
  let selectedElementId: string | undefined;
  if (pipelineState) {
    initialValues = pipelineState.selectedElementInitialValues;
    selectedElementId = pipelineState.selectedElementId;
  }
  console.log("TODO Initial Values", initialValues);

  if (!selectedElementId) {
    return (
      <div className="element-details__nothing-selected">
        <h3>Please select an element</h3>
      </div>
    );
  }

  const elementType: string =
    (pipelineState &&
      pipelineState.pipeline &&
      pipelineState.pipeline.merged.elements.add &&
      pipelineState.pipeline.merged.elements.add.find(
        (element: PipelineElementType) => element.id === selectedElementId
      )!.type) ||
    "";
  const allElementTypeProperties: ElementPropertiesType =
    elementProperties[elementType];
  if (!allElementTypeProperties) {
    return <Loader message={`Element Properties Unknown for ${elementType}`} />;
  }

  const sortedElementTypeProperties: Array<ElementPropertyType> = Object.values(
    allElementTypeProperties
  ).sort((a: ElementPropertyType, b: ElementPropertyType) =>
    a.displayPriority > b.displayPriority ? 1 : -1
  );

  let elementDefinition = elementDefinitions.find(
    (e: ElementDefinition) => e.type === elementType
  );

  if (!elementDefinition) {
    return (
      <Loader
        message={`Could not find element definition for ${elementType}`}
      />
    );
  }

  let icon: string = elementDefinition.icon;
  let typeName: string = elementType;
  let elementTypeProperties: Array<
    ElementPropertyType
  > = sortedElementTypeProperties;

  const title = (
    <div className="element-details__title">
      <ElementImage icon={icon} />
      <div>
        <h3>{selectedElementId}</h3>
      </div>
    </div>
  );

  const content = (
    <React.Fragment>
      <p className="element-details__summary">
        This element is a <strong>{typeName}</strong>.
      </p>
      <form className="element-details__form">
        {Object.keys(elementTypeProperties).length === 0 ? (
          <p>There is nothing to configure for this element </p>
        ) : (
          !!selectedElementId &&
          elementTypeProperties.map(
            (elementTypeProperty: ElementPropertyType) => (
              <ElementProperty
                key={elementTypeProperty.name}
                pipelineId={pipelineId}
                elementId={selectedElementId!}
                elementPropertyType={elementTypeProperty}
              />
            )
          )
        )}
      </form>
    </React.Fragment>
  );

  return (
    <HorizontalPanel
      className="element-details__panel"
      title={title}
      onClose={() => onClose()}
      content={content}
    />
  );
};

export default ElementDetails;
