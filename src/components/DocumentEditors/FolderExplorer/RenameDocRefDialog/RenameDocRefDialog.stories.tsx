import * as React from "react";
import { storiesOf } from "@storybook/react";

import RenameDocRefDialog, { useDialog } from "./RenameDocRefDialog";
import { fromSetupSampleData } from "../test";

import JsonDebug from "src/testing/JsonDebug";
import { DocRefType } from "src/api/useDocumentApi/types/base";

const testDocRef = fromSetupSampleData.children![0].children![0].children![0];

interface Props {
  testDocRef: DocRefType;
}

// Rename
const TestHarness: React.FunctionComponent<Props> = ({ testDocRef }) => {
  const [lastConfirmed, setLastConfirmed] = React.useState<object>({});
  const { showDialog, componentProps } = useDialog((docRef, newName) =>
    setLastConfirmed({ docRef, newName }),
  );

  return (
    <div>
      <h1>Rename Document Test</h1>
      <button onClick={() => showDialog(testDocRef)}>Show</button>
      <RenameDocRefDialog {...componentProps} />
      <JsonDebug value={lastConfirmed} />
    </div>
  );
};

storiesOf("Explorer/Rename Doc Ref Dialog", module).add("simple", () => (
  <TestHarness testDocRef={testDocRef} />
));
