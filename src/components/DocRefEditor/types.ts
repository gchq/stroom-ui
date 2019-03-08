import { StateById } from "../../lib/redux-actions-ts";
import { ButtonProps } from "../Button";

export interface StoreStateById {
  isDirty: boolean;
  isSaving: boolean;
  docRefContents?: object;
}

export type StoreState = StateById<StoreStateById>;

export interface DocRefEditorBaseProps<T> {
  saveDocument: (docRefContents: T) => void;
  docRefUuid: string;
  additionalActionBarItems?: Array<ButtonProps>;
}

export interface DocRefEditorProps<T> extends DocRefEditorBaseProps<T> {
  isDirty: boolean;
  isSaving: boolean;
  children?: React.ReactNode;
}

export interface UseDocRefEditorProps<T extends object> {
  docRefContents?: T;
  editorProps: DocRefEditorProps<T>;
  onDocumentChange: (updates: Partial<T>) => void;
}
