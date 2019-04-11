import * as React from "react";

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
  const { node: docRef } = React.useMemo(
    () => findDocRefWithLineage(docRefUuid),
    [findDocRefWithLineage, docRefUuid],
  );

  React.useEffect(() => {
    addRecentItem(docRef);
  }, [docRefUuid, addRecentItem]);

  console.log("Rendering Switched Doc Ref Editor");

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
