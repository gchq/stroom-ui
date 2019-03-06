import * as React from "react";
import { useEffect } from "react";

import Loader from "../Loader";
import DocRefEditor, { useDocRefEditor } from "../DocRefEditor";
import { useApi } from "../../api/dictionaryDocument";
import { Dictionary } from "../../types";

export interface Props {
  dictionaryUuid: string;
}

const DictionaryEditor: React.FunctionComponent<Props> = ({
  dictionaryUuid
}: Props) => {
  // Get data from and subscribe to the store
  const { fetchDocument, saveDocument } = useApi();

  useEffect(() => {
    fetchDocument(dictionaryUuid);
  }, [fetchDocument, dictionaryUuid]);

  const { docRefContents, onDocumentChange, editorProps } = useDocRefEditor<
    Dictionary
  >({
    docRefUuid: dictionaryUuid,
    saveDocument
  });

  if (!docRefContents) {
    return <Loader message={`Loading Dictionary ${dictionaryUuid}`} />;
  }

  return (
    <DocRefEditor {...editorProps}>
      <textarea
        value={docRefContents.data}
        onChange={({ target: { value } }) => onDocumentChange({ data: value })}
      />
    </DocRefEditor>
  );
};

export default DictionaryEditor;
