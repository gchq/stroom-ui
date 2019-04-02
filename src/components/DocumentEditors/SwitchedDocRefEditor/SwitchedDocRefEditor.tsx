import * as React from "react";
import { useEffect, useMemo } from "react";

import PathNotFound from "../../PathNotFound";
import useRecentItems from "src/lib/useRecentItems";
import { useDocumentTree } from "src/api/explorer";
import { SwitchedDocRefEditorProps } from "../DocRefEditor";
import { docRefEditorClasses } from "./types";

let SwitchedDocRefEditor: React.FunctionComponent<
  SwitchedDocRefEditorProps
> = ({ docRefUuid }) => {
  const { addRecentItem } = useRecentItems();
  const { findDocRefWithLineage } = useDocumentTree();
  const { node: docRef } = useMemo(() => findDocRefWithLineage(docRefUuid), [
    findDocRefWithLineage,
    docRefUuid,
  ]);

  useEffect(() => {
    addRecentItem(docRef);
  });

  const EditorClass = docRefEditorClasses[docRef.type];
  if (!!EditorClass) {
    return <EditorClass docRefUuid={docRef.uuid} />;
  } else {
    return (
      <PathNotFound
        message={`no editor provided for this doc ref type ${docRef.type}`}
      />
    );
  }
};

export default SwitchedDocRefEditor;
