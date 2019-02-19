import * as React from "react";
import { useMemo } from "react";

import { findItem } from "../../lib/treeUtils";
import { DocRefConsumer, DocRefWithLineage } from "../../types";
import Loader from "../Loader";
import { useDocumentTree } from "../FolderExplorer/useDocumentTree";

export interface Props {
  docRefUuid: string;
  openDocRef: DocRefConsumer;
  className?: string;
}

const Divider = () => <div className="DocRefBreadcrumb__divider">/</div>;

const DocRefBreadcrumb = ({
  docRefUuid,
  openDocRef,
  className = ""
}: Props) => {
  const documentTree = useDocumentTree();

  const docRefWithLineage = useMemo(
    () => findItem(documentTree, docRefUuid) as DocRefWithLineage,
    [documentTree, docRefUuid]
  );

  if (!docRefWithLineage || !docRefWithLineage.node) {
    return <Loader message={`Loading Doc Ref ${docRefUuid}...`} />;
  }

  const {
    lineage,
    node: { name }
  } = docRefWithLineage;

  return (
    <div className={`DocRefBreadcrumb ${className || ""}`}>
      {lineage.map(l => (
        <React.Fragment key={l.uuid}>
          <Divider />
          <a
            className="DocRefBreadcrumb__link"
            title={l.name}
            onClick={() => openDocRef(l)}
          >
            {l.name}
          </a>
        </React.Fragment>
      ))}
      <Divider />
      <div className="DocRefBreadcrumb__name">{name}</div>
    </div>
  );
};

export default DocRefBreadcrumb;
