import * as React from "react";

import CreateDocRefDialog, { useDialog } from "./CreateDocRefDialog";

import JsonDebug from "testing/JsonDebug";
import { addStory } from "testing/storybook/themedStoryGenerator";

const TestHarness: React.FunctionComponent = () => {
  const [lastConfirmed, setLastConfirmed] = React.useState<object>({});
  const { showDialog, componentProps } = useDialog(
    (docRefType: string, docRefName: string, permissionInheritance: string) => {
      setLastConfirmed({ docRefType, docRefName, permissionInheritance });
    },
  );

  return (
    <div>
      <h1>Create Doc Ref Test</h1>
      <button onClick={() => showDialog()}>Show</button>
      <CreateDocRefDialog {...componentProps} />
      <JsonDebug value={lastConfirmed} />
    </div>
  );
};

addStory("Document Editors/Folder/Create Doc Ref", "Dialog",
module, () => <TestHarness />);
