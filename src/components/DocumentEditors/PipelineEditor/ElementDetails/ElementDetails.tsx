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

import ElementImage from "../ElementImage";
import ElementProperty from "./ElementProperty";
import { ElementPropertyType } from "components/DocumentEditors/PipelineEditor/useElements/types";
import Loader from "components/Loader";
import useElement from "components/DocumentEditors/PipelineEditor/useElement";
import { PipelineEditApi } from "../types";
import {
  PipelineDocumentType,
  PipelineElementType,
} from "components/DocumentEditors/useDocumentApi/types/pipelineDoc";

interface Props {
  pipeline: PipelineDocumentType;
  pipelineEditApi: PipelineEditApi;
}

const ElementDetails: React.FunctionComponent<Props> = ({
  pipeline,
  pipelineEditApi,
}) => {
  const { selectedElementId } = pipelineEditApi;
  const elementType: string =
    (pipeline &&
      selectedElementId &&
      pipeline.merged.elements.add &&
      pipeline.merged.elements.add.find(
        (element: PipelineElementType) => element.id === selectedElementId,
      )!.type) ||
    "";

  const { definition, properties } = useElement(elementType);

  if (!selectedElementId) {
    return (
      <div className="element-details__nothing-selected">
        <h3>Please select an element</h3>
      </div>
    );
  }

  if (!properties) {
    return <Loader message={`Element Properties Unknown for ${elementType}`} />;
  }

  if (!definition) {
    return (
      <Loader
        message={`Could not find element definition for ${elementType}`}
      />
    );
  }

  return (
    <React.Fragment>
      <div className="element-details__title">
        <ElementImage icon={definition.icon} />
        <div>
          <h3>{selectedElementId}</h3>
        </div>
      </div>
      <p className="element-details__summary">
        This element is a <strong>{elementType}</strong>.
      </p>
      <form className="element-details__form">
        {Object.keys(properties).length === 0 ? (
          <p>There is nothing to configure for this element </p>
        ) : (
          !!selectedElementId &&
          properties.map((elementTypeProperty: ElementPropertyType) => (
            <ElementProperty
              key={elementTypeProperty.name}
              pipeline={pipeline}
              pipelineEditApi={pipelineEditApi}
              elementId={selectedElementId!}
              elementPropertyType={elementTypeProperty}
            />
          ))
        )}
      </form>
    </React.Fragment>
  );
};

export default ElementDetails;
