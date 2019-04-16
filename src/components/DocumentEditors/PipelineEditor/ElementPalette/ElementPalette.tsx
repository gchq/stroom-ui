import * as React from "react";
import { DropTargetSpec, DropTargetCollector, DropTarget } from "react-dnd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ElementCategory from "./ElementCategory";
import { getBinItems } from "../pipelineUtils";
import { DragDropTypes, DropCollectedProps } from "../types";

import useElements from "src/api/useElements";
import { groupByCategory, keyByType } from "../elementUtils";
import { PipelineDocumentType } from "src/components/DocumentEditors/useDocumentApi/types/pipelineDoc";
import {
  ElementDefinitionsByCategory,
  ElementDefinitionsByType,
  ElementDefinition,
} from "src/api/useElements/types";

interface Props {
  pipeline: PipelineDocumentType;
  showDeleteElementDialog: (elementId: string) => void;
}

interface EnhancedProps extends Props, DropCollectedProps {}

const dropTarget: DropTargetSpec<Props> = {
  canDrop(props, monitor) {
    return true;
  },
  drop({ showDeleteElementDialog }, monitor) {
    const { elementId } = monitor.getItem();
    showDeleteElementDialog(elementId);
  },
};

const dropCollect: DropTargetCollector<DropCollectedProps> = (
  connect,
  monitor,
) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  draggingItemType: monitor.getItemType(),
  canDrop: monitor.canDrop(),
});

const enhance = DropTarget<Props, DropCollectedProps>(
  [DragDropTypes.ELEMENT],
  dropTarget,
  dropCollect,
);

const ElementPalette: React.FunctionComponent<EnhancedProps> = ({
  pipeline,
  connectDropTarget,
  draggingItemType,
  isOver,
}) => {
  const { elementDefinitions } = useElements();

  const byCategory: ElementDefinitionsByCategory = React.useMemo(
    () => groupByCategory(elementDefinitions),
    [elementDefinitions],
  );

  const byType: ElementDefinitionsByType = React.useMemo(
    () => keyByType(elementDefinitions),
    [elementDefinitions],
  );

  const recycleBinItems = React.useMemo(
    () => (pipeline ? getBinItems(pipeline, byType) : []),
    [pipeline, byType],
  );

  return connectDropTarget(
    <div className="element-palette">
      {draggingItemType === DragDropTypes.ELEMENT ? (
        <div className="Pipeline-editor__bin">
          <FontAwesomeIcon
            icon="trash"
            size="lg"
            color={isOver ? "red" : "black"}
          />
        </div>
      ) : (
        <React.Fragment>
          <ElementCategory category="Bin" elementsWithData={recycleBinItems} />
          {Object.entries(byCategory).map(k => (
            <ElementCategory
              key={k[0]}
              category={k[0]}
              elementsWithData={k[1].map((e: ElementDefinition) => ({
                element: e,
              }))}
            />
          ))}
        </React.Fragment>
      )}
    </div>,
  );
};

export default enhance(ElementPalette);
