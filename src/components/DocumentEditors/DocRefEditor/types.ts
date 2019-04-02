import { ButtonProps } from "../../Button";
import { DocumentApi } from "src/api/useDocumentApi";

export interface DocRefEditorProps<T> {
  docRefUuid: string;
  additionalActionBarItems?: ButtonProps[];
  onClickSave?: () => void;
  isDirty: boolean;
  docRefContents?: T;
  children?: React.ReactNode;
}

export interface UseDocRefEditorPropsIn<T extends object> {
  docRefUuid: string;
  documentApi?: DocumentApi<T>;
}

export interface UseDocRefEditorProps<T extends object> {
  editorProps: DocRefEditorProps<T>;
  onDocumentChange: (updates: Partial<T>) => void;
}

export interface SwitchedDocRefEditorProps {
  docRefUuid: string;
}
