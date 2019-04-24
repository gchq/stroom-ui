import * as React from "react";
import { storiesOf } from "@storybook/react";

import { fromSetupSampleData } from "../test";
import {
  CopyMoveDocRefDialog,
  useDialog as useCopyMoveDocRefDialog,
} from "./CopyMoveDocRefDialog";

import JsonDebug from "testing/JsonDebug";
import { DocRefType } from "components/DocumentEditors/useDocumentApi/types/base";
import { PermissionInheritance } from "../PermissionInheritancePicker/types";

const testFolder2 = fromSetupSampleData.children![1];

interface Props {
  testUuids: string[];
  testDestination: DocRefType;
}

const TestHarness: React.FunctionComponent<Props> = ({
  testUuids,
  testDestination,
}) => {
  const [lastConfirmed, setLastConfirmed] = React.useState<object>({});

  const { showDialog, componentProps } = useCopyMoveDocRefDialog(
    (
      uuids: string[],
      destination: DocRefType,
      permissionInheritance: PermissionInheritance,
    ) => setLastConfirmed({ uuids, destination, permissionInheritance }),
  );

  return (
    <div>
      <h1>Copy Doc Ref Test</h1>
      <button onClick={() => showDialog(testUuids, testDestination)}>
        Show
      </button>
      <CopyMoveDocRefDialog {...componentProps} />
      <JsonDebug value={lastConfirmed} />
    </div>
  );
};

storiesOf("Document Editors/Folder/Copy Doc Ref Dialog", module).add(
  "simple",
  () => (
    <TestHarness
      testUuids={testFolder2.children!.map(d => d.uuid)}
      testDestination={testFolder2}
    />
  ),
);
