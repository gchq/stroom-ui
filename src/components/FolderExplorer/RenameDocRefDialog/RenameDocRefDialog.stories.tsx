import * as React from "react";
import { useState } from "react";
import { storiesOf } from "@storybook/react";
import { DocRefType } from "../../../types";

import RenameDocRefDialog, { useDialog } from "./RenameDocRefDialog";
import { fromSetupSampleData } from "../test";



import JsonDebug from "../../../testing/JsonDebug";

const testDocRef = fromSetupSampleData.children![0].children![0].children![0];

interface Props {
  testDocRef: DocRefType;
}

// Rename
const TestRenameDialog = ({ testDocRef }: Props) => {
  const [lastConfirmed, setLastConfirmed] = useState<object>({});
  const { showDialog, componentProps } = useDialog((docRef, newName) =>
    setLastConfirmed({ docRef, newName })
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

storiesOf("Explorer/Rename Doc Ref Dialog", module)
  
  .add("simple", () => <TestRenameDialog testDocRef={testDocRef} />);
