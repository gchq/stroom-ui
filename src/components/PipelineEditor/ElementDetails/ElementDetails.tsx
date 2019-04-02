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
  ElementPropertyType,
  PipelineDocumentType,
} from "src/types";
import Loader from "src/components/Loader";
import useElements from "src/api/useElements";
import { PipelineEditApi } from "../types";

interface Props {
  pipeline: PipelineDocumentType;
  pipelineEditApi: PipelineEditApi;
}

const ElementDetails: React.FunctionComponent<Props> = ({
  pipeline,
  pipelineEditApi,
}) => {
  const { elementDefinitions, elementProperties } = useElements();

  console.log("TODO Initial Values", pipelineEditApi.elementInitialValues);

  if (!pipelineEditApi.selectedElementId) {
    return (
      <div className="element-details__nothing-selected">
        <h3>Please select an element</h3>
      </div>
    );
  }

  const elementType: string =
    (pipeline &&
      pipeline.merged.elements.add &&
      pipeline.merged.elements.add.find(
        (element: PipelineElementType) =>
          element.id === pipelineEditApi.selectedElementId,
      )!.type) ||
    "";
  const allElementTypeProperties: ElementPropertiesType =
    elementProperties[elementType];
  if (!allElementTypeProperties) {
    return <Loader message={`Element Properties Unknown for ${elementType}`} />;
  }

  const sortedElementTypeProperties: ElementPropertyType[] = Object.values(
    allElementTypeProperties,
  ).sort((a: ElementPropertyType, b: ElementPropertyType) =>
    a.displayPriority > b.displayPriority ? 1 : -1,
  );

  let elementDefinition = elementDefinitions.find(
    (e: ElementDefinition) => e.type === elementType,
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
  let elementTypeProperties: ElementPropertyType[] = sortedElementTypeProperties;

  const title = (
    <div className="element-details__title">
      <ElementImage icon={icon} />
      <div>
        <h3>{pipelineEditApi.selectedElementId}</h3>
      </div>
    </div>
  );

  const detailContent = (
    <React.Fragment>
      <p className="element-details__summary">
        This element is a <strong>{typeName}</strong>.
      </p>
      <form className="element-details__form">
        {Object.keys(elementTypeProperties).length === 0 ? (
          <p>There is nothing to configure for this element </p>
        ) : (
          !!pipelineEditApi.selectedElementId &&
          elementTypeProperties.map(
            (elementTypeProperty: ElementPropertyType) => (
              <ElementProperty
                key={elementTypeProperty.name}
                pipeline={pipeline}
                pipelineEditApi={pipelineEditApi}
                elementId={pipelineEditApi.selectedElementId!}
                elementPropertyType={elementTypeProperty}
              />
            ),
          )
        )}
      </form>
    </React.Fragment>
  );

  return (
    <HorizontalPanel
      className="element-details__panel"
      title={title}
      onClose={() => pipelineEditApi.elementSelectionCleared()}
      content={detailContent}
    />
  );
};

export default ElementDetails;
