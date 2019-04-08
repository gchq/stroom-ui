import * as React from "react";

import Loader from "../../Loader";
import DocRefEditor, {
  useDocRefEditor,
  SwitchedDocRefEditorProps,
} from "../DocRefEditor";
import useDocumentApi from "src/api/useDocumentApi";
import { DictionaryDoc } from "src/api/useDocumentApi/types/dictionary";

const DictionaryEditor: React.FunctionComponent<SwitchedDocRefEditorProps> = ({
  docRefUuid,
}) => {
  // Get data from and subscribe to the store
  const documentApi = useDocumentApi<"DictionaryDoc", DictionaryDoc>(
    "DictionaryDoc",
  );

  const { onDocumentChange, editorProps } = useDocRefEditor<DictionaryDoc>({
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
    <Loader message={`Loading DictionaryDoc ${docRefUuid}`} />
  );
};

export default DictionaryEditor;
