import { ButtonProps } from "../Button";
import { DocumentApi } from "../../api/documentApi";

export interface DocRefEditorProps<T> {
  docRefUuid: string;
  additionalActionBarItems?: Array<ButtonProps>;
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
