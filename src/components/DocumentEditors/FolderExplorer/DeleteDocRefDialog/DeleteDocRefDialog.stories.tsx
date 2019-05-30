import * as React from "react";

import DeleteDocRefDialog, { useDialog } from "./DeleteDocRefDialog";

import { fromSetupSampleData } from "../test";

import JsonDebug from "testing/JsonDebug";
import { DocRefType } from "components/DocumentEditors/useDocumentApi/types/base";
import { addStory } from "testing/storybook/themedStoryGenerator";

const testFolder2 = fromSetupSampleData.children![1];

interface Props {
  testUuids: string[];
}

// Delete
const TestHarness: React.FunctionComponent<Props> = ({ testUuids }) => {
  const [lastConfirmed, setLastConfirmed] = React.useState<object>({});
  const { showDialog, componentProps } = useDialog(setLastConfirmed);

  return (
    <div>
      <button onClick={() => showDialog(testUuids)}>Show</button>
      <DeleteDocRefDialog {...componentProps} />
      <JsonDebug value={lastConfirmed} />
    </div>
  );
};

addStory("Document Editors/Folder", "Delete Doc Ref Dialog",
module, () => (
  <TestHarness
    testUuids={testFolder2.children!.map((d: DocRefType) => d.uuid)}
  />
));
