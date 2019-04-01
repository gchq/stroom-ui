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
import { useMemo, useCallback } from "react";
import { pipe } from "ramda";
import {
  DragSource,
  DropTarget,
  DragSourceSpec,
  DragSourceCollector,
  DropTargetSpec,
  DropTargetCollector
} from "react-dnd";

import ElementImage from "../ElementImage";
import { canMovePipelineElement, getInitialValues } from "./pipelineUtils";
import { DragDropTypes, DragCollectedProps, DropCollectedProps } from "./types";
import { isValidChildType } from "./elementUtils";
import Button from "../Button";
import {
  ElementDefinition,
  PipelinePropertyType,
  PipelineDocumentType,
  PipelineAsTreeType,
  ElementPropertiesType
} from "src/types";
import { ShowDialog } from "./AddElementModal";
import { PipelineEditApi } from "./types";

interface Props {
  pipelineId: string;
  elementId: string;
  className?: string;
  showAddElementDialog: ShowDialog;
  existingNames: Array<string>;
  pipelineEditApi: PipelineEditApi;
  pipeline: PipelineDocumentType;
  asTree: PipelineAsTreeType;
  elementDefinition: ElementDefinition;
  elementProperties: ElementPropertiesType;
}

interface DragObject {
  pipelineId: string;
  elementId: string;
  elementDefinition: ElementDefinition;
}

interface EnhancedProps extends Props, DropCollectedProps, DragCollectedProps {}

const dragSource: DragSourceSpec<Props, DragObject> = {
  canDrag(props) {
    return true;
  },
  beginDrag(props) {
    return {
      pipelineId: props.pipelineId,
      elementId: props.elementId,
      elementDefinition: props.elementDefinition
    };
  }
};

const dragCollect: DragSourceCollector<DragCollectedProps> = (
  connect,
  monitor
) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const dropTarget: DropTargetSpec<Props> = {
  canDrop(props, monitor) {
    const { pipeline, elementId, asTree, elementDefinition } = props;

    switch (monitor.getItemType()) {
      case DragDropTypes.ELEMENT:
        const dropeeId = monitor.getItem().elementId;
        const dropeeDefinition = monitor.getItem().elementDefinition;
        const isValidChild = isValidChildType(
          elementDefinition,
          dropeeDefinition,
          0
        );

        const isValid = canMovePipelineElement(
          pipeline,
          asTree,
          dropeeId,
          elementId
        );

        return isValidChild && isValid;
      case DragDropTypes.PALLETE_ELEMENT:
        const dropeeType = monitor.getItem().element;
        if (dropeeType) {
          const isValidChild = isValidChildType(
            elementDefinition,
            dropeeType,
            0
          );
          return isValidChild;
        }
        return true;

      default:
        return false;
    }
  },
  drop(props, monitor) {
    const {
      elementId,
      pipelineEditApi,
      showAddElementDialog,
      existingNames
    } = props;

    switch (monitor.getItemType()) {
      case DragDropTypes.ELEMENT: {
        const newElementId = monitor.getItem().elementId;
        pipelineEditApi.elementMoved(newElementId, elementId);
        break;
      }
      case DragDropTypes.PALLETE_ELEMENT: {
        const { element, recycleData } = monitor.getItem();

        if (recycleData) {
          pipelineEditApi.elementReinstated(elementId, recycleData);
        } else {
          showAddElementDialog(elementId, element, existingNames);
        }
        break;
      }
      default:
        break;
    }
  }
};

const dropCollect: DropTargetCollector<DropCollectedProps> = (
  connect,
  monitor
) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  draggingItemType: monitor.getItemType()
});

const enhance = pipe(
  DragSource(DragDropTypes.ELEMENT, dragSource, dragCollect),
  DropTarget(
    [DragDropTypes.ELEMENT, DragDropTypes.PALLETE_ELEMENT],
    dropTarget,
    dropCollect
  )
);

const PipelineElement = ({
  pipelineId,
  elementId,
  connectDragSource,
  connectDropTarget,
  isOver,
  canDrop,
  isDragging,
  draggingItemType,
  pipelineEditApi,
  elementDefinition,
  elementProperties,
  pipeline
}: EnhancedProps) => {
  const onElementClick = useCallback(() => {
    // We need to get the initial values for this element and make sure they go into the state
    // TODO THIS MUST SURELY BE FIXED
    const thisElementProperties = pipeline.merged.properties.add!.filter(
      (property: PipelinePropertyType) => property.element === elementId
    );
    const initialValues = getInitialValues(
      elementProperties,
      thisElementProperties
    );
    return pipelineEditApi.elementSelected(elementId, initialValues);
  }, [pipelineId, elementId, elementProperties, pipeline]);

  const className = useMemo(() => {
    const classNames = ["Pipeline-element"];
    classNames.push("raised-low");

    if (!!draggingItemType) {
      if (isOver) {
        classNames.push("over");
      }
      if (isDragging) {
        classNames.push("dragging");
      }

      if (canDrop) {
        classNames.push("can_drop");
      } else {
        classNames.push("cannot_drop");
      }

      if (pipelineEditApi.selectedElementId === elementId) {
        classNames.push("selected");
      }
    } else {
      classNames.push("borderless");
    }

    return classNames.join(" ");
  }, [
    draggingItemType,
    isDragging,
    canDrop,
    pipelineEditApi.selectedElementId,
    elementId
  ]);

  return connectDragSource(
    connectDropTarget(
      <div className={className} onClick={onElementClick}>
        {elementDefinition && (
          <ElementImage
            className="Pipeline-element__icon"
            icon={elementDefinition.icon}
          />
        )}
        <Button className="Pipeline-element__type" text={elementId} />
      </div>
    )
  );
};

export default enhance(PipelineElement);
