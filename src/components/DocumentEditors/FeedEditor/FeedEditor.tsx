import * as React from "react";

import DocRefEditor, { useDocRefEditor } from "../DocRefEditor";
import { SwitchedDocRefEditorProps } from "../DocRefEditor/types";

const FeedEditor: React.FunctionComponent<SwitchedDocRefEditorProps> = ({
  docRefUuid,
}) => {
  const { editorProps } = useDocRefEditor({ docRefUuid });

  return (
    <DocRefEditor {...editorProps}>
      <h2>TODO - I.O.U a meaningful Feed Editor</h2>
    </DocRefEditor>
  );
};

export default FeedEditor;
