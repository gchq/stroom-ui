import * as React from "react";

import Loader from "../../Loader";
import DocRefEditor, {
  useDocRefEditor,
  SwitchedDocRefEditorProps,
} from "../DocRefEditor";
import useDocumentApi from "src/api/useDocumentApi";
import { Dictionary } from "src/types";

const DictionaryEditor: React.FunctionComponent<SwitchedDocRefEditorProps> = ({
  docRefUuid,
}) => {
  // Get data from and subscribe to the store
  const documentApi = useDocumentApi<"Dictionary", Dictionary>("Dictionary");

  const { onDocumentChange, editorProps } = useDocRefEditor<Dictionary>({
    docRefUuid,
    documentApi,
  });
  const { docRefContents } = editorProps;

  const onTextAreaChange = React.useCallback(
    ({ target: { value } }) => onDocumentChange({ data: value }),
    [onDocumentChange],
  );

  return !!docRefContents ? (
    <DocRefEditor {...editorProps}>
      <textarea value={docRefContents.data} onChange={onTextAreaChange} />
    </DocRefEditor>
  ) : (
    <Loader message={`Loading Dictionary ${docRefUuid}`} />
  );
};

export default DictionaryEditor;
