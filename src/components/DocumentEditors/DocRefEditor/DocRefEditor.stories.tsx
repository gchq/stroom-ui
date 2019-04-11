import * as React from "react";

import { storiesOf } from "@storybook/react";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";
import DocRefEditor, { useDocRefEditor } from ".";
import { useDocumentTree } from "src/api/explorer";
import { iterateNodes } from "src/lib/treeUtils";
import DocRefTypePicker from "src/components/DocRefTypePicker";
import useDocumentApi, { ResourcesByDocType } from "src/api/useDocumentApi";
import JsonDebug from "src/testing/JsonDebug";

const stories = storiesOf("Document Editors", module);

const TestHarness: React.FunctionComponent = () => {
  const { documentTree } = useDocumentTree();
  const [docRefType, setDocRefType] = React.useState<keyof ResourcesByDocType>(
    "Dictionary",
  );
  const setDocRefTypeSafe = React.useCallback(
    d => setDocRefType(d as keyof ResourcesByDocType),
    [setDocRefType],
  );
  const documentApi = useDocumentApi(docRefType);

  const docRefUuid = React.useMemo(() => {
    let d;
    iterateNodes(documentTree, (_, node) => {
      if (node.type === docRefType) {
        d = node.uuid;
        return true;
      }
      return false;
    });

    return d || documentTree.uuid;
  }, [docRefType, documentTree]);

  const { editorProps, onDocumentChange } = useDocRefEditor({
    docRefUuid,
    documentApi,
  });
  const { docRefContents } = editorProps;

  return !!docRefContents ? (
    <DocRefEditor {...editorProps}>
      <DocRefTypePicker value={docRefType} onChange={setDocRefTypeSafe} />
      <JsonDebug
        value={{
          documentApi: Object.keys(documentApi),
          docRefContents,
          onDocumentChange: JSON.stringify(onDocumentChange),
        }}
      />
    </DocRefEditor>
  ) : (
    <div>Nowt Available</div>
  );
};

addThemedStories(stories, () => <TestHarness />);
