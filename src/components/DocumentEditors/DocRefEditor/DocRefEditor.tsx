import * as React from "react";

import {
  UseDocRefEditorProps,
  DocRefEditorProps,
  UseDocRefEditorPropsIn,
} from "./types";

import AppSearchBar from "../../AppSearchBar";
import DocRefIconHeader from "../../DocRefIconHeader";
import DocRefBreadcrumb from "../../DocRefBreadcrumb";
import Button, { ButtonProps } from "../../Button";
import { useDocumentTree } from "src/api/explorer";
import useAppNavigation from "../../AppChrome/useAppNavigation";
import { DocumentApi } from "src/api/useDocumentApi/types/documentApi";

const DocRefEditor = <T extends {}>({
  onClickSave,
  children,
  docRefUuid,
  additionalActionBarItems,
  isDirty,
}: DocRefEditorProps<T>) => {
  const { goToAuthorisationsForDocument, goToEditDocRef } = useAppNavigation();
  const { findDocRefWithLineage } = useDocumentTree();
  const { node: docRef } = React.useMemo(
    () => findDocRefWithLineage(docRefUuid),
    [findDocRefWithLineage, docRefUuid],
  );

  const openDocRefPermissions = React.useCallback(
    () => goToAuthorisationsForDocument(docRefUuid),
    [goToAuthorisationsForDocument, docRefUuid],
  );

  const actionBarItems: ButtonProps[] = [];
  if (!!onClickSave) {
    actionBarItems.push({
      icon: "save",
      disabled: !isDirty,
      title: isDirty ? "Save" : "Saved",
      onClick: onClickSave,
    });
  }
  actionBarItems.push({
    icon: "key",
    title: "Permissions",
    onClick: openDocRefPermissions,
  });

  return (
    <div className="DocRefEditor">
      <AppSearchBar
        className="DocRefEditor__searchBar"
        onChange={goToEditDocRef}
      />

      <DocRefIconHeader
        docRefType={docRef.type}
        className="DocRefEditor__header"
        text={docRef.name || "no name"}
      />

      <DocRefBreadcrumb
        className="DocRefEditor__breadcrumb"
        docRefUuid={docRef.uuid}
        openDocRef={goToEditDocRef}
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
  documentApi,
}: UseDocRefEditorPropsIn<T>): UseDocRefEditorProps<T> {
  const [isDirty, setIsDirty] = React.useState<boolean>(false);
  const [docRefContents, setDocRefContents] = React.useState<T | undefined>(
    undefined,
  );

  const fetchDocument:
    | DocumentApi<T>["fetchDocument"]
    | undefined = !!documentApi ? documentApi.fetchDocument : undefined;

  React.useEffect(() => {
    if (!!fetchDocument) {
      fetchDocument(docRefUuid).then(d => {
        setDocRefContents(d);
        setIsDirty(false);
      });
    }
  }, [fetchDocument, setDocRefContents, setIsDirty, docRefUuid]);

  // FIX
  console.log("docRefContents", docRefContents);

  const onClickSave = React.useCallback(() => {
    if (!!docRefContents && documentApi && !!documentApi.saveDocument) {
      documentApi.saveDocument((docRefContents as unknown) as T).then(() => {
        setIsDirty(false);
      });
    }
  }, [!!documentApi ? documentApi.saveDocument : undefined, docRefContents]);

  return {
    onDocumentChange: React.useCallback(
      (updates: Partial<T>) => {
        if (!!docRefContents) {
          setDocRefContents({ ...docRefContents, ...updates });
          setIsDirty(true);
        } else {
          console.error("No existing doc ref contents to merge in");
        }
      },
      [docRefContents, setIsDirty, setDocRefContents],
    ),
    editorProps: {
      isDirty,
      docRefContents: !!docRefContents
        ? ((docRefContents as unknown) as T)
        : undefined,
      onClickSave: !!documentApi ? onClickSave : undefined,
      docRefUuid,
    },
  };
}

export default DocRefEditor;
