import { ConnectDropTarget, ConnectDragSource } from "react-dnd";

import { UseDocRefEditorProps } from "../DocRefEditor/types";
import {
  PipelineElementType,
  PipelineDocumentType,
} from "components/DocumentEditors/useDocumentApi/types/pipelineDoc";
import { PipelineAsTreeType } from "./AddElementModal/types";
import { ElementDefinition } from "components/DocumentEditors/PipelineEditor/useElements/types";

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

export interface PipelineSettingsValues {
  description: string;
}

export interface PipelineProps {
  asTree?: PipelineAsTreeType;
  pipelineEditApi: PipelineEditApi;
  useEditorProps: UseDocRefEditorProps<PipelineDocumentType>;
}

export interface NewElement {
  parentId: string;
  elementDefinition: ElementDefinition;
  name: string;
}

export interface PipelineEditApi {
  selectedElementId?: string;
  elementInitialValues: object;
  settingsUpdated: (p: PipelineSettingsValues) => void;
  elementSelected: (elementId: string, initialValues?: object) => void;
  elementSelectionCleared: () => void;
  elementMoved: (itemToMove: string, destination: string) => void;
  elementAdded: (newElement: NewElement) => void;
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
  uuid?: string;
}

export interface PipelineLayoutRow {
  columns: PipelineLayoutCell[];
}

export interface PipelineLayoutGrid {
  rows: PipelineLayoutRow[];
}
