import * as React from "react";
import { useState } from "react";
import { storiesOf } from "@storybook/react";

import CreateDocRefDialog, { useDialog } from "./CreateDocRefDialog";
import { fromSetupSampleData } from "./test";
import { DocRefType } from "../../types";
import StroomDecorator from "../../lib/storybook/StroomDecorator";

import "../../styles/main.css";
import JsonDebug from "../../lib/storybook/JsonDebug";

const testFolder2 = fromSetupSampleData.children![1];

interface Props {
  testDestination: DocRefType;
}

// New Doc
const TestNewDocRefDialog = ({ testDestination }: Props) => {
  const [lastConfirmed, setLastConfirmed] = useState<object>({});
  const { showDialog, componentProps } = useDialog(
    (docRefType: string, docRefName: string, permissionInheritance: string) => {
      setLastConfirmed({ docRefType, docRefName, permissionInheritance });
    }
  );

  return (
    <div>
      <h1>Create Doc Ref Test</h1>
      <button onClick={() => showDialog(testDestination)}>Show</button>
      <CreateDocRefDialog {...componentProps} />
      <JsonDebug currentValues={lastConfirmed} />
    </div>
  );
};

storiesOf("Explorer/Create Doc Ref Dialog", module)
  .addDecorator(StroomDecorator)
  .add("simple", () => <TestNewDocRefDialog testDestination={testFolder2} />);
