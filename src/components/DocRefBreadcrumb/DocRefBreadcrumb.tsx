import * as React from "react";

import { DocRefConsumer, DocRefWithLineage } from "../../types";

export interface Props {
  docRefWithLineage: DocRefWithLineage;
  openDocRef: DocRefConsumer;
  className?: string;
}

const Divider = () => <div className="DocRefBreadcrumb__divider">/</div>;

const DocRefBreadcrumb = ({
  docRefWithLineage: {
    lineage,
    node: { name }
  },
  openDocRef,
  className = ""
}: Props) => (
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

export default DocRefBreadcrumb;
