import { useMemo } from "react";

import useReduxState from "../../lib/useReduxState";
import { StoreStateById, defaultStatePerId } from "./redux";
import { ButtonProps } from "../Button";
import { Props as DocRefEditorProps } from ".";

export interface Props<T> {
  docRefUuid: string;
  saveDocument: (document: T) => void;
}

export interface OutProps<TDocRef> {
  isDirty: boolean;
  isSaving: boolean;
  document?: TDocRef;
  editorProps: DocRefEditorProps;
}

export function useDocRefEditor<TDocRef>({
  docRefUuid,
  saveDocument
}: Props<TDocRef>): OutProps<TDocRef> {
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
            saveDocument((document as unknown) as TDocRef);
          }
        }
      }
    ] as Array<ButtonProps>;
  }, [isSaving, isDirty, docRefUuid, document]);

  return {
    isDirty,
    isSaving,
    document: !!document ? ((document as unknown) as TDocRef) : undefined,
    editorProps: {
      actionBarItems,
      docRefUuid
    }
  };
}

export default useDocRefEditor;
