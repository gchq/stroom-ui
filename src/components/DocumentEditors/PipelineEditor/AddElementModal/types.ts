import { ElementDefinition } from "src/types";
import { NewElement } from "../types";

export type OnAddElement = (newElement: NewElement) => void;

export interface Props {
  isOpen: boolean;
  onCloseDialog: () => void;
  onAddElement: OnAddElement;
  existingNames: string[];
  parentId?: string;
  elementDefinition?: ElementDefinition;
}

export type ShowDialog = (
  parentId: string,
  elementDefinition: ElementDefinition,
  existingNames: string[],
) => void;

export interface UseDialog {
  componentProps: Props;
  showDialog: ShowDialog;
}

export interface PipelineAsTreeType {
  uuid: string;
  type: string;
  children: PipelineAsTreeType[];
}
