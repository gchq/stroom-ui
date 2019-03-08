import * as React from "react";

import { DocRefConsumer } from "../../types";
import { useDocRefWithLineage } from "../../api/explorer";

interface Props {
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
  const {
    lineage,
    node: { name }
  } = useDocRefWithLineage(docRefUuid);

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
