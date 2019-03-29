import { ConnectDropTarget, ConnectDragSource } from "react-dnd";

import {
  PipelineElementType,
  ElementDefinition,
  PipelineDocumentType,
  PipelineAsTreeType,
} from "../../types";
import { UseDocRefEditorProps } from "../DocumentEditors/DocRefEditor";

export enum DragDropTypes {
  ELEMENT = "element",
  PALLETE_ELEMENT = "paletteElement",
}
export interface DragObject {
  element: ElementDefinition;
  recycleData?: PipelineElementType;
}
export interface DropCollectedProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
  draggingItemType?: string | null | symbol;
  canDrop: boolean;
}
export interface DragCollectedProps {
  connectDragSource: ConnectDragSource;
  isDragging: boolean;
}

export interface PipelineProps {
  asTree?: PipelineAsTreeType;
  pipelineEditApi: PipelineEditApi;
  useEditorProps: UseDocRefEditorProps<PipelineDocumentType>;
}

export interface PipelineEditApi {
  selectedElementId?: string;
  elementInitialValues: object;
  settingsUpdated: (p: { description: string }) => void;
  elementSelected: (elementId: string, initialValues?: object) => void;
  elementSelectionCleared: () => void;
  elementMoved: (itemToMove: string, destination: string) => void;
  elementAdded: (
    parentId: string,
    elementDefinition: ElementDefinition,
    name: string,
  ) => void;
  elementDeleted: (elementId: string) => void;
  elementReinstated: (
    parentId: string,
    recycleData: PipelineElementType,
  ) => void;
  elementPropertyUpdated: (
    element: string,
    name: string,
    propertyType: string,
    propertyValue: any,
  ) => void;
  elementPropertyRevertToParent: (elementId: string, name: string) => void;
  elementPropertyRevertToDefault: (elementId: string, name: string) => void;
}

export enum CellType {
  EMPTY,
  ELBOW,
  ELEMENT,
}

export interface RecycleBinItem {
  recycleData?: PipelineElementType;
  element: ElementDefinition;
}
export interface PipelineLayoutInfo {
  column: number;
  row: number;
}

export interface PipelineLayoutInfoById {
  [uuid: string]: PipelineLayoutInfo;
}

export interface PipelineLayoutCell {
  cellType: CellType;
  uuid?: string;
}

export interface PipelineLayoutRow {
  columns: PipelineLayoutCell[];
}

export interface PipelineLayoutGrid {
  rows: PipelineLayoutRow[];
}
