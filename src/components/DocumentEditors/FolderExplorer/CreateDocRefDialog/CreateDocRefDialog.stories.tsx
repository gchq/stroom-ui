import * as React from "react";
import { storiesOf } from "@storybook/react";

import CreateDocRefDialog, { useDialog } from "./CreateDocRefDialog";
import { fromSetupSampleData } from "../test";
import { DocRefType } from "src/types";

import JsonDebug from "src/testing/JsonDebug";

const testFolder2 = fromSetupSampleData.children![1];

interface Props {
  testDestination: DocRefType;
}

const TestHarness: React.FunctionComponent<Props> = ({ testDestination }) => {
  const [lastConfirmed, setLastConfirmed] = React.useState<object>({});
  const { showDialog, componentProps } = useDialog(
    (docRefType: string, docRefName: string, permissionInheritance: string) => {
      setLastConfirmed({ docRefType, docRefName, permissionInheritance });
    },
  );

  return (
    <div>
      <h1>Create Doc Ref Test</h1>
      <button onClick={() => showDialog(testDestination)}>Show</button>
      <CreateDocRefDialog {...componentProps} />
      <JsonDebug value={lastConfirmed} />
    </div>
  );
};

storiesOf("Explorer/Create Doc Ref Dialog", module).add("simple", () => (
  <TestHarness testDestination={testFolder2} />
));
