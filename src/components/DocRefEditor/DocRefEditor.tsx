import * as React from "react";
import { useCallback, useMemo } from "react";

import useReduxState from "../../lib/useReduxState";
import { StoreStateById, defaultStatePerId } from "./redux";

import { useActionCreators } from "./redux";
import AppSearchBar from "../AppSearchBar";
import { DocRefIconHeader } from "../IconHeader";
import DocRefBreadcrumb from "../DocRefBreadcrumb";
import Button, { ButtonProps } from "../Button";
import { DocRefWithLineage, DocRefConsumer } from "../../types";
import { findItem } from "../../lib/treeUtils";
import Loader from "../Loader";
import { useDocumentTree } from "../../api/explorer";
import useRouter from "../../lib/useRouter";

export interface BaseProps<T> {
  saveDocument: (docRefContents: T) => void;
  docRefUuid: string;
  additionalActionBarItems?: Array<ButtonProps>;
}

export interface Props<T> extends BaseProps<T> {
  isDirty: boolean;
  isSaving: boolean;
  children?: React.ReactNode;
}

const DocRefEditor = function<T>({
  saveDocument,
  children,
  docRefUuid,
  additionalActionBarItems
}: Props<T>) {
  const router = useRouter();
  const documentTree = useDocumentTree();

  const docRefWithLineage = useMemo(
    () => findItem(documentTree, docRefUuid) as DocRefWithLineage,
    [documentTree, docRefUuid]
  );

  const openDocRef: DocRefConsumer = useCallback(
    d => router.history!.push(`/s/doc/${d.type}/${d.uuid}`),
    [router]
  );
  const openDocRefPermissions = useCallback(
    () =>
      router.history!.push(
        `/s/authorisationManager/document/${
          docRefWithLineage.node.type
        }/${docRefUuid}`
      ),
    [router, docRefWithLineage]
  );

  const { isDirty, isSaving, docRefContents }: StoreStateById = useReduxState(
    ({ docRefEditors }) => docRefEditors[docRefUuid] || defaultStatePerId,
    [docRefUuid]
  );

  const actionBarItems: Array<ButtonProps> = [
    {
      icon: "save",
      disabled: !(isDirty || isSaving),
      title: isSaving ? "Saving..." : isDirty ? "Save" : "Saved",
      onClick: useCallback(() => {
        if (!!docRefContents) {
          saveDocument((docRefContents as unknown) as T);
        }
      }, [saveDocument, docRefContents])
    },
    {
      icon: "key",
      title: "Permissions",
      onClick: openDocRefPermissions
    }
  ];

  if (!docRefWithLineage) {
    return <Loader message="Loading Doc Ref" />;
  }

  const { node } = docRefWithLineage;

  return (
    <div className="DocRefEditor">
      <AppSearchBar className="DocRefEditor__searchBar" onChange={openDocRef} />

      <DocRefIconHeader
        docRefType={node.type}
        className="DocRefEditor__header"
        text={node.name || "no name"}
      />

      <DocRefBreadcrumb
        className="DocRefEditor__breadcrumb"
        docRefWithLineage={docRefWithLineage}
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

export interface UseDocRefEditorProps<T extends object> {
  docRefContents?: T;
  editorProps: Props<T>;
  onDocumentChange: (updates: Partial<T>) => void;
}

export function useDocRefEditor<T extends object>({
  docRefUuid,
  saveDocument
}: BaseProps<T>): UseDocRefEditorProps<T> {
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
