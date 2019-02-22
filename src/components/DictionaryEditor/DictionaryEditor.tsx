import * as React from "react";
import { useEffect } from "react";

import Loader from "../Loader";
import DocRefEditor, { useDocRefEditor } from "../DocRefEditor";
import useApi from "./useDictionaryApi";
import { Dictionary } from "../../types";

export interface Props {
  dictionaryUuid: string;
}

const DictionaryEditor: React.FunctionComponent<Props> = ({
  dictionaryUuid
}: Props) => {
  // Get data from and subscribe to the store
  const api = useApi();

  useEffect(() => {
    api.fetchDocument(dictionaryUuid);
  }, [dictionaryUuid]);

  const { document, onDocumentChange, editorProps } = useDocRefEditor<
    Dictionary
  >({
    docRefUuid: dictionaryUuid,
    saveDocument: api.saveDocument
  });

  if (!document) {
    return <Loader message={`Loading Dictionary ${dictionaryUuid}`} />;
  }

  return (
    <DocRefEditor {...editorProps}>
      <textarea
        value={document.data}
        onChange={({ target: { value } }) => onDocumentChange({ data: value })}
      />
    </DocRefEditor>
  );
};

export default DictionaryEditor;
