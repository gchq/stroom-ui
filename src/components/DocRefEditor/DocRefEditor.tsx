import * as React from "react";
import { useCallback } from "react";

import useReduxState from "../../lib/useReduxState";
import { defaultStatePerId } from "./redux";
import {
  StoreStateById,
  UseDocRefEditorProps,
  DocRefEditorProps,
  DocRefEditorBaseProps
} from "./types";

import { useActionCreators } from "./redux";
import AppSearchBar from "../AppSearchBar";
import { DocRefIconHeader } from "../IconHeader";
import DocRefBreadcrumb from "../DocRefBreadcrumb";
import Button, { ButtonProps } from "../Button";
import { DocRefConsumer } from "../../types";
import { useDocRefWithLineage } from "../../api/explorer";
import useRouter from "../../lib/useRouter";

const DocRefEditor = function<T>({
  saveDocument,
  children,
  docRefUuid,
  additionalActionBarItems
}: DocRefEditorProps<T>) {
  const router = useRouter();
  const { node: docRef } = useDocRefWithLineage(docRefUuid);

  const openDocRef: DocRefConsumer = useCallback(
    d => router.history!.push(`/s/doc/${d.type}/${d.uuid}`),
    [router]
  );
  const openDocRefPermissions = useCallback(
    () =>
      router.history!.push(
        `/s/authorisationManager/document/${docRef.type}/${docRefUuid}`
      ),
    [router, docRef]
  );

  const { isDirty, isSaving, docRefContents }: StoreStateById = useReduxState(
    ({ docRefEditors }) => docRefEditors[docRefUuid] || defaultStatePerId,
    [docRefUuid]
  );

  const actionBarItems: Array<ButtonProps> = [];
  if (!!saveDocument) {
    actionBarItems.push({
      icon: "save",
      disabled: !(isDirty || isSaving),
      title: isSaving ? "Saving..." : isDirty ? "Save" : "Saved",
      onClick: useCallback(() => {
        if (!!docRefContents && saveDocument) {
          saveDocument((docRefContents as unknown) as T);
        }
      }, [saveDocument, docRefContents])
    });
  }
  actionBarItems.push({
    icon: "key",
    title: "Permissions",
    onClick: openDocRefPermissions
  });

  return (
    <div className="DocRefEditor">
      <AppSearchBar className="DocRefEditor__searchBar" onChange={openDocRef} />

      <DocRefIconHeader
        docRefType={docRef.type}
        className="DocRefEditor__header"
        text={docRef.name || "no name"}
      />

      <DocRefBreadcrumb
        className="DocRefEditor__breadcrumb"
        docRefUuid={docRef.uuid}
        openDocRef={openDocRef}
      />

      <div className="DocRefEditor__actionButtons">
        {actionBarItems
          .concat(additionalActionBarItems || [])
          .map((actionBarItem, i) => (
            <Button key={i} circular {...actionBarItem} />
          ))}
      </div>
      <div className="DocRefEditor__main">{children}</div>
    </div>
  );
};

export function useDocRefEditor<T extends object>({
  docRefUuid,
  saveDocument
}: DocRefEditorBaseProps<T>): UseDocRefEditorProps<T> {
  const { documentChangesMade } = useActionCreators();

  const { isDirty, isSaving, docRefContents }: StoreStateById = useReduxState(
    ({ docRefEditors }) => docRefEditors[docRefUuid] || defaultStatePerId,
    [docRefUuid]
  );

  return {
    docRefContents: !!docRefContents
      ? ((docRefContents as unknown) as T)
      : undefined,
    onDocumentChange: useCallback(
      (updates: Partial<T>) => documentChangesMade(docRefUuid, updates),
      [documentChangesMade, docRefUuid]
    ),
    editorProps: {
      isDirty,
      isSaving,
      saveDocument,
      docRefUuid
    }
  };
}

export default DocRefEditor;
