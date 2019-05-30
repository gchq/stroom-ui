import * as React from "react";
import { addStory } from "testing/storybook/themedStoryGenerator";
import CopyMoveDocRefForm, { useThisForm } from "./CopyMoveDocRefForm";
import JsonDebug from "testing/JsonDebug";
import fullTestData from "testing/data";
import { DocRefType } from "components/DocumentEditors/useDocumentApi/types/base";

const testFolder2 = fullTestData.documentTree.children![1];

interface Props {
  testDestination?: DocRefType;
}

const TestHarness: React.FunctionComponent<Props> = ({ testDestination }) => {
  const { componentProps, value } = useThisForm({
    initialDestination: testDestination,
  });

  return (
    <div>
      <CopyMoveDocRefForm {...componentProps} />
      <JsonDebug value={value} />
    </div>
  );
};

addStory(  "Document Editors/Folder/Copy Doc Ref/Form", "preFilled",
module, () => (
  <TestHarness testDestination={testFolder2} />
));

addStory( "Document Editors/Folder/Copy Doc Ref/Form", "blankSlate",
module, () => <TestHarness />);
