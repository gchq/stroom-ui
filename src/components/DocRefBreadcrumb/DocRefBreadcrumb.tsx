import * as React from "react";

import { DocRefConsumer } from "src/types";
import { useDocumentTree } from "src/api/explorer";

interface Props {
  docRefUuid: string;
  openDocRef: DocRefConsumer;
  className?: string;
}

const Divider = () => <div className="DocRefBreadcrumb__divider">/</div>;

const DocRefBreadcrumb: React.FunctionComponent<Props> = ({
  docRefUuid,
  openDocRef,
  className = "",
}) => {
  const { findDocRefWithLineage } = useDocumentTree();
  const { lineage } = React.useMemo(() => findDocRefWithLineage(docRefUuid), [
    findDocRefWithLineage,
    docRefUuid,
  ]);

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
