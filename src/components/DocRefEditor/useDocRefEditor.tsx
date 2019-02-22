import { useMemo, useCallback } from "react";

import useReduxState from "../../lib/useReduxState";
import { StoreStateById, defaultStatePerId } from "./redux";
import { ButtonProps } from "../Button";
import { Props as DocRefEditorProps } from ".";
import { useActionCreators } from "./redux";

export interface Props<T extends object> {
  docRefUuid: string;
  saveDocument: (document: T) => void;
}

export interface OutProps<T extends object> {
  isDirty: boolean;
  isSaving: boolean;
  document?: T;
  editorProps: DocRefEditorProps;
  onDocumentChange: (updates: Partial<T>) => void;
}

export function useDocRefEditor<T extends object>({
  docRefUuid,
  saveDocument
}: Props<T>): OutProps<T> {
  const actionCreators = useActionCreators();
  const { isDirty, isSaving, document }: StoreStateById = useReduxState(
    ({ docRefEditors }) => docRefEditors[docRefUuid] || defaultStatePerId,
    [docRefUuid]
  );

  const actionBarItems: Array<ButtonProps> = useMemo(() => {
    return [
      {
        icon: "save",
        disabled: !(isDirty || isSaving),
        title: isSaving ? "Saving..." : isDirty ? "Save" : "Saved",
        onClick: () => {
          if (!!document) {
            saveDocument((document as unknown) as T);
          }
        }
      }
    ] as Array<ButtonProps>;
  }, [isSaving, isDirty, docRefUuid, document]);

  return {
    isDirty,
    isSaving,
    document: !!document ? ((document as unknown) as T) : undefined,
    onDocumentChange: useCallback(
      (updates: Partial<T>) =>
        actionCreators.documentChangesMade(docRefUuid, updates),
      [docRefUuid]
    ),
    editorProps: {
      actionBarItems,
      docRefUuid
    }
  };
}

export default useDocRefEditor;
