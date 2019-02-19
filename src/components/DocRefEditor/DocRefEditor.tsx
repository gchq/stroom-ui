import * as React from "react";

import AppSearchBar from "../AppSearchBar";
import { DocRefIconHeader } from "../IconHeader";
import DocRefBreadcrumb from "../DocRefBreadcrumb";
import Button, { ButtonProps } from "../Button";
import { DocRefWithLineage, DocRefConsumer } from "../../types";
import { findItem } from "../../lib/treeUtils";
import Loader from "../Loader";
import { useDocumentTree } from "../FolderExplorer/useDocumentTree";
import useHistory from "../../lib/useHistory";

export interface Props {
  actionBarItems: Array<ButtonProps>;
  docRefUuid: string;
  children?: React.ReactNode;
}

const DocRefEditor = ({ actionBarItems, children, docRefUuid }: Props) => {
  const history = useHistory();
  const documentTree = useDocumentTree();

  const docRefWithLineage = findItem(
    documentTree,
    docRefUuid
  ) as DocRefWithLineage;

  const openDocRef: DocRefConsumer = d =>
    history.push(`/s/doc/${d.type}/${d.uuid}`);

  if (!docRefWithLineage) {
    return <Loader message="Loading Doc Ref" />;
  }

  const { node } = docRefWithLineage;

  return (
    <div className="DocRefEditor">
      <AppSearchBar
        pickerId="doc-ref-editor-app-search"
        className="DocRefEditor__searchBar"
        onChange={openDocRef}
      />

      <DocRefIconHeader
        docRefType={node.type}
        className="DocRefEditor__header"
        text={node.name || "no name"}
      />

      <DocRefBreadcrumb
        className="DocRefEditor__breadcrumb"
        docRefUuid={node.uuid}
        openDocRef={openDocRef}
      />

      <div className="DocRefEditor__actionButtons">
        {actionBarItems.map((actionBarItem, i) => (
          <Button key={i} circular {...actionBarItem} />
        ))}
      </div>
      <div className="DocRefEditor__main">{children}</div>
    </div>
  );
};

export default DocRefEditor;
