import * as React from "react";
import { SwitchedDocRefEditorProps } from "../DocRefEditor/types";
import DocRefEditor, { useDocRefEditor } from "../DocRefEditor";

const StatisticsStoreEditor: React.FunctionComponent<
  SwitchedDocRefEditorProps
> = ({ docRefUuid }) => {
  const { editorProps } = useDocRefEditor({ docRefUuid });

  return (
    <DocRefEditor {...editorProps}>
      <h2>TODO - I.O.U a meaningful StatisticsStoreEditor</h2>
    </DocRefEditor>
  );
};

export default StatisticsStoreEditor;
