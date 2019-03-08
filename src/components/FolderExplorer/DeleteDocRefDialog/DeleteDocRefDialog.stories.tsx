import * as React from "react";
import { useState } from "react";
import { storiesOf } from "@storybook/react";

import DeleteDocRefDialog, { useDialog } from "./DeleteDocRefDialog";
import StroomDecorator from "../../../testing/storybook/StroomDecorator";
import { fromSetupSampleData } from "../test";
import { DocRefType } from "../../../types";

import "../../../styles/main.css";
import JsonDebug from "../../../testing/JsonDebug";

const testFolder2 = fromSetupSampleData.children![1];

interface Props {
  testUuids: Array<string>;
}

// Delete
const TestDeleteDialog = ({ testUuids }: Props) => {
  const [lastConfirmed, setLastConfirmed] = useState<object>({});
  const { showDialog, componentProps } = useDialog(setLastConfirmed);

  return (
    <div>
      <button onClick={() => showDialog(testUuids)}>Show</button>
      <DeleteDocRefDialog {...componentProps} />
      <JsonDebug currentValues={lastConfirmed} />
    </div>
  );
};

storiesOf("Explorer/Delete Doc Ref Dialog", module)
  .addDecorator(StroomDecorator)
  .add("simple", () => (
    <TestDeleteDialog
      testUuids={testFolder2.children!.map((d: DocRefType) => d.uuid)}
    />
  ));
