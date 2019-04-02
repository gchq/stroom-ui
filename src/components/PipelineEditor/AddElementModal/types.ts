import { ElementDefinition } from "src/types";

export type OnAddElement = (
  parentId: string,
  elementDefinition: ElementDefinition,
  name: string,
) => void;

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
