import * as React from "react";
import { useState } from "react";
import { storiesOf } from "@storybook/react";

import DeleteDocRefDialog, { useDialog } from "./DeleteDocRefDialog";

import { fromSetupSampleData } from "../test";
import { DocRefType } from "src/types";

import JsonDebug from "src/testing/JsonDebug";

const testFolder2 = fromSetupSampleData.children![1];

interface Props {
  testUuids: string[];
}

// Delete
const TestDeleteDialog = ({ testUuids }: Props) => {
  const [lastConfirmed, setLastConfirmed] = useState<object>({});
  const { showDialog, componentProps } = useDialog(setLastConfirmed);

  return (
    <div>
      <button onClick={() => showDialog(testUuids)}>Show</button>
      <DeleteDocRefDialog {...componentProps} />
      <JsonDebug value={lastConfirmed} />
    </div>
  );
};

storiesOf("Explorer/Delete Doc Ref Dialog", module).add("simple", () => (
  <TestDeleteDialog
    testUuids={testFolder2.children!.map((d: DocRefType) => d.uuid)}
  />
));
