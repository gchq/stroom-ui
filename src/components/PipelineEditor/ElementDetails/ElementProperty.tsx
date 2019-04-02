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

import {
  getParentProperty,
  getChildValue,
  getCurrentValue,
  getElementValue,
} from "../pipelineUtils";
import ElementPropertyFieldDetails from "./ElementPropertyInheritanceInfo";
import ElementPropertyField from "./ElementPropertyField";
import { ElementPropertyType, PipelineDocumentType } from "src/types";
import { PipelineEditApi } from "../types";

interface Props {
  pipeline: PipelineDocumentType;
  pipelineEditApi: PipelineEditApi;
  elementId: string;
  elementPropertyType: ElementPropertyType;
}

const ElementProperty: React.FunctionComponent<Props> = ({
  pipeline,
  pipelineEditApi,
  elementId,
  elementPropertyType,
}) => {
  const value = getElementValue(pipeline, elementId, elementPropertyType.name);
  const childValue = getChildValue(
    pipeline,
    elementId,
    elementPropertyType.name,
  );
  const parentValue = getParentProperty(
    pipeline.configStack,
    elementId,
    elementPropertyType.name,
  );

  const currentValue = getCurrentValue(
    value,
    parentValue,
    elementPropertyType.defaultValue,
    elementPropertyType.type,
  );

  let type: string = elementPropertyType.type.toLowerCase();

  let defaultValue: any = elementPropertyType.defaultValue;
  let docRefTypes: string[] | undefined = elementPropertyType.docRefTypes;
  let name: string = elementPropertyType.name;
  let description: string = elementPropertyType.description;

  return (
    <React.Fragment>
      <label>{description}</label>
      <ElementPropertyField
        {...{
          value: currentValue,
          name,
          pipelineEditApi,
          elementId,
          type,
          docRefTypes,
        }}
      />
      <div className="element-property__advice">
        <p>
          The <em>field name</em> of this property is <strong>{name}</strong>
        </p>
        <ElementPropertyFieldDetails
          pipeline={pipeline}
          pipelineEditApi={pipelineEditApi}
          elementId={elementId}
          name={name}
          value={value}
          defaultValue={defaultValue}
          childValue={childValue}
          parentValue={parentValue}
          type={type}
        />
      </div>
    </React.Fragment>
  );
};

export default ElementProperty;
